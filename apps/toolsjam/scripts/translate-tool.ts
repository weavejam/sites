// Translate one or more tools' English content into the other 9 locales.
//
// Usage:
//   pnpm translate-tool <toolId> [<toolId2> ...]
//   pnpm translate-tool --all                 # every tool whose non-en
//                                             # fields are still empty
//   pnpm translate-tool <toolId> --force      # re-translate even if filled
//
// What it does, per tool:
//   1. Reads English content from:
//        - messages/en.json    → tool.<id>
//        - src/data/tools/<category>.ts → entry's en title/slug/desc
//   2. Spawns a single `copilot` CLI invocation with one large prompt:
//      "translate this JSON blob into 9 locales, respond with one JSON
//       object keyed by locale, no commentary".
//   3. Parses the response, merges per-locale strings into:
//        - messages/<locale>.json under tool.<id>
//        - the ToolEntry's slug/title/description for each locale
//
// Failure modes & how we handle them:
//   - copilot output not valid JSON → retry up to 3 times.
//   - Missing locale in response → fail that tool, continue with next.
//   - Network/API errors → retry with exponential backoff.

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";

const APP = path.resolve(__dirname, "..");
const REPO = path.resolve(APP, "..", "..");
const MESSAGES_DIR = path.join(APP, "messages");
const DATA_DIR = path.join(APP, "src", "data", "tools");
const CACHE_DIR = path.join(APP, ".port-page-cache");
const STATE_FILE = path.join(CACHE_DIR, "translate-state.json");

const LOCALES = ["en", "zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de", "pt", "ru"] as const;
const TARGET_LOCALES = LOCALES.filter((l) => l !== "en");

const LOCALE_NAMES: Record<string, string> = {
  "zh-CN": "Simplified Chinese (Mainland China)",
  "zh-TW": "Traditional Chinese (Taiwan)",
  ja: "Japanese",
  ko: "Korean",
  es: "Spanish (international)",
  fr: "French (international)",
  de: "German",
  pt: "Portuguese (Brazil)",
  ru: "Russian",
};

type Args = { ids: string[]; all: boolean; force: boolean };

function parseArgs(argv: string[]): Args {
  const out: Args = { ids: [], all: false, force: false };
  for (const a of argv) {
    if (a === "--all") out.all = true;
    else if (a === "--force") out.force = true;
    else if (a.startsWith("--")) { console.error(`unknown flag ${a}`); process.exit(2); }
    else out.ids.push(a);
  }
  return out;
}

function loadJson(p: string): Record<string, unknown> {
  return JSON.parse(readFileSync(p, "utf8"));
}
function saveJson(p: string, obj: unknown) {
  writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function loadState(): Record<string, { at: string; status: "ok" | "fail"; error?: string }> {
  if (!existsSync(STATE_FILE)) return {};
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
}
function saveState(s: Record<string, unknown>) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), "utf8");
}

interface ToolEntry {
  id: string;
  category: string;
  slugs: Record<string, string>;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}

function readCategoryFile(category: string): { source: string; entries: ToolEntry[] } {
  const file = path.join(DATA_DIR, `${category}.ts`);
  const src = readFileSync(file, "utf8");
  // Trivial JSON-like extraction: the file is generated and has predictable shape.
  // We rebuild it from a parsed AST-light form: pull each object literal.
  const m = src.match(/export const tools[^=]*=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (!m) throw new Error(`could not parse tools array in ${file}`);
  // Use Function constructor to eval the array literal (we control the file).
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const arr = Function(`"use strict"; return (${m[1]});`)() as ToolEntry[];
  return { source: src, entries: arr };
}

function writeCategoryFile(category: string, entries: ToolEntry[]) {
  const file = path.join(DATA_DIR, `${category}.ts`);
  const body = JSON.stringify(entries, null, 2)
    // pretty: turn it back into a TS literal with unquoted keys where safe.
    .replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, "$1:");
  const out = `import type { ToolEntry } from "@/data/tools";\n\nexport const tools: ToolEntry[] = ${body};\n`;
  writeFileSync(file, out, "utf8");
}

function findEntry(id: string): { category: string; entry: ToolEntry; entries: ToolEntry[] } | null {
  // Scan all category files until we find the entry.
  const fs = require("node:fs") as typeof import("node:fs");
  for (const f of fs.readdirSync(DATA_DIR)) {
    if (!f.endsWith(".ts")) continue;
    const category = f.replace(/\.ts$/, "");
    try {
      const { entries } = readCategoryFile(category);
      const e = entries.find((x) => x.id === id);
      if (e) return { category, entry: e, entries };
    } catch { /* file might be empty / not parseable */ }
  }
  return null;
}

function isEntryFullyTranslated(e: ToolEntry): boolean {
  for (const l of TARGET_LOCALES) {
    if (!e.slugs[l] || !e.titles[l] || !e.descriptions[l]) return false;
  }
  return true;
}

function isCacheComplete(toolId: string): boolean {
  const f = path.join(CACHE_DIR, "translations", `${toolId}.json`);
  if (!existsSync(f)) return false;
  try {
    const parsed = JSON.parse(readFileSync(f, "utf8")) as Record<string, { content?: unknown }>;
    return TARGET_LOCALES.every((l) => !!parsed[l]?.content);
  } catch { return false; }
}

function findAllUntranslated(): string[] {
  // "Untranslated" now means: tool registry entry exists but cache JSON is
  // missing or incomplete.  Tools with a complete cache but un-applied entry
  // are NOT returned — apply-translations handles those.
  const fs = require("node:fs") as typeof import("node:fs");
  const out: string[] = [];
  for (const f of fs.readdirSync(DATA_DIR)) {
    if (!f.endsWith(".ts")) continue;
    const category = f.replace(/\.ts$/, "");
    try {
      const { entries } = readCategoryFile(category);
      for (const e of entries) {
        if (!isCacheComplete(e.id)) out.push(e.id);
      }
    } catch { /* ignore */ }
  }
  return out;
}

function buildPrompt(toolId: string, enContent: Record<string, unknown>, enMeta: { title: string; description: string; categoryEnglish: string }, outFilePath: string): string {
  const targetSpec = TARGET_LOCALES.map((l) => `  - "${l}" (${LOCALE_NAMES[l]})`).join("\n");
  // Escape backslashes for the prompt so Windows paths survive copy/paste
  // into shell quoting inside the copilot CLI session.
  const escapedPath = outFilePath.replace(/\\/g, "\\\\");
  return `Translate the English content below into 9 locales:
${targetSpec}

Tool id: ${toolId}
Category: ${enMeta.categoryEnglish}
English page title: ${enMeta.title}
English meta description: ${enMeta.description}

English content blob (under tool.${toolId} namespace):
${JSON.stringify(enContent, null, 2)}

Output a single JSON object — NOTHING ELSE, no markdown, no commentary, no
\`\`\` fences. The shape MUST be:

{
  "${TARGET_LOCALES[0]}": {
    "slug": "<seo-friendly url slug for this locale, lowercase ASCII, hyphenated; for non-latin locales transliterate>",
    "title": "<localized page title, ≤ 60 chars, no brand name, lead with primary keyword>",
    "description": "<localized meta description, ≤ 160 chars>",
    "content": { <full translated namespace mirroring the English content keys exactly, including nested objects and arrays> }
  },
  ...one entry per target locale...
}

Translation rules:
- Native, idiomatic phrasing for each locale, not literal word-for-word.
- Preserve placeholders like {p}, {t}, {r}, {a}, {v}, {h}.
- Preserve key names exactly (only translate values).
- For arrays (e.g. examples.items) translate each element's string values.
- Numbers in worked examples stay as numbers; only translate prose.
- Slugs: lowercase, ASCII, hyphens only; transliterate Chinese to pinyin
  (no tones), Japanese to romaji, Korean to revised romanization, Russian
  to standard transliteration. Keep slugs short and keyword-rich.
- Titles: SEO-style, no brand suffix, no "Free Online Tool" filler unless
  it's a high-search-volume phrase in that language.

Write the JSON to a file you create at:
  ${escapedPath}

That EXACT path — do not change directories, do not pick a different cache
folder.  After writing the file, exit.  Do not print the JSON to the terminal.
`;
}

// --- Sub-account rotation -------------------------------------------------
//
// Every spawned copilot CLI gets a random profile from
// `~/.copilot/accounts/tokens.json` to spread API load across separate GitHub
// Copilot subscriptions.  This is what unblocked the overnight throttle
// problem: with 5 accounts in rotation the per-account QPS drops 5×.
//
// Each profile lives at `~/.copilot/accounts/<name>` and supplies its own
// PAT via tokens.json; we mirror that into the child env (USERPROFILE/HOME
// + COPILOT_GITHUB_TOKEN) without touching this process's own env.
type AccountChoice = { name: string; env: NodeJS.ProcessEnv };
let _accountNames: string[] | null = null;
let _accountTokens: Record<string, string> | null = null;

function loadAccounts(): { names: string[]; tokens: Record<string, string> } {
  if (_accountNames && _accountTokens) return { names: _accountNames, tokens: _accountTokens };
  const home = process.env.USERPROFILE || process.env.HOME || "";
  const tokensPath = path.join(home, ".copilot", "accounts", "tokens.json");
  if (!existsSync(tokensPath)) {
    // Caller is responsible — if not present, fall back to inheriting parent env.
    _accountNames = [];
    _accountTokens = {};
    return { names: [], tokens: {} };
  }
  const raw = JSON.parse(readFileSync(tokensPath, "utf8")) as Record<string, string>;
  _accountTokens = raw;
  _accountNames = Object.keys(raw);
  return { names: _accountNames, tokens: _accountTokens };
}

function pickAccount(): AccountChoice | null {
  const { names, tokens } = loadAccounts();
  if (names.length === 0) return null;
  const name = names[Math.floor(Math.random() * names.length)];
  const home = process.env.USERPROFILE || process.env.HOME || "";
  const profileDir = path.join(home, ".copilot", "accounts", name);
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    USERPROFILE: profileDir,
    HOME: profileDir,
    COPILOT_GITHUB_TOKEN: tokens[name],
  };
  return { name, env };
}

async function runCopilot(prompt: string, model: string): Promise<{ code: number; stderr: string }> {
  const acct = pickAccount();
  if (acct) console.log(`  ↳ account=${acct.name}`);
  return await new Promise((resolve, reject) => {
    const child = spawn(
      "copilot",
      [
        "--allow-all",
        "--no-ask-user",
        "--model", model,
        "--add-dir", JSON.stringify(REPO),
        "--no-color",
      ],
      {
        cwd: REPO,
        stdio: ["pipe", "inherit", "pipe"],
        shell: true,
        env: acct?.env ?? process.env,
      },
    );
    let stderr = "";
    child.stderr.on("data", (b) => { stderr += b.toString(); process.stderr.write(b); });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code: code ?? -1, stderr }));
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

// Models tried in order. gpt-5.4-mini handles 90%+ at ~5x lower cost; we
// fall back to gpt-5.5 for the long-tail tools the mini model can't get
// right (typically returns JSON missing one locale, especially "pt", on
// content with many domain-specific terms).
const MODEL_FALLBACK = ["gpt-5.4-mini", "gpt-5.5"] as const;
const ATTEMPTS_PER_MODEL = 3;
// Backoff between attempts (seconds) — copilot CLI relays "transient API
// error" from the model gateway; with 4 concurrent workers each issuing
// 10-locale prompts the gateway throttles for ~30-60s.  Sleeping long
// enough past the throttle window gets a much higher success rate than
// hammering immediately.
const BACKOFF_SEC = [0, 45, 90];

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateOne(toolId: string, force: boolean): Promise<boolean> {
  const found = findEntry(toolId);
  if (!found) { console.error(`✗ ${toolId}: not in any category registry`); return false; }
  if (!force && isCacheComplete(toolId)) {
    console.log(`= ${toolId}: cache already complete`);
    return true;
  }
  const enMessages = loadJson(path.join(MESSAGES_DIR, "en.json")) as Record<string, Record<string, unknown>>;
  const enContent = enMessages.tool?.[toolId];
  if (!enContent) { console.error(`✗ ${toolId}: missing tool.${toolId} in en.json`); return false; }

  const outDir = path.join(CACHE_DIR, "translations");
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${toolId}.json`);

  const prompt = buildPrompt(toolId, enContent as Record<string, unknown>, {
    title: found.entry.titles.en,
    description: found.entry.descriptions.en,
    categoryEnglish: found.category,
  }, outFile);

  // copilot may flake; try gpt-5.4-mini first (cheap, 90%+ success), then
  // gpt-5.5 as fallback. Each model gets ATTEMPTS_PER_MODEL tries with
  // exponential backoff so the model gateway's throttle window can clear.
  for (const model of MODEL_FALLBACK) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
      const backoff = BACKOFF_SEC[attempt - 1] ?? 90;
      if (backoff > 0) {
        console.log(`  ↳ backing off ${backoff}s before ${model} attempt ${attempt}`);
        await sleep(backoff * 1000);
      }
      console.log(`→ ${toolId} (${model} attempt ${attempt}/${ATTEMPTS_PER_MODEL})`);
      try { rmSync(outFile, { force: true }); } catch {}
      const t0 = Date.now();
      const { code } = await runCopilot(prompt, model);
      const dur = ((Date.now() - t0) / 1000).toFixed(1);
      if (code !== 0) { console.warn(`  exit=${code} after ${dur}s`); continue; }
      if (!existsSync(outFile)) { console.warn(`  no output file after ${dur}s`); continue; }
      let parsed: Record<string, { slug: string; title: string; description: string; content: Record<string, unknown> }>;
      try {
        parsed = JSON.parse(readFileSync(outFile, "utf8"));
      } catch (e) {
        console.warn(`  output not valid JSON (${e})`);
        continue;
      }
      const missing = TARGET_LOCALES.filter((l) => !parsed[l]?.content);
      if (missing.length) { console.warn(`  missing locales: ${missing.join(",")}`); continue; }

      // SUCCESS — cache file is complete and valid.  We deliberately do NOT
      // mutate src/data/tools/<cat>.ts or messages/*.json here: those writes
      // are shared across many tools (e.g. statistic.ts holds 200+) and any
      // parallel translate-tool process would race us.  Source-file flushing
      // happens via apply-translations.ts at the end of main() (and on any
      // subsequent re-run — it is idempotent and uses an FS lock).
      console.log(`✓ ${toolId} translated in ${dur}s (${model})`);
      return true;
    }
  }
  console.error(`✗ ${toolId}: failed after ${MODEL_FALLBACK.length * ATTEMPTS_PER_MODEL} attempts across ${MODEL_FALLBACK.join("/")}`);
  // NOTE: previously we filled English fallback here to keep the build
  // valid (output: 'export' + dynamicParams: false needs every locale
  // populated).  That silently merged English-only batches.  We now fail
  // hard — the issue-worker will not open a PR for this batch, the issue
  // stays `in-progress`, and a retry pass (or a manual re-run later with
  // less concurrent load) can finish it cleanly.
  return false;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const ids = args.all ? findAllUntranslated() : args.ids;
  if (ids.length === 0) {
    console.error("no tool ids (pass ids or --all)");
    process.exit(2);
  }
  console.log(`translate-tool: ${ids.length} tool(s)`);
  const state = loadState();
  let ok = 0, fail = 0;
  const succeeded: string[] = [];
  for (const id of ids) {
    const success = await translateOne(id, args.force);
    state[id] = { at: new Date().toISOString(), status: success ? "ok" : "fail" };
    saveState(state);
    if (success) { ok++; succeeded.push(id); } else { fail++; }
  }
  console.log(`\ntranslated: ok=${ok} fail=${fail}`);

  // Flush cache → source files (category .ts + messages JSON). This is
  // serialized via an FS lock so N parallel translate-tool processes can
  // each call it safely without losing writes to shared category files.
  if (succeeded.length > 0) {
    const { applyTranslations } = await import("./apply-translations");
    const r = await applyTranslations(succeeded);
    console.log(`applied: applied=${r.applied.length} skipped=${r.skipped.length} categories=${r.categories.length}`);
    for (const s of r.skipped) console.warn(`  - apply skipped ${s.id}: ${s.reason}`);
  }

  process.exit(fail === 0 ? 0 : 1);
}

void main();
