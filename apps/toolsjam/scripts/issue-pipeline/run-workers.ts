// Dispatcher: keep N worker processes busy claiming `ready` toolsjam-port
// issues until none remain.
//
// Usage:
//   pnpm tsx scripts/issue-pipeline/run-workers.ts --concurrency 8
//   pnpm tsx scripts/issue-pipeline/run-workers.ts -c 4 --max-issues 10   # stop after 10 done

import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..", "..");
const MAIN_REPO = path.resolve(APP, "..", "..");

interface Args { concurrency: number; maxIssues: number | null; }

function parseArgs(argv: string[]): Args {
  const a: Args = { concurrency: 4, maxIssues: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === "--concurrency" || x === "-c") a.concurrency = Number(argv[++i]);
    else if (x === "--max-issues") a.maxIssues = Number(argv[++i]);
    else { console.error(`unknown ${x}`); process.exit(2); }
  }
  return a;
}

// --- Pre-flight: refuse to dispatch if the workspace install will fail ----
// All workers run `pnpm install --frozen-lockfile` in their fresh worktrees.
// If the main repo can't even install with that flag, every spawned worker
// will silently die at the install phase and chew through the issue queue.
// Reproduce the failure here once, with a loud banner, and exit.
function preflightInstallCheck(): void {
  console.log("[dispatcher] preflight: pnpm install --frozen-lockfile (in main repo)…");
  const r = spawnSync("pnpm", ["install", "--frozen-lockfile", "--prefer-offline"], {
    cwd: MAIN_REPO,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 5 * 60 * 1000,
  });
  if (r.status === 0) {
    console.log("[dispatcher] preflight OK");
    return;
  }
  const tail = (r.stdout?.toString("utf8") ?? "") + (r.stderr?.toString("utf8") ?? "");
  console.error("\n" + "=".repeat(78));
  console.error("[dispatcher] PREFLIGHT FAILED: pnpm install --frozen-lockfile errored.");
  console.error("[dispatcher] Workers would all die at install; refusing to spawn any.");
  console.error("[dispatcher] Fix the lockfile (pnpm install --lockfile-only) and retry.");
  console.error("=".repeat(78) + "\n");
  console.error(tail.split("\n").slice(-25).join("\n"));
  process.exit(2);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  preflightInstallCheck();
  console.log(`[dispatcher] starting with concurrency=${args.concurrency} maxIssues=${args.maxIssues ?? "∞"}`);

  let started = 0;
  let active = 0;
  let stopping = false;

  // Circuit breaker: if the LAST N spawned workers ALL exited with code != 0
  // in under 60s each, something systemic is broken (lockfile, gh auth,
  // disk space) and continuing just churns the issue queue marking
  // everything blocked.  Stop and let humans investigate.
  const CIRCUIT_WINDOW = 6;
  const CIRCUIT_FAST_FAIL_MS = 60_000;
  type Exit = { code: number; durMs: number };
  const recentExits: Exit[] = [];
  const recordExit = (e: Exit) => {
    recentExits.push(e);
    if (recentExits.length > CIRCUIT_WINDOW) recentExits.shift();
    if (recentExits.length === CIRCUIT_WINDOW &&
        recentExits.every((x) => x.code !== 0 && x.durMs < CIRCUIT_FAST_FAIL_MS)) {
      console.error("\n" + "=".repeat(78));
      console.error(`[dispatcher] CIRCUIT BREAKER: last ${CIRCUIT_WINDOW} workers all failed in < ${CIRCUIT_FAST_FAIL_MS / 1000}s.`);
      console.error("[dispatcher] Systemic issue likely (lockfile, gh auth, disk).  Stopping.");
      console.error("=".repeat(78) + "\n");
      stopping = true;
    }
  };

  const tryDispatch = (resolveAll: () => void) => {
    if (stopping) { if (active === 0) resolveAll(); return; }
    if (args.maxIssues != null && started >= args.maxIssues) {
      stopping = true;
      if (active === 0) resolveAll();
      return;
    }
    while (active < args.concurrency) {
      if (args.maxIssues != null && started >= args.maxIssues) break;
      started += 1;
      active += 1;
      const wid = `w${String(started).padStart(3, "0")}`;
      console.log(`[dispatcher] spawning ${wid} (active=${active})`);
      const t0 = Date.now();
      spawnWorker(wid).then((code) => {
        active -= 1;
        const durMs = Date.now() - t0;
        console.log(`[dispatcher] ${wid} exited code=${code} dur=${Math.round(durMs / 1000)}s (active=${active})`);
        recordExit({ code, durMs });
        // If a worker exited because no ready issue was found (its log says so
        // but we don't parse it), we still try to dispatch again — next call
        // will also see "none ready" and exit quickly. After a short streak of
        // such fast exits we stop. Heuristic: track quick-exit count.
        setTimeout(() => tryDispatch(resolveAll), 1000);
      });
    }
    if (active === 0) resolveAll();
  };

  await new Promise<void>((resolve) => tryDispatch(resolve));
  console.log(`[dispatcher] all workers done. started=${started}`);
  if (stopping && recentExits.length === CIRCUIT_WINDOW &&
      recentExits.every((x) => x.code !== 0)) {
    process.exit(3);
  }
}

function spawnWorker(workerId: string): Promise<number> {
  return new Promise((resolve) => {
    const child = spawn(
      "pnpm",
      ["tsx", "scripts/issue-pipeline/issue-worker.ts", "--worker-id", workerId],
      { cwd: APP, shell: true, stdio: "inherit" },
    );
    child.on("close", (code) => resolve(code ?? -1));
  });
}

void main();
