// Refresh open toolsjam-port issues with re-rendered PRD body + new title.
// Use when the PRD template or pipeline changes and you want the existing
// issues to reflect the new contract.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { ghExec } from "./gh-helper";

const APP = path.resolve(__dirname, "..", "..");
const REPO_ROOT = path.resolve(APP, "..", "..");
const BATCHES_DIR = path.join(APP, ".port-batches");
const INDEX_FILE = path.join(BATCHES_DIR, "index.json");
const TEMPLATE_FILE = path.join(__dirname, "prd-template.md");
const BASE_URL = "https://tooldone.com";

interface IndexEntry { issue: number; urls: string[]; status: string; createdAt: string; }
type Index = Record<string, IndexEntry>;

interface PageJob { category: string; toolId: string; url: string; htmlPath: string; }

function parseUrl(raw: string): PageJob | null {
  const stripped = raw.replace(/^https?:\/\/tooldone\.com\//, "").replace(/^\/+|\/+$/g, "");
  const [category, toolId, ...rest] = stripped.split("/");
  if (!category || !toolId || rest.length) return null;
  return {
    category, toolId,
    url: `${BASE_URL}/${category}/${toolId}`,
    htmlPath: path.join(APP, ".scrape", "html", category, `${toolId}.html`),
  };
}

function renderPrd(batchId: string, jobs: PageJob[], issueNumber: number): string {
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

function titleFor(batchId: string, jobs: PageJob[]): string {
  const ids = jobs.map((j) => `${j.category}/${j.toolId}`).join(", ");
  return `port(toolsjam): ${batchId} — ${ids}`;
}

async function main() {
  if (!existsSync(INDEX_FILE)) { console.error("no index.json"); process.exit(2); }
  const idx: Index = JSON.parse(readFileSync(INDEX_FILE, "utf8"));
  mkdirSync(BATCHES_DIR, { recursive: true });
  const tmpBody = path.join(BATCHES_DIR, ".tmp-refresh.md");

  for (const [batchId, entry] of Object.entries(idx)) {
    if (entry.status !== "open") { console.log(`skip ${batchId} (status=${entry.status})`); continue; }
    const jobs: PageJob[] = entry.urls.map(parseUrl).filter((j): j is PageJob => j !== null);
    if (jobs.length !== entry.urls.length) {
      console.warn(`${batchId} #${entry.issue}: ${entry.urls.length - jobs.length} urls failed to parse`);
    }
    const body = renderPrd(batchId, jobs, entry.issue);
    const title = titleFor(batchId, jobs);
    writeFileSync(tmpBody, body, "utf8");
    try {
      await ghExec(
        ["issue", "edit", String(entry.issue), "--title", title, "--body-file", tmpBody],
        { cwd: REPO_ROOT },
      );
      console.log(`refreshed ${batchId} #${entry.issue}`);
    } catch (e) {
      console.error(`FAIL ${batchId} #${entry.issue}: ${(e as Error).message}`);
    }
  }
  try { require("node:fs").unlinkSync(tmpBody); } catch {}
}

main();
