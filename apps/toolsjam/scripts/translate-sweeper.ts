/**
 * translate-sweeper — fills in missing non-en locales for already-ported tools.
 *
 * Why this exists:
 *   Port issues (issue-worker) ship en-only PRs.  Translation is mechanical
 *   work that does not need PR review and that historically gets killed by
 *   Copilot CLI gateway throttling.  Decoupling it from port lets port PRs
 *   ship at full speed while translation retries on its own schedule.
 *
 * Strategy:
 *   1. Scan all category files; collect tool IDs whose non-en slug/title is
 *      empty OR equals the en value (English fallback from a flake).
 *   2. Spawn N worker workers, each with its own git worktree off origin/main,
 *      and a junctioned shared `.port-page-cache` so LLM cache is shared.
 *   3. Each worker pulls B tool IDs off a shared queue, runs translate-tool
 *      in the worktree (writes cache), then under a global push lock:
 *      fetch + reset to origin/main, run apply-translations, commit, push.
 *   4. Loop until the queue is empty.
 *
 * Concurrency model:
 *   - translate-tool calls are fully parallel (each worker, own worktree)
 *   - apply + commit + push is serialised by a filesystem push-lock so the
 *     messages JSON / category .ts files can't merge-conflict
 *
 * CLI:
 *   pnpm exec tsx scripts/translate-sweeper.ts          # default c=2, b=5
 *   pnpm exec tsx scripts/translate-sweeper.ts -c 4 -b 5
 *   pnpm exec tsx scripts/translate-sweeper.ts --once   # one pass then exit
 *   pnpm exec tsx scripts/translate-sweeper.ts --tools=a,b,c   # explicit list
 */

import { spawnSync, spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  rmSync,
  rmdirSync,
  statSync,
} from "node:fs";
import path from "node:path";

const APP = path.resolve(__dirname, "..");
const MAIN_REPO = path.resolve(APP, "..", "..");
const DATA_DIR = path.join(APP, "src", "data", "tools");
const CACHE_ROOT = path.join(APP, ".port-page-cache");
const PUSH_LOCK = path.join(CACHE_ROOT, ".push-lock");
const WORKTREES_ROOT = path.resolve(MAIN_REPO, "..", "sites-worktrees");

const NON_EN = ["zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de", "pt", "ru"];

const PUSH_LOCK_TIMEOUT_MS = 10 * 60 * 1000;
const PUSH_LOCK_STALE_MS = 5 * 60 * 1000;

// --- CLI -----------------------------------------------------------------

interface Args {
  concurrency: number;
  batchSize: number;
  once: boolean;
  explicit: string[] | null;
  maxBatches: number;
}
function parseArgs(): Args {
  const a = process.argv.slice(2);
  const out: Args = { concurrency: 2, batchSize: 5, once: false, explicit: null, maxBatches: Infinity };
  for (let i = 0; i < a.length; i++) {
    const x = a[i]!;
    if (x === "-c" || x === "--concurrency") out.concurrency = parseInt(a[++i]!, 10);
    else if (x === "-b" || x === "--batch-size") out.batchSize = parseInt(a[++i]!, 10);
    else if (x === "--once") out.once = true;
    else if (x.startsWith("--tools=")) out.explicit = x.slice("--tools=".length).split(",").filter(Boolean);
    else if (x === "--max-batches") out.maxBatches = parseInt(a[++i]!, 10);
  }
  return out;
}

// --- identifying tools that need translation -----------------------------

// Path of DATA_DIR relative to repo root, used to list/read files at origin/main
// without touching the main repo's working tree.
const DATA_DIR_REL = path.relative(MAIN_REPO, DATA_DIR).replace(/\\/g, "/");

function gitShowAtRef(ref: string, relPath: string): string | null {
  const r = spawnSync("git", ["show", `${ref}:${relPath}`], {
    cwd: MAIN_REPO, encoding: "utf8", windowsHide: true, maxBuffer: 32 * 1024 * 1024,
  });
  if (r.status !== 0) return null;
  return r.stdout;
}

function gitListTreeFiles(ref: string, dirRel: string): string[] {
  const r = spawnSync("git", ["ls-tree", "--name-only", ref, `${dirRel}/`], {
    cwd: MAIN_REPO, encoding: "utf8", windowsHide: true,
  });
  if (r.status !== 0) return [];
  return r.stdout
    .split(/\r?\n/)
    .filter(Boolean)
    .map((p) => path.posix.basename(p));
}

function fetchOriginMain(): void {
  // Only updates .git/refs — does NOT touch the main repo working tree.
  spawnSync("git", ["fetch", "origin", "main"], { cwd: MAIN_REPO, stdio: "ignore", windowsHide: true });
}

function gitFileExists(ref: string, relPath: string): boolean {
  const r = spawnSync("git", ["cat-file", "-e", `${ref}:${relPath}`], {
    cwd: MAIN_REPO, stdio: "ignore", windowsHide: true,
  });
  return r.status === 0;
}

function hasAllLocaleMessages(toolId: string): boolean {
  // A tool is "translated" if every non-en per-tool messages file exists at
  // origin/main.  This is the canonical source of truth — checking category.ts
  // slugs/titles via regex is fragile (the unquoted-key variants ja/ko/es/...
  // were silently missed by the old regex and caused every translated tool to
  // be re-translated forever).
  const prefix = "apps/toolsjam/messages/tool";
  for (const loc of NON_EN) {
    if (!gitFileExists("origin/main", `${prefix}/${toolId}/${loc}.json`)) return false;
  }
  return true;
}

function findNeedsTranslate(): string[] {
  fetchOriginMain();
  const need: string[] = [];
  const files = gitListTreeFiles("origin/main", DATA_DIR_REL);
  for (const file of files) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    const src = gitShowAtRef("origin/main", `${DATA_DIR_REL}/${file}`);
    if (!src) continue;
    // Grab tool IDs only; we don't trust regex matching against the locale
    // slug/title blocks (keys ja/ko/es/fr/de/pt/ru are unquoted identifiers
    // in our category.ts but zh-CN/zh-TW are quoted, breaking a uniform regex).
    const idRe = /\{\s*id:\s*"([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = idRe.exec(src))) {
      const id = m[1]!;
      if (!hasAllLocaleMessages(id)) need.push(id);
    }
  }
  return need;
}

// --- push lock (cross-process, atomic mkdir) -----------------------------

async function acquirePushLock(wid: string): Promise<void> {
  const start = Date.now();
  for (;;) {
    try {
      mkdirSync(PUSH_LOCK, { recursive: false });
      return;
    } catch (e: unknown) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
      try {
        const age = Date.now() - statSync(PUSH_LOCK).mtimeMs;
        if (age > PUSH_LOCK_STALE_MS) {
          log(wid, `push-lock stale ${Math.round(age / 1000)}s — stealing`);
          try { rmdirSync(PUSH_LOCK, { recursive: true }); } catch {}
          continue;
        }
      } catch {}
      if (Date.now() - start > PUSH_LOCK_TIMEOUT_MS) {
        throw new Error("push-lock acquire timeout");
      }
      await sleep(500 + Math.random() * 1000);
    }
  }
}
function releasePushLock() {
  try { rmdirSync(PUSH_LOCK, { recursive: true }); } catch {}
}

// --- shelling out --------------------------------------------------------

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function log(wid: string, msg: string) {
  process.stdout.write(`[${wid} ${new Date().toISOString()}] ${msg}\n`);
}

interface RunResult { code: number; out: string }

function sh(cmd: string, args: string[], cwd: string, wid: string, timeoutMs = 60 * 60 * 1000): RunResult {
  log(wid, `$ ${cmd} ${args.map((a) => (a.includes(" ") ? JSON.stringify(a) : a)).join(" ")} (cwd=${cwd})`);
  const r = spawnSync(cmd, args, { cwd, shell: true, stdio: ["ignore", "pipe", "pipe"], timeout: timeoutMs });
  const out = `${r.stdout?.toString("utf8") ?? ""}${r.stderr?.toString("utf8") ?? ""}`;
  if (out.trim()) {
    process.stdout.write(out.split("\n").slice(-20).map((l) => `[${wid}]   ${l}`).join("\n") + "\n");
  }
  return { code: r.status ?? -1, out };
}

// translate-tool spawn (long, streaming) — inherit stdio for live progress
function shStream(cmd: string, args: string[], cwd: string, wid: string): Promise<number> {
  return new Promise((resolve) => {
    log(wid, `$ ${cmd} ${args.join(" ")} (cwd=${cwd})`);
    const p = spawn(cmd, args, { cwd, shell: true, stdio: ["ignore", "inherit", "inherit"] });
    p.on("exit", (code) => resolve(code ?? -1));
  });
}

// --- worktree management -------------------------------------------------

function createWorktree(wid: string, branch: string): string {
  mkdirSync(WORKTREES_ROOT, { recursive: true });
  const wt = path.join(WORKTREES_ROOT, `sweep-${wid}`);
  if (existsSync(wt)) {
    sh("git", ["worktree", "remove", "--force", wt], MAIN_REPO, wid);
    try { rmSync(wt, { recursive: true, force: true }); } catch {}
  }
  const r = sh("git", ["worktree", "add", "-B", branch, wt, "origin/main"], MAIN_REPO, wid);
  if (r.code !== 0) throw new Error(`worktree add failed: ${r.out.slice(-200)}`);
  // Junction the worktree's cache → main repo's cache so LLM cache is shared
  const wtCache = path.join(wt, "apps", "toolsjam", ".port-page-cache");
  mkdirSync(CACHE_ROOT, { recursive: true });
  if (!existsSync(wtCache)) {
    const jr = sh("cmd", ["/c", "mklink", "/J", wtCache, CACHE_ROOT], MAIN_REPO, wid);
    if (jr.code !== 0) log(wid, `WARN junction create failed (cache will not be shared): ${jr.out.slice(-200)}`);
  }
  // Install deps so tsx/translate-tool can run inside the worktree
  const inst = sh("pnpm", ["install", "--frozen-lockfile", "--prefer-offline"], wt, wid, 15 * 60 * 1000);
  if (inst.code !== 0) throw new Error(`pnpm install in worktree failed: ${inst.out.slice(-300)}`);
  return wt;
}

function destroyWorktree(wt: string, wid: string) {
  // Remove the cache junction first; otherwise rm -rf would walk into the
  // main repo's cache. `rmdir` without /S removes a junction without
  // recursing into its target — this is the right Windows semantics.
  const wtCache = path.join(wt, "apps", "toolsjam", ".port-page-cache");
  if (existsSync(wtCache)) {
    sh("cmd", ["/c", "rmdir", wtCache], MAIN_REPO, wid);
  }
  sh("git", ["worktree", "remove", "--force", wt], MAIN_REPO, wid);
  try { rmSync(wt, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 }); } catch {}
  sh("git", ["worktree", "prune"], MAIN_REPO, wid);
}

// --- worker --------------------------------------------------------------

interface Queue {
  next(n: number): string[];
  remaining(): number;
}
function makeQueue(items: string[]): Queue {
  let i = 0;
  return {
    next(n) { const r = items.slice(i, i + n); i += r.length; return r; },
    remaining() { return items.length - i; },
  };
}

async function runWorker(wid: string, queue: Queue, batchSize: number, maxBatches: number): Promise<{ ok: number; fail: number }> {
  const branch = `sweep/${wid}-${Date.now()}`;
  const wt = createWorktree(wid, branch);
  const wtApp = path.join(wt, "apps", "toolsjam");
  let ok = 0, fail = 0, batches = 0;
  try {
    while (batches < maxBatches) {
      const batch = queue.next(batchSize);
      if (batch.length === 0) break;
      batches++;
      log(wid, `batch ${batches}: ${batch.join(", ")}`);
      // 1. translate-tool in worktree (cache writes — shared via junction)
      const tCode = await shStream("pnpm", ["translate-tool", ...batch], wtApp, wid);
      if (tCode !== 0) {
        log(wid, `WARN translate-tool exit=${tCode} for batch (will still attempt apply with whatever cached)`);
      }
      // 2. apply + commit + push under serialised lock
      try {
        await acquirePushLock(wid);
        const sync = sh("git", ["fetch", "origin", "main"], wt, wid);
        if (sync.code !== 0) { log(wid, "fetch failed, skipping batch"); fail += batch.length; releasePushLock(); continue; }
        sh("git", ["reset", "--hard", "origin/main"], wt, wid);
        const ap = sh("pnpm", ["exec", "tsx", "scripts/apply-translations.ts", ...batch], wtApp, wid);
        if (ap.code !== 0) { log(wid, "apply-translations failed"); fail += batch.length; releasePushLock(); continue; }
        const dr = sh("git", ["diff", "--quiet"], wt, wid);
        if (dr.code === 0) {
          // No changes — cache may have been incomplete; nothing to push.
          log(wid, `nothing changed for batch; cache likely missing locales`);
          fail += batch.length;
          releasePushLock();
          continue;
        }
        sh("git", ["add", "messages/", "src/data/tools/"], wtApp, wid);
        const msg = `i18n(toolsjam): translate ${batch.length} tool(s) — ${batch.slice(0, 3).join(", ")}${batch.length > 3 ? ", …" : ""}\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>\n`;
        const msgFile = path.join(wt, ".sweeper-commit-msg");
        require("node:fs").writeFileSync(msgFile, msg, "utf8");
        const ci = sh("git", ["commit", "-F", msgFile], wt, wid);
        try { require("node:fs").rmSync(msgFile, { force: true }); } catch {}
        if (ci.code !== 0) { log(wid, "git commit failed"); fail += batch.length; releasePushLock(); continue; }
        const push = sh("git", ["push", "origin", `HEAD:main`], wt, wid);
        if (push.code !== 0) { log(wid, "git push failed (will recover next pass)"); fail += batch.length; releasePushLock(); continue; }
        ok += batch.length;
        log(wid, `✓ pushed batch (${batch.length} tools) ok-running=${ok} fail-running=${fail} remaining=${queue.remaining()}`);
      } finally {
        releasePushLock();
      }
    }
  } finally {
    try { destroyWorktree(wt, wid); } catch (e) { log(wid, `cleanup warn: ${String(e)}`); }
  }
  return { ok, fail };
}

// --- main ----------------------------------------------------------------

async function pass(args: Args): Promise<{ ok: number; fail: number; scanned: number }> {
  // Always sync the local ref to origin/main before doing anything, so every
  // path (scan, worktree create, worker re-sync) starts from the same true
  // upstream snapshot — including the --tools=… path that bypasses scan.
  fetchOriginMain();
  const startScan = Date.now();
  let pool = args.explicit ?? findNeedsTranslate();
  log("main", `scan: ${pool.length} tools need translation (took ${Math.round((Date.now() - startScan) / 1000)}s)`);
  if (pool.length === 0) return { ok: 0, fail: 0, scanned: 0 };
  const queue = makeQueue(pool);
  const workers: Promise<{ ok: number; fail: number }>[] = [];
  for (let i = 0; i < args.concurrency; i++) {
    workers.push(runWorker(`sw${String(i + 1).padStart(2, "0")}`, queue, args.batchSize, args.maxBatches));
  }
  const results = await Promise.all(workers);
  const ok = results.reduce((s, r) => s + r.ok, 0);
  const fail = results.reduce((s, r) => s + r.fail, 0);
  return { ok, fail, scanned: pool.length };
}

async function main() {
  const args = parseArgs();
  log("main", `starting translate-sweeper c=${args.concurrency} b=${args.batchSize} once=${args.once}`);
  releasePushLock();
  let totalOk = 0, totalFail = 0;
  for (let round = 1; ; round++) {
    log("main", `=== pass ${round} ===`);
    const r = await pass(args);
    totalOk += r.ok;
    totalFail += r.fail;
    log("main", `pass ${round} done: ok=${r.ok} fail=${r.fail} scanned=${r.scanned} (cumulative ok=${totalOk} fail=${totalFail})`);
    if (r.scanned === 0) { log("main", "nothing to do — exiting"); break; }
    if (args.once) break;
    // small breather between passes
    log("main", "sleeping 30s before next pass");
    await sleep(30_000);
  }
}

void main().catch((e) => { console.error(e); process.exit(1); });
