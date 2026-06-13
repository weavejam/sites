// Port a single tool page from tooldone.com to apps/toolsjam/.
//
// Usage:
//   pnpm port-page math/percentage-calculator
//   pnpm port-page --batch .scrape/pilot.txt
//   pnpm port-page math/percentage-calculator --dry-run
//
// For each input, this script:
//   1. Resolves the local HTML snapshot in .scrape/html/<category>/<slug>.html
//   2. Renders the per-page prompt from scripts/port-prompt.md
//   3. Spawns `copilot -p <prompt> --allow-all-tools --add-dir <repo>` as a
//      non-interactive subprocess and waits for it to finish.
//   4. Logs success/failure to .port-page-cache/state.json.

import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..");
const REPO = path.resolve(APP, "..", "..");
const PROMPT_FILE = path.join(APP, "scripts", "port-prompt.md");
const SCRAPE_DIR = path.join(APP, ".scrape", "html");
const CACHE_DIR = path.join(APP, ".port-page-cache");
const STATE_FILE = path.join(CACHE_DIR, "state.json");
const BASE_URL = "https://tooldone.com";

interface State {
  [path: string]: { status: "ok" | "fail"; at: string; durationMs: number; error?: string };
}

interface Job {
  category: string;
  slug: string;
  url: string;
  htmlPath: string;
}

function parseArgs(argv: string[]): { paths: string[]; batch: string | null; dryRun: boolean; force: boolean } {
  const out = { paths: [] as string[], batch: null as string | null, dryRun: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--batch") out.batch = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a.startsWith("--")) {
      console.error(`unknown flag ${a}`);
      process.exit(2);
    } else out.paths.push(a);
  }
  return out;
}

function loadJobs(paths: string[], batch: string | null): Job[] {
  const all: string[] = [];
  if (batch) {
    const file = path.isAbsolute(batch) ? batch : path.resolve(process.cwd(), batch);
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (t && !t.startsWith("#")) all.push(t);
    }
  }
  all.push(...paths);
  const jobs: Job[] = [];
  for (const raw of all) {
    let p = raw.replace(/^https?:\/\/tooldone\.com\//, "").replace(/^\/+|\/+$/g, "");
    if (!p) continue;
    const parts = p.split("/");
    if (parts.length !== 2) {
      console.warn(`skip ${raw}: expected <category>/<slug>`);
      continue;
    }
    const [category, slug] = parts;
    const htmlPath = path.join(SCRAPE_DIR, category, `${slug}.html`);
    if (!existsSync(htmlPath)) {
      console.warn(`skip ${raw}: snapshot missing at ${htmlPath} (run pnpm scrape first)`);
      continue;
    }
    jobs.push({ category, slug, url: `${BASE_URL}/${category}/${slug}`, htmlPath });
  }
  return jobs;
}

function renderPrompt(job: Job): string {
  const tpl = readFileSync(PROMPT_FILE, "utf8");
  return tpl
    .replaceAll("{{TOOL_ID}}", job.slug)
    .replaceAll("{{CATEGORY}}", job.category)
    .replaceAll("{{URL}}", job.url)
    .replaceAll("{{HTML_PATH}}", job.htmlPath.replaceAll("\\", "\\\\"));
}

function loadState(): State {
  if (!existsSync(STATE_FILE)) return {};
  return JSON.parse(readFileSync(STATE_FILE, "utf8")) as State;
}
function saveState(s: State) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), "utf8");
}

async function runCopilot(prompt: string): Promise<{ code: number; stderr: string }> {
  return await new Promise((resolve, reject) => {
    // Pass prompt via stdin so the command line stays short (no shell-quoting
    // headaches for multi-line prompts). shell:true on Windows so .cmd
    // shims resolve; safe because no untrusted data hits the command line.
    const child = spawn(
      "copilot",
      ["--allow-all-tools", "--model", "claude-opus-4.8", "--add-dir", JSON.stringify(REPO), "--no-color"],
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

async function main() {
  const { paths, batch, dryRun, force } = parseArgs(process.argv.slice(2));
  const jobs = loadJobs(paths, batch);
  if (jobs.length === 0) {
    console.error("no jobs (pass <category>/<slug> args or --batch <file>)");
    process.exit(2);
  }
  console.log(`port-page: ${jobs.length} job(s)${dryRun ? " (dry-run)" : ""}`);
  const state = loadState();
  let okCount = 0, failCount = 0, skipCount = 0;
  for (const job of jobs) {
    const key = `${job.category}/${job.slug}`;
    if (!force && state[key]?.status === "ok") {
      console.log(`= ${key} (skipped, already ok; use --force to redo)`);
      skipCount++;
      continue;
    }
    console.log(`\n=== ${key} ===`);
    if (dryRun) {
      console.log(renderPrompt(job).slice(0, 600) + "\n...");
      continue;
    }
    const t0 = Date.now();
    try {
      const { code, stderr } = await runCopilot(renderPrompt(job));
      const dur = Date.now() - t0;
      if (code === 0) {
        state[key] = { status: "ok", at: new Date().toISOString(), durationMs: dur };
        okCount++;
        console.log(`✓ ${key} in ${(dur / 1000).toFixed(1)}s`);
      } else {
        state[key] = { status: "fail", at: new Date().toISOString(), durationMs: dur, error: stderr.slice(-2000) };
        failCount++;
        console.error(`✗ ${key} exit=${code}`);
      }
      saveState(state);
    } catch (e) {
      failCount++;
      const dur = Date.now() - t0;
      state[key] = { status: "fail", at: new Date().toISOString(), durationMs: dur, error: String(e) };
      saveState(state);
      console.error(`✗ ${key} threw: ${e}`);
    }
  }
  console.log(`\nfinished: ok=${okCount} fail=${failCount} skipped=${skipCount}`);
  process.exit(failCount === 0 ? 0 : 1);
}

void main();
