// Parallel scheduler: split a URL list into batches of N pages and run
// up to M batches concurrently as `pnpm batch-pipeline` subprocesses.
//
// Usage:
//   pnpm run-parallel --urls-file .scrape/pilot.txt --batch-size 5 --concurrency 2
//   pnpm run-parallel --urls "math/x" "physic/y" "..." --batch-size 5

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

type Args = { urls: string[]; urlsFile: string | null; batchSize: number; concurrency: number; idPrefix: string };

function parseArgs(argv: string[]): Args {
  const out: Args = { urls: [], urlsFile: null, batchSize: 5, concurrency: 2, idPrefix: `b${Date.now().toString(36)}` };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--urls-file") out.urlsFile = argv[++i];
    else if (a === "--batch-size") out.batchSize = Number(argv[++i]);
    else if (a === "--concurrency") out.concurrency = Number(argv[++i]);
    else if (a === "--id-prefix") out.idPrefix = argv[++i];
    else if (a === "--urls") {
      while (i + 1 < argv.length && !argv[i + 1].startsWith("--")) out.urls.push(argv[++i]);
    } else if (a.startsWith("--")) { console.error(`unknown ${a}`); process.exit(2); }
  }
  if (out.urlsFile) {
    for (const line of readFileSync(out.urlsFile, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (t && !t.startsWith("#")) out.urls.push(t);
    }
  }
  if (out.urls.length === 0) { console.error("--urls or --urls-file required"); process.exit(2); }
  return out;
}

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function runBatch(id: string, urls: string[]): Promise<{ id: string; code: number }> {
  return new Promise((resolve) => {
    const args = ["batch-pipeline", "--id", id, "--urls", ...urls];
    const logDir = path.join(__dirname, "..", ".port-page-cache", "batch-logs");
    mkdirSync(logDir, { recursive: true });
    const logPath = path.join(logDir, `${id}.log`);
    const out = require("node:fs").openSync(logPath, "w");
    console.log(`[scheduler] start ${id} (${urls.length} pages) → ${logPath}`);
    const child = spawn("pnpm", args, {
      cwd: path.join(__dirname, ".."),
      shell: true,
      stdio: ["ignore", out, out],
    });
    child.on("close", (code) => {
      console.log(`[scheduler] ${id} exit=${code}`);
      resolve({ id, code: code ?? -1 });
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const batches = chunk(args.urls, args.batchSize);
  console.log(`scheduler: ${args.urls.length} url(s) → ${batches.length} batch(es) of ≤${args.batchSize}, concurrency=${args.concurrency}`);

  const queue: { id: string; urls: string[] }[] = batches.map((urls, i) => ({
    id: `${args.idPrefix}-${String(i + 1).padStart(3, "0")}`,
    urls,
  }));
  const summary: { id: string; code: number; urls: string[] }[] = [];
  const active = new Map<string, Promise<{ id: string; code: number }>>();

  async function fillSlots() {
    while (active.size < args.concurrency && queue.length > 0) {
      const job = queue.shift()!;
      const p = runBatch(job.id, job.urls).then((r) => {
        summary.push({ ...r, urls: job.urls });
        active.delete(job.id);
        return r;
      });
      active.set(job.id, p);
    }
  }

  await fillSlots();
  while (active.size > 0) {
    await Promise.race([...active.values()]);
    await fillSlots();
  }

  const okCount = summary.filter((s) => s.code === 0).length;
  console.log(`\nscheduler done: ${okCount}/${summary.length} batches succeeded`);
  const reportPath = path.join(__dirname, "..", ".port-page-cache", "batch-logs", `summary-${args.idPrefix}.json`);
  writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`summary written to ${reportPath}`);
  process.exit(okCount === summary.length ? 0 : 1);
}

void main();
