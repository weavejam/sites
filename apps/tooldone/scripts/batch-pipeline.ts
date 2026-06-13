// Batch port + review pipeline that runs in its own git worktree.
//
// Usage:
//   pnpm batch-pipeline --id batch-001 --urls "math/x" "physic/y" ...
//   pnpm batch-pipeline --id batch-001 --batch <file>
//
// Steps (sequential within one batch):
//   1. git worktree add ../sites-worktrees/<id> -b batch/<id> origin/main
//   2. cd worktree/apps/tooldone; pnpm install --frozen-lockfile
//   3. spawn copilot CLI (claude-opus-4.8) ONCE with port-batch-prompt rendered
//      with all jobs; it writes 5 components + 5 registry entries + 5 i18n + 5 fixtures
//   4. pnpm fixtures:barrel
//   5. spawn copilot CLI (gpt-5.5) ONCE per page for review (reviewer is
//      page-scoped; running it batched gives worse results in testing)
//   6. pnpm test && pnpm build && pnpm test:e2e
//   7. git add + commit + push branch
//   8. acquire merge-lock; checkout main in main worktree; pull --rebase;
//      merge --no-ff batch branch; push main; release lock
//   9. worktree remove + branch delete

import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";

const MAIN_REPO = process.env.MAIN_REPO ?? "D:\\shudu\\shudu";
const WORKTREE_ROOT = process.env.WORKTREE_ROOT ?? "D:\\shudu\\sites-worktrees";
const APP_REL = "apps\\tooldone";
const PROMPT_FILE = path.join(MAIN_REPO, APP_REL, "scripts", "port-batch-prompt.md");
const REVIEW_PROMPT_FILE = path.join(MAIN_REPO, APP_REL, "scripts", "review-prompt.md");
const STATE_FILE = path.join(MAIN_REPO, APP_REL, ".port-page-cache", "batch-state.json");
const MERGE_LOCK = path.join(WORKTREE_ROOT, ".merge-lock");
const BASE_URL = "https://tooldone.com";

type Args = { id: string; urls: string[]; batchFile: string | null; skipDeploy: boolean };

function parseArgs(argv: string[]): Args {
  const out: Args = { id: "", urls: [], batchFile: null, skipDeploy: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--id") out.id = argv[++i];
    else if (a === "--batch") out.batchFile = argv[++i];
    else if (a === "--urls") {
      while (i + 1 < argv.length && !argv[i + 1].startsWith("--")) out.urls.push(argv[++i]);
    } else if (a === "--skip-deploy") out.skipDeploy = true;
    else if (a.startsWith("--")) { console.error(`unknown ${a}`); process.exit(2); }
  }
  if (!out.id) { console.error("--id required"); process.exit(2); }
  if (out.batchFile) {
    for (const line of readFileSync(out.batchFile, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (t && !t.startsWith("#")) out.urls.push(t);
    }
  }
  if (out.urls.length === 0) { console.error("--urls or --batch required"); process.exit(2); }
  return out;
}

interface Job { category: string; toolId: string; url: string; htmlPath: string; }

function parseJobs(urls: string[], worktreeRoot: string): Job[] {
  const out: Job[] = [];
  for (const raw of urls) {
    const p = raw.replace(/^https?:\/\/tooldone\.com\//, "").replace(/^\/+|\/+$/g, "");
    const [category, toolId] = p.split("/");
    if (!category || !toolId) { console.warn(`skip ${raw}`); continue; }
    const htmlPath = path.join(worktreeRoot, APP_REL, ".scrape", "html", category, `${toolId}.html`);
    out.push({ category, toolId, url: `${BASE_URL}/${category}/${toolId}`, htmlPath });
  }
  return out;
}

function log(id: string, msg: string) {
  process.stdout.write(`[${id}] ${msg}\n`);
}

function run(cmd: string, args: string[], cwd: string, label: string): { code: number; out: string } {
  log(label, `$ ${cmd} ${args.join(" ")} (cwd=${cwd})`);
  const r = spawnSync(cmd, args, { cwd, shell: true, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  return { code: r.status ?? -1, out: (r.stdout ?? "") + (r.stderr ?? "") };
}

function runCopilot(prompt: string, model: string, cwd: string, label: string): Promise<number> {
  return new Promise((resolve, reject) => {
    log(label, `→ copilot --model ${model} (cwd=${cwd}, prompt ${prompt.length} chars)`);
    const child = spawn(
      "copilot",
      ["--allow-all-tools", "--model", model, "--add-dir", JSON.stringify(cwd), "--no-color"],
      { cwd, stdio: ["pipe", "inherit", "pipe"], shell: true },
    );
    child.stderr.on("data", (b) => process.stderr.write(b));
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? -1));
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function renderPortPrompt(jobs: Job[], worktree: string): string {
  const tpl = readFileSync(PROMPT_FILE, "utf8");
  const block = jobs
    .map(
      (j, i) =>
        `Page ${i + 1}:
- Tool id:               ${j.toolId}
- Category id:           ${j.category}
- Source URL:            ${j.url}
- Local HTML snapshot:   ${j.htmlPath.replaceAll("\\", "\\\\")}`,
    )
    .join("\n\n");
  return tpl
    .replaceAll("<REPO_ROOT>", worktree.replaceAll("\\", "\\\\"))
    .replace("{{JOBS_BLOCK}}", block);
}

function renderReviewPrompt(job: Job, worktree: string): string {
  const appDir = path.join(worktree, APP_REL).replaceAll("\\", "\\\\");
  return readFileSync(REVIEW_PROMPT_FILE, "utf8")
    .replaceAll("{{TOOL_ID}}", job.toolId)
    .replaceAll("{{CATEGORY}}", job.category)
    .replaceAll("{{APP_DIR}}", appDir)
    .replaceAll("<REPO_ROOT>", worktree.replaceAll("\\", "\\\\"));
}

interface BatchState { [id: string]: { at: string; status: string; phase: string; durationMs: number; error?: string }; }
function loadState(): BatchState {
  if (!existsSync(STATE_FILE)) return {};
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
}
function saveState(s: BatchState) {
  mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), "utf8");
}

async function acquireMergeLock(id: string): Promise<void> {
  mkdirSync(path.dirname(MERGE_LOCK), { recursive: true });
  while (true) {
    try {
      writeFileSync(MERGE_LOCK, id, { flag: "wx" });
      log(id, `merge-lock acquired`);
      return;
    } catch {
      log(id, `waiting for merge-lock (held by ${existsSync(MERGE_LOCK) ? readFileSync(MERGE_LOCK, "utf8") : "?"})...`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}
function releaseMergeLock() { try { rmSync(MERGE_LOCK); } catch {} }

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const wt = path.join(WORKTREE_ROOT, args.id);
  const wtApp = path.join(wt, APP_REL);
  const branch = `batch/${args.id}`;
  const state = loadState();
  state[args.id] = { at: new Date().toISOString(), status: "running", phase: "setup", durationMs: 0 };
  saveState(state);

  const t0 = Date.now();
  const cleanup = (success: boolean) => {
    log(args.id, `cleanup (success=${success})`);
    run("git", ["worktree", "remove", "--force", JSON.stringify(wt)], MAIN_REPO, args.id);
    if (success) run("git", ["branch", "-D", branch], MAIN_REPO, args.id);
  };

  try {
    // 1. worktree
    state[args.id].phase = "worktree"; saveState(state);
    log(args.id, `fetching origin/main`);
    run("git", ["fetch", "origin", "main"], MAIN_REPO, args.id);
    if (existsSync(wt)) run("git", ["worktree", "remove", "--force", JSON.stringify(wt)], MAIN_REPO, args.id);
    mkdirSync(WORKTREE_ROOT, { recursive: true });
    const wAdd = run("git", ["worktree", "add", "-b", branch, JSON.stringify(wt), "origin/main"], MAIN_REPO, args.id);
    if (wAdd.code !== 0) throw new Error("worktree add failed");

    // Symlink .scrape/html (huge, gitignored) from main checkout into the worktree
    // so the child copilot can read snapshots without re-scraping.
    const wtScrape = path.join(wtApp, ".scrape", "html");
    if (!existsSync(wtScrape)) {
      mkdirSync(path.dirname(wtScrape), { recursive: true });
      // mklink /J is the only reliable Windows option that doesn't need admin.
      run("cmd", ["/c", `mklink /J "${wtScrape}" "${path.join(MAIN_REPO, APP_REL, ".scrape", "html")}"`], MAIN_REPO, args.id);
    }

    // 2. install
    state[args.id].phase = "install"; saveState(state);
    const inst = run("pnpm", ["install", "--frozen-lockfile"], wt, args.id);
    if (inst.code !== 0) throw new Error("pnpm install failed");

    // 3. port (one copilot call for all N pages)
    state[args.id].phase = "port"; saveState(state);
    const jobs = parseJobs(args.urls, wt);
    const portCode = await runCopilot(renderPortPrompt(jobs, wt), "claude-opus-4.8", wt, args.id);
    if (portCode !== 0) throw new Error(`port copilot exit=${portCode}`);

    // 4. regenerate fixtures barrel
    state[args.id].phase = "barrel"; saveState(state);
    const bar = run("pnpm", ["fixtures:barrel"], wtApp, args.id);
    if (bar.code !== 0) throw new Error("fixtures:barrel failed");

    // 5. review each page sequentially with gpt-5.5
    state[args.id].phase = "review"; saveState(state);
    for (const job of jobs) {
      const c = await runCopilot(renderReviewPrompt(job, wt), "gpt-5.5", wt, args.id);
      if (c !== 0) log(args.id, `WARN review ${job.toolId} exit=${c}`);
    }
    // Re-run barrel in case reviewer added/changed fixture files
    run("pnpm", ["fixtures:barrel"], wtApp, args.id);

    // 6. unit + build + e2e
    state[args.id].phase = "test"; saveState(state);
    const t1 = run("pnpm", ["test"], wtApp, args.id);
    if (t1.code !== 0) throw new Error("vitest failed");
    const b = run("pnpm", ["build"], wtApp, args.id);
    if (b.code !== 0) throw new Error("build failed");
    const e2e = run("pnpm", ["test:e2e"], wtApp, args.id);
    if (e2e.code !== 0) throw new Error("playwright failed");

    // 7. commit + push branch
    state[args.id].phase = "commit"; saveState(state);
    run("git", ["add", "-A"], wt, args.id);
    const ids = jobs.map((j) => `${j.category}/${j.toolId}`).join(", ");
    const cm = run("git", ["commit", "-m", JSON.stringify(`port(tooldone): ${ids}\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`)], wt, args.id);
    if (cm.code !== 0) throw new Error("commit failed");
    const push = run("git", ["push", "-u", "origin", branch], wt, args.id);
    if (push.code !== 0) throw new Error("push failed");

    // 8. merge into main under lock
    state[args.id].phase = "merge"; saveState(state);
    await acquireMergeLock(args.id);
    try {
      run("git", ["checkout", "main"], MAIN_REPO, args.id);
      run("git", ["pull", "--rebase", "origin", "main"], MAIN_REPO, args.id);
      const merge = run("git", ["merge", "--no-ff", "-m", JSON.stringify(`merge: ${branch} (${ids})`), branch], MAIN_REPO, args.id);
      if (merge.code !== 0) throw new Error("merge failed");
      const mp = run("git", ["push", "origin", "main"], MAIN_REPO, args.id);
      if (mp.code !== 0) throw new Error("push main failed");
    } finally {
      releaseMergeLock();
    }

    state[args.id] = { at: new Date().toISOString(), status: "ok", phase: "done", durationMs: Date.now() - t0 };
    saveState(state);
    log(args.id, `✓ batch done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    cleanup(true);
    process.exit(0);
  } catch (e) {
    state[args.id] = { at: new Date().toISOString(), status: "fail", phase: state[args.id]?.phase ?? "?", durationMs: Date.now() - t0, error: String(e) };
    saveState(state);
    log(args.id, `✗ batch failed: ${e}`);
    cleanup(false);
    process.exit(1);
  }
}

void main();
