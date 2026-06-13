// SEO + quality reviewer pass — spawns a separate copilot CLI subprocess
// (GPT-5.5 by default) with scripts/review-prompt.md and lets it audit +
// auto-fix one tool page. Designed to run after scripts/port-page.ts.
//
// Usage:
//   pnpm review-page math/percentage-calculator
//   pnpm review-page --batch .scrape/pilot.txt
//   pnpm review-page math/percentage-calculator --model gpt-5.5

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..");
const REPO = path.resolve(APP, "..", "..");
const PROMPT_FILE = path.join(APP, "scripts", "review-prompt.md");
const CACHE_DIR = path.join(APP, ".port-page-cache");
const REVIEWS_DIR = path.join(CACHE_DIR, "reviews");
const STATE_FILE = path.join(CACHE_DIR, "review-state.json");

type Args = { paths: string[]; batch: string | null; model: string; force: boolean };

function parseArgs(argv: string[]): Args {
  const out: Args = { paths: [], batch: null, model: "gpt-5.5", force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--batch") out.batch = argv[++i];
    else if (a === "--model") out.model = argv[++i];
    else if (a === "--force") out.force = true;
    else if (a.startsWith("--")) { console.error(`unknown flag ${a}`); process.exit(2); }
    else out.paths.push(a);
  }
  return out;
}

interface Job { category: string; toolId: string; }

function loadJobs(args: Args): Job[] {
  const all: string[] = [];
  if (args.batch) {
    const file = path.isAbsolute(args.batch) ? args.batch : path.resolve(process.cwd(), args.batch);
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (t && !t.startsWith("#")) all.push(t);
    }
  }
  all.push(...args.paths);
  const jobs: Job[] = [];
  for (const raw of all) {
    const p = raw.replace(/^https?:\/\/tooldone\.com\//, "").replace(/^\/+|\/+$/g, "");
    const parts = p.split("/");
    if (parts.length !== 2) { console.warn(`skip ${raw}: expected <category>/<slug>`); continue; }
    jobs.push({ category: parts[0], toolId: parts[1] });
  }
  return jobs;
}

function renderPrompt(job: Job): string {
  return readFileSync(PROMPT_FILE, "utf8")
    .replaceAll("{{TOOL_ID}}", job.toolId)
    .replaceAll("{{CATEGORY}}", job.category);
}

interface State { [key: string]: { at: string; status: string; durationMs: number; reportStatus?: string }; }
function loadState(): State {
  if (!existsSync(STATE_FILE)) return {};
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
}
function saveState(s: State) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), "utf8");
}

async function runCopilot(prompt: string, model: string): Promise<{ code: number; stderr: string }> {
  return await new Promise((resolve, reject) => {
    const child = spawn(
      "copilot",
      ["--allow-all-tools", "--model", model, "--add-dir", JSON.stringify(REPO), "--no-color"],
      { cwd: REPO, stdio: ["pipe", "inherit", "pipe"], shell: true },
    );
    let stderr = "";
    child.stderr.on("data", (b) => { stderr += b.toString(); process.stderr.write(b); });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code: code ?? -1, stderr }));
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function parseReportStatus(toolId: string): string | undefined {
  const f = path.join(REVIEWS_DIR, `${toolId}.md`);
  if (!existsSync(f)) return undefined;
  const m = readFileSync(f, "utf8").match(/^Status:\s*(\w+)/m);
  return m?.[1];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const jobs = loadJobs(args);
  if (jobs.length === 0) { console.error("no jobs"); process.exit(2); }
  mkdirSync(REVIEWS_DIR, { recursive: true });
  const state = loadState();
  let ok = 0, fail = 0, skipped = 0;
  console.log(`review-page: ${jobs.length} job(s), model=${args.model}`);
  for (const job of jobs) {
    const key = `${job.category}/${job.toolId}`;
    if (!args.force && state[key]?.reportStatus === "OK") {
      console.log(`= ${key} (skipped, prior status=OK; use --force)`);
      skipped++; continue;
    }
    console.log(`\n=== review: ${key} ===`);
    const t0 = Date.now();
    try {
      const { code } = await runCopilot(renderPrompt(job), args.model);
      const dur = Date.now() - t0;
      const reportStatus = parseReportStatus(job.toolId);
      state[key] = { at: new Date().toISOString(), status: code === 0 ? "ok" : "fail", durationMs: dur, reportStatus };
      saveState(state);
      if (code === 0) { ok++; console.log(`✓ ${key} in ${(dur/1000).toFixed(1)}s, report=${reportStatus ?? "?"}`); }
      else { fail++; console.error(`✗ ${key} exit=${code}`); }
    } catch (e) {
      fail++;
      const dur = Date.now() - t0;
      state[key] = { at: new Date().toISOString(), status: "fail", durationMs: dur };
      saveState(state);
      console.error(`✗ ${key} threw: ${e}`);
    }
  }
  console.log(`\nfinished: ok=${ok} fail=${fail} skipped=${skipped}`);
  process.exit(fail === 0 ? 0 : 1);
}

void main();
