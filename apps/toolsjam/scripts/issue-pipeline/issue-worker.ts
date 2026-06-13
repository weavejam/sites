// One-issue worker. Picks an open `toolsjam-port` issue with `ready` label,
// runs the full port → review → test → push → auto-merge pipeline in a
// dedicated worktree, then exits.
//
// Usage:
//   pnpm tsx scripts/issue-pipeline/issue-worker.ts                  # claim next ready issue
//   pnpm tsx scripts/issue-pipeline/issue-worker.ts --issue 42       # claim a specific one
//   pnpm tsx scripts/issue-pipeline/issue-worker.ts --worker-id w3   # for logs
//
// Designed to be safe to run in parallel (multiple workers): claiming is done
// by adding the `in-progress` label inside a critical section guarded by the
// shared git lock (since `gh issue edit` against the same repo is fine
// concurrently, but two workers picking the same issue is not — so we re-read
// labels after attempting to add and back off if someone beat us).

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

const APP_REL = "apps\\toolsjam";
const MAIN_REPO = process.env.MAIN_REPO ?? "D:\\shudu\\shudu";
const WORKTREE_ROOT = process.env.WORKTREE_ROOT ?? "D:\\shudu\\sites-worktrees";
const APP = path.join(MAIN_REPO, APP_REL);
const BATCHES_DIR = path.join(APP, ".port-batches");
const INDEX_FILE = path.join(BATCHES_DIR, "index.json");
const STATE_FILE = path.join(BATCHES_DIR, "worker-state.json");
const PROMPT_FILE = path.join(APP, "scripts", "issue-pipeline", "dev-prompt.md");
const GIT_LOCK = path.join(WORKTREE_ROOT, ".git-lock");
const CLAIM_LOCK = path.join(WORKTREE_ROOT, ".claim-lock");

interface Args { issue: number | null; workerId: string; keepWorktree: boolean; }

function parseArgs(argv: string[]): Args {
  const a: Args = { issue: null, workerId: `w-${process.pid}`, keepWorktree: false };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === "--issue") a.issue = Number(argv[++i]);
    else if (x === "--worker-id") a.workerId = argv[++i];
    else if (x === "--keep-worktree") a.keepWorktree = true;
    else { console.error(`unknown ${x}`); process.exit(2); }
  }
  return a;
}

function log(workerId: string, msg: string) {
  process.stdout.write(`[${workerId} ${new Date().toISOString()}] ${msg}\n`);
}

function run(cmd: string, args: string[], cwd: string, workerId: string, opts: { capture?: boolean } = {}): { code: number; out: string } {
  log(workerId, `$ ${cmd} ${args.join(" ")} (cwd=${cwd})`);
  const r = spawnSync(cmd, args, {
    cwd, shell: true,
    stdio: opts.capture ? ["ignore", "pipe", "pipe"] : ["ignore", "inherit", "inherit"],
    encoding: "utf8",
  });
  return { code: r.status ?? -1, out: ((r.stdout ?? "") + (r.stderr ?? "")) };
}

function ghJson<T = unknown>(args: string[], workerId: string): T {
  const r = spawnSync("gh", args, { shell: true, encoding: "utf8" });
  if (r.status !== 0) {
    log(workerId, `gh ${args.join(" ")} failed: ${r.stderr}`);
    throw new Error(`gh failed: ${r.stderr}`);
  }
  return JSON.parse(r.stdout) as T;
}

async function acquireLock(file: string, holder: string, workerId: string, label: string): Promise<void> {
  mkdirSync(path.dirname(file), { recursive: true });
  while (true) {
    try {
      writeFileSync(file, holder, { flag: "wx" });
      return;
    } catch {
      log(workerId, `waiting for ${label} (held by ${existsSync(file) ? readFileSync(file, "utf8") : "?"})...`);
      await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
    }
  }
}
function releaseLock(file: string) { try { rmSync(file); } catch {} }

interface OpenIssue { number: number; title: string; labels: { name: string }[]; }

async function claimIssue(specific: number | null, workerId: string): Promise<OpenIssue | null> {
  await acquireLock(CLAIM_LOCK, workerId, workerId, "claim-lock");
  try {
    const queryArgs = specific
      ? ["issue", "view", String(specific), "--json", "number,title,labels"]
      : ["issue", "list", "--label", "toolsjam-port", "--label", "ready", "--state", "open", "--json", "number,title,labels", "--limit", "100"];
    const data = ghJson<OpenIssue | OpenIssue[]>(queryArgs, workerId);
    const list = Array.isArray(data) ? data : [data];
    const pick = list.find((i) => !i.labels.some((l) => l.name === "in-progress" || l.name === "blocked"));
    if (!pick) return null;
    // tag in-progress, remove ready
    run("gh", ["issue", "edit", String(pick.number), "--add-label", "in-progress", "--remove-label", "ready"], MAIN_REPO, workerId);
    run("gh", ["issue", "comment", String(pick.number), "--body", JSON.stringify(`🤖 claimed by worker \`${workerId}\` at ${new Date().toISOString()}`)], MAIN_REPO, workerId);
    return pick;
  } finally {
    releaseLock(CLAIM_LOCK);
  }
}

function findBatchIdForIssue(issueNumber: number): string | null {
  if (!existsSync(INDEX_FILE)) return null;
  const idx = JSON.parse(readFileSync(INDEX_FILE, "utf8")) as Record<string, { issue: number }>;
  for (const [k, v] of Object.entries(idx)) if (v.issue === issueNumber) return k;
  return null;
}

interface PageJob { category: string; toolId: string; htmlPath: string; }

function loadBatchJobs(batchId: string): PageJob[] {
  const file = path.join(BATCHES_DIR, `${batchId}.txt`);
  const lines = readFileSync(file, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return lines.map((l) => {
    const [category, toolId] = l.split("/");
    return { category, toolId, htmlPath: path.join(APP, ".scrape", "html", category, `${toolId}.html`) };
  });
}

function renderJobsBlock(jobs: PageJob[]): string {
  return jobs.map((j, i) =>
    `Page ${i + 1}:
- Tool id:               ${j.toolId}
- Category id:           ${j.category}
- Source URL:            https://tooldone.com/${j.category}/${j.toolId}
- Local HTML snapshot:   ${j.htmlPath.replaceAll("\\", "\\\\")}`,
  ).join("\n\n");
}

function renderDevPrompt(jobs: PageJob[], worktree: string, issueNumber: number, batchId: string, reviewOut: string): string {
  return readFileSync(PROMPT_FILE, "utf8")
    .replaceAll("<REPO_ROOT>", worktree.replaceAll("\\", "\\\\"))
    .replaceAll("{{ISSUE_NUMBER}}", String(issueNumber))
    .replaceAll("{{BATCH_ID}}", batchId)
    .replaceAll("{{REVIEW_OUT}}", reviewOut.replaceAll("\\", "\\\\"))
    .replace(/\{\{JOBS_BLOCK\}\}/g, renderJobsBlock(jobs));
}

function runCopilot(prompt: string, model: string, cwd: string, workerId: string, extraDirs: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    log(workerId, `→ copilot --model ${model} (cwd=${cwd}, prompt ${prompt.length} chars)`);
    const args = [
      "--allow-all",
      "--no-ask-user",
      "--model", model,
      "--add-dir", JSON.stringify(cwd),
      ...extraDirs.flatMap((d) => ["--add-dir", JSON.stringify(d)]),
      "--no-color",
    ];
    const child = spawn("copilot", args, { cwd, stdio: ["pipe", "inherit", "pipe"], shell: true });
    child.stderr.on("data", (b) => process.stderr.write(b));
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? -1));
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

interface WorkerState { [issue: string]: { workerId: string; batchId: string; status: string; phase: string; startedAt: string; finishedAt?: string; error?: string }; }
function loadState(): WorkerState { return existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : {}; }
function saveState(s: WorkerState) { mkdirSync(BATCHES_DIR, { recursive: true }); writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), "utf8"); }
function updateState(issue: number, patch: Partial<WorkerState[string]>) {
  const s = loadState();
  s[String(issue)] = { ...(s[String(issue)] ?? { workerId: "", batchId: "", status: "", phase: "", startedAt: "" }), ...patch };
  saveState(s);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const wid = args.workerId;

  log(wid, "claiming issue...");
  const issue = await claimIssue(args.issue, wid);
  if (!issue) { log(wid, "no ready issue available — exiting"); return; }
  log(wid, `claimed #${issue.number} — ${issue.title}`);

  const batchId = findBatchIdForIssue(issue.number);
  if (!batchId) {
    log(wid, `ERROR: no batch in index for issue #${issue.number}`);
    run("gh", ["issue", "edit", String(issue.number), "--add-label", "blocked", "--remove-label", "in-progress"], MAIN_REPO, wid);
    run("gh", ["issue", "comment", String(issue.number), "--body", JSON.stringify(`🤖 worker ${wid} could not find batch in index — needs human attention`)], MAIN_REPO, wid);
    return;
  }
  const jobs = loadBatchJobs(batchId);
  log(wid, `batch ${batchId}: ${jobs.length} pages`);

  const wt = path.join(WORKTREE_ROOT, `issue-${issue.number}`);
  const wtApp = path.join(wt, APP_REL);
  const branch = `port/issue-${issue.number}`;
  const reviewOut = path.join(wtApp, ".port-batches", `review-${batchId}.json`);

  updateState(issue.number, { workerId: wid, batchId, status: "running", phase: "worktree", startedAt: new Date().toISOString() });

  const fail = (phase: string, err: string) => {
    log(wid, `✗ failed at ${phase}: ${err}`);
    updateState(issue.number, { status: "fail", phase, error: err, finishedAt: new Date().toISOString() });
    spawnSync("gh", ["issue", "edit", String(issue.number), "--add-label", "blocked", "--remove-label", "in-progress"], { shell: true });
    spawnSync("gh", ["issue", "comment", String(issue.number), "--body", JSON.stringify(`🤖 worker ${wid} failed at \`${phase}\`: ${err}\n\nWorktree preserved at \`${wt}\` for inspection.`)], { shell: true });
  };

  try {
    // 1. worktree (serialize across workers via GIT_LOCK)
    await acquireLock(GIT_LOCK, wid, wid, "git-lock");
    try {
      run("git", ["fetch", "origin", "main"], MAIN_REPO, wid);
      if (existsSync(wt)) run("git", ["worktree", "remove", "--force", JSON.stringify(wt)], MAIN_REPO, wid);
      run("git", ["branch", "-D", branch], MAIN_REPO, wid);
      mkdirSync(WORKTREE_ROOT, { recursive: true });
      const wAdd = run("git", ["worktree", "add", "-b", branch, JSON.stringify(wt), "origin/main"], MAIN_REPO, wid);
      if (wAdd.code !== 0) throw new Error("worktree add failed");
    } finally {
      releaseLock(GIT_LOCK);
    }

    // 2. install
    updateState(issue.number, { phase: "install" });
    const inst = run("pnpm", ["install", "--frozen-lockfile", "--prefer-offline"], wt, wid);
    if (inst.code !== 0) throw new Error("pnpm install failed");

    // 3. dev cli (port + sub-agent review + fix loop)
    updateState(issue.number, { phase: "port+review" });
    mkdirSync(path.dirname(reviewOut), { recursive: true });
    const prompt = renderDevPrompt(jobs, wt, issue.number, batchId, reviewOut);
    const portCode = await runCopilot(prompt, "claude-sonnet-4.6", wt, wid, [path.join(APP, ".scrape")]);
    if (portCode !== 0) throw new Error(`dev copilot exit=${portCode}`);

    // 4. translate tool registry + messages into 9 non-en locales
    updateState(issue.number, { phase: "translate" });
    const toolIds = jobs.map((j) => j.toolId);
    const tr = run("pnpm", ["translate-tool", ...toolIds], wtApp, wid);
    if (tr.code !== 0) throw new Error(`translate-tool failed (${toolIds.join(",")})`);

    // 5. barrel + tests + build + e2e
    updateState(issue.number, { phase: "test" });
    const bar = run("pnpm", ["fixtures:barrel"], wtApp, wid);
    if (bar.code !== 0) throw new Error("fixtures:barrel failed");
    const t1 = run("pnpm", ["test"], wtApp, wid);
    if (t1.code !== 0) throw new Error("vitest failed");
    const b = run("pnpm", ["build"], wtApp, wid);
    if (b.code !== 0) throw new Error("build failed");
    const grep = jobs.map((j) => j.toolId).join("|");
    const e2e = run("pnpm", ["test:e2e", "--grep", JSON.stringify(grep)], wtApp, wid);
    if (e2e.code !== 0) throw new Error("playwright failed");

    // 5. commit + push
    updateState(issue.number, { phase: "commit" });
    run("git", ["add", "-A"], wt, wid);
    const ids = jobs.map((j) => `${j.category}/${j.toolId}`).join(", ");
    const msg = `port(toolsjam): ${batchId} — ${ids}\n\nCloses #${issue.number}\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`;
    const cm = run("git", ["commit", "-m", JSON.stringify(msg)], wt, wid);
    if (cm.code !== 0) throw new Error("git commit failed");
    const push = run("git", ["push", "-u", "origin", branch], wt, wid);
    if (push.code !== 0) throw new Error("git push failed");

    // 6. open PR with review report
    updateState(issue.number, { phase: "pr" });
    let reviewBlock = "_(reviewer sub-agent produced no JSON report)_";
    if (existsSync(reviewOut)) {
      const r = readFileSync(reviewOut, "utf8");
      reviewBlock = `<details><summary>Reviewer sub-agent (gpt-5.5) report</summary>\n\n\`\`\`json\n${r}\n\`\`\`\n\n</details>`;
    }
    const prBody = `Closes #${issue.number}\n\nBatch: \`${batchId}\`\nPages: ${ids}\n\n${reviewBlock}\n`;
    const prBodyFile = path.join(wt, ".pr-body.md");
    writeFileSync(prBodyFile, prBody, "utf8");
    const prCreate = run("gh", ["pr", "create", "--title", JSON.stringify(`port(toolsjam): ${batchId}`), "--body-file", JSON.stringify(prBodyFile), "--base", "main", "--head", branch], wt, wid);
    if (prCreate.code !== 0) throw new Error("gh pr create failed");
    run("gh", ["pr", "merge", "--auto", "--squash", "--delete-branch"], wt, wid);

    // 7. cleanup worktree (branch stays on remote until auto-merge fires)
    updateState(issue.number, { phase: "cleanup", status: "ok", finishedAt: new Date().toISOString() });
    if (!args.keepWorktree) {
      await acquireLock(GIT_LOCK, wid, wid, "git-lock");
      try {
        run("git", ["worktree", "remove", "--force", JSON.stringify(wt)], MAIN_REPO, wid);
        // git worktree remove may leave node_modules junctions / build cache behind
        try { rmSync(wt, { recursive: true, force: true }); } catch {}
        run("git", ["worktree", "prune"], MAIN_REPO, wid);
      } finally {
        releaseLock(GIT_LOCK);
      }
    }
    log(wid, `✓ done #${issue.number}`);
  } catch (e) {
    fail(loadState()[String(issue.number)]?.phase ?? "?", String(e));
    process.exit(1);
  }
}

void main();
