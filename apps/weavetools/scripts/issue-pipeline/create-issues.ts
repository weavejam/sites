// Create GitHub issues for weavetools migration batches.
//
// Usage:
//   pnpm tsx scripts/issue-pipeline/create-issues.ts --count 10            # smoke
//   pnpm tsx scripts/issue-pipeline/create-issues.ts --all                 # all remaining
//   pnpm tsx scripts/issue-pipeline/create-issues.ts --range 11 20         # 1-based, inclusive
//   pnpm tsx scripts/issue-pipeline/create-issues.ts --dry-run
//
// Reads .scrape/urls-en.txt, slices into 5-page batches (skipping already-ported
// tools by checking src/data/tools/*.ts for the id), writes
// .port-batches/batch-NNN.txt for each batch, and creates one GitHub issue per
// batch with the rendered PRD as its body.
//
// State:
//   .port-batches/index.json  -> { "batch-001": { issue: 42, urls: [...], status: "open" } }

import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..", "..");
const SCRAPE_URLS = path.join(APP, ".scrape", "urls-en.txt");
const BATCHES_DIR = path.join(APP, ".port-batches");
const INDEX_FILE = path.join(BATCHES_DIR, "index.json");
const TEMPLATE_FILE = path.join(__dirname, "prd-template.md");
const TOOLS_DATA_DIR = path.join(APP, "src", "data", "tools");

const BATCH_SIZE = 5;
const BASE_URL = "https://___WEAVETOOLS_DOT_COM___";
const LABELS = ["weavetools-port", "ready"];

interface Args {
  count: number | null;
  all: boolean;
  range: [number, number] | null;
  dryRun: boolean;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { count: null, all: false, range: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === "--count") a.count = Number(argv[++i]);
    else if (x === "--all") a.all = true;
    else if (x === "--range") a.range = [Number(argv[++i]), Number(argv[++i])];
    else if (x === "--dry-run") a.dryRun = true;
    else { console.error(`unknown arg ${x}`); process.exit(2); }
  }
  return a;
}

function readPortedToolIds(): Set<string> {
  const ported = new Set<string>();
  if (!existsSync(TOOLS_DATA_DIR)) return ported;
  for (const f of readdirSync(TOOLS_DATA_DIR)) {
    if (!f.endsWith(".ts")) continue;
    const src = readFileSync(path.join(TOOLS_DATA_DIR, f), "utf8");
    for (const m of src.matchAll(/id:\s*"([^"]+)"/g)) ported.add(m[1]);
  }
  return ported;
}

interface PageJob { category: string; toolId: string; url: string; htmlPath: string; }

function parseUrl(raw: string): PageJob | null {
  const stripped = raw.replace(/^https?:\/\/weavetools\.com\//, "").replace(/^\/+|\/+$/g, "");
  const [category, toolId, ...rest] = stripped.split("/");
  if (!category || !toolId || rest.length) return null;
  return {
    category,
    toolId,
    url: `${BASE_URL}/${category}/${toolId}`,
    htmlPath: path.join(APP, ".scrape", "html", category, `${toolId}.html`),
  };
}

interface IndexEntry { issue: number; urls: string[]; status: string; createdAt: string; }
type Index = Record<string, IndexEntry>;

function loadIndex(): Index {
  if (!existsSync(INDEX_FILE)) return {};
  return JSON.parse(readFileSync(INDEX_FILE, "utf8"));
}

function saveIndex(idx: Index) {
  mkdirSync(BATCHES_DIR, { recursive: true });
  writeFileSync(INDEX_FILE, JSON.stringify(idx, null, 2), "utf8");
}

function renderPrd(batchId: string, jobs: PageJob[], issueNumber: number | string): string {
  const tpl = readFileSync(TEMPLATE_FILE, "utf8");
  const table = [
    "| # | Category | Tool ID | Source URL | HTML Snapshot |",
    "|---|----------|---------|-----------|---------------|",
    ...jobs.map((j, i) =>
      `| ${i + 1} | ${j.category} | \`${j.toolId}\` | ${j.url} | \`${path.relative(APP, j.htmlPath).replaceAll("\\", "/")}\` |`,
    ),
  ].join("\n");
  return tpl
    .replaceAll("{{BATCH_ID}}", batchId)
    .replaceAll("{{N_PAGES}}", String(jobs.length))
    .replaceAll("{{ISSUE_NUMBER}}", String(issueNumber))
    .replace("{{PAGES_TABLE}}", table);
}

function ghCreateIssue(title: string, body: string, labels: string[]): number {
  // gh issue create returns the URL on stdout — extract the issue number.
  const bodyFile = path.join(BATCHES_DIR, ".tmp-body.md");
  writeFileSync(bodyFile, body, "utf8");
  try {
    const out = execSync(
      `gh issue create --title ${JSON.stringify(title)} --body-file ${JSON.stringify(bodyFile)} ${labels.map((l) => `--label ${JSON.stringify(l)}`).join(" ")}`,
      { cwd: path.resolve(APP, "..", ".."), encoding: "utf8" },
    );
    const m = out.match(/\/issues\/(\d+)/);
    if (!m) throw new Error(`could not parse issue number from: ${out}`);
    return Number(m[1]);
  } finally {
    try { require("node:fs").unlinkSync(bodyFile); } catch {}
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.count == null && !args.all && !args.range) {
    console.error("specify --count <N> or --all or --range A B");
    process.exit(2);
  }

  const ported = readPortedToolIds();
  console.log(`already ported: ${ported.size} tools`);

  const allUrls = readFileSync(SCRAPE_URLS, "utf8")
    .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

  const jobs: PageJob[] = [];
  for (const u of allUrls) {
    const j = parseUrl(u);
    if (!j) { console.warn(`skip malformed ${u}`); continue; }
    if (ported.has(j.toolId)) continue;
    if (!existsSync(j.htmlPath)) { console.warn(`skip missing snapshot ${j.toolId}`); continue; }
    jobs.push(j);
  }
  console.log(`eligible pages: ${jobs.length}`);

  // Group by category so each batch's en.json edits sit in one ToolEntry file.
  jobs.sort((a, b) => a.category.localeCompare(b.category) || a.toolId.localeCompare(b.toolId));

  const allBatches: PageJob[][] = [];
  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    allBatches.push(jobs.slice(i, i + BATCH_SIZE));
  }
  console.log(`total batches: ${allBatches.length}`);

  const index = loadIndex();
  // Track which allBatches indices have already been consumed by a previous
  // run. We key on the first url of each entry (stable) — if two index entries
  // share the same first url, dedupe (defensive).
  const consumedFirstUrls = new Set<string>();
  for (const entry of Object.values(index)) {
    if (entry.urls[0]) consumedFirstUrls.add(entry.urls[0]);
  }
  const remainingBatches = allBatches.filter((b) => !consumedFirstUrls.has(`${b[0].category}/${b[0].toolId}`));
  console.log(`already-created batches in index: ${Object.keys(index).length}; remaining: ${remainingBatches.length}`);

  const existingBatchNums = Object.keys(index)
    .map((k) => Number(k.replace("batch-", "")))
    .filter((n) => !Number.isNaN(n));
  const startNum = (existingBatchNums.length ? Math.max(...existingBatchNums) : 0) + 1;

  let toCreate: { num: number; jobs: PageJob[] }[];
  if (args.range) {
    const [from, to] = args.range;
    toCreate = allBatches.slice(from - 1, to).map((j, i) => ({ num: from + i, jobs: j }));
  } else {
    const take = args.all ? remainingBatches.length : (args.count ?? 0);
    toCreate = remainingBatches.slice(0, take).map((j, i) => ({ num: startNum + i, jobs: j }));
  }
  console.log(`will create ${toCreate.length} issues starting at batch-${String(toCreate[0]?.num).padStart(3, "0")}`);

  if (args.dryRun) {
    for (const b of toCreate) {
      const id = `batch-${String(b.num).padStart(3, "0")}`;
      console.log(`[DRY] ${id}: ${b.jobs.map((j) => `${j.category}/${j.toolId}`).join(", ")}`);
    }
    return;
  }

  mkdirSync(BATCHES_DIR, { recursive: true });
  for (const b of toCreate) {
    const id = `batch-${String(b.num).padStart(3, "0")}`;
    const batchFile = path.join(BATCHES_DIR, `${id}.txt`);
    writeFileSync(batchFile, b.jobs.map((j) => `${j.category}/${j.toolId}`).join("\n") + "\n", "utf8");

    const title = `port(weavetools): ${id} — ${b.jobs.map((j) => `${j.category}/${j.toolId}`).join(", ")}`.slice(0, 250);
    const bodyPreview = renderPrd(id, b.jobs, "{{TBD}}");
    const issueNumber = ghCreateIssue(title, bodyPreview, LABELS);

    // Re-render with real issue number and update issue body.
    const finalBody = renderPrd(id, b.jobs, issueNumber);
    const tmp = path.join(BATCHES_DIR, ".tmp-body.md");
    writeFileSync(tmp, finalBody, "utf8");
    execSync(`gh issue edit ${issueNumber} --body-file ${JSON.stringify(tmp)}`, {
      cwd: path.resolve(APP, "..", ".."), stdio: "inherit",
    });
    try { require("node:fs").unlinkSync(tmp); } catch {}

    index[id] = {
      issue: issueNumber,
      urls: b.jobs.map((j) => `${j.category}/${j.toolId}`),
      status: "open",
      createdAt: new Date().toISOString(),
    };
    saveIndex(index);
    console.log(`✓ ${id} -> #${issueNumber}`);
  }

  console.log(`done. created ${toCreate.length} issues.`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
