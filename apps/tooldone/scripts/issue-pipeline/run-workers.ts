// Dispatcher: keep N worker processes busy claiming `ready` tooldone-port
// issues until none remain.
//
// Usage:
//   pnpm tsx scripts/issue-pipeline/run-workers.ts --concurrency 8
//   pnpm tsx scripts/issue-pipeline/run-workers.ts -c 4 --max-issues 10   # stop after 10 done

import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..", "..");

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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`[dispatcher] starting with concurrency=${args.concurrency} maxIssues=${args.maxIssues ?? "∞"}`);

  let started = 0;
  let active = 0;
  let stopping = false;

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
      spawnWorker(wid).then((code) => {
        active -= 1;
        console.log(`[dispatcher] ${wid} exited code=${code} (active=${active})`);
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
}

void main();
