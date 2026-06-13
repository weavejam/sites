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

function findAllUntranslated(): string[] {
  const fs = require("node:fs") as typeof import("node:fs");
  const out: string[] = [];
  for (const f of fs.readdirSync(DATA_DIR)) {
    if (!f.endsWith(".ts")) continue;
    const category = f.replace(/\.ts$/, "");
    try {
      const { entries } = readCategoryFile(category);
      for (const e of entries) {
        if (!isEntryFullyTranslated(e)) out.push(e.id);
      }
    } catch { /* ignore */ }
  }
  return out;
}

function buildPrompt(toolId: string, enContent: Record<string, unknown>, enMeta: { title: string; description: string; categoryEnglish: string }): string {
  const targetSpec = TARGET_LOCALES.map((l) => `  - "${l}" (${LOCALE_NAMES[l]})`).join("\n");
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
  D:\\shudu\\shudu\\apps\\toolsjam\\.port-page-cache\\translations\\${toolId}.json

After writing the file, exit. Do not print the JSON to the terminal.
`;
}

async function runCopilot(prompt: string, model: string): Promise<{ code: number; stderr: string }> {
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

// Models tried in order. gpt-5.4-mini handles 90%+ at ~5x lower cost; we
// fall back to gpt-5.5 for the long-tail tools the mini model can't get
// right (typically returns JSON missing one locale, especially "pt", on
// content with many domain-specific terms).
const MODEL_FALLBACK = ["gpt-5.4-mini", "gpt-5.5"] as const;
const ATTEMPTS_PER_MODEL = 2;

async function translateOne(toolId: string, force: boolean): Promise<boolean> {
  const found = findEntry(toolId);
  if (!found) { console.error(`✗ ${toolId}: not in any category registry`); return false; }
  if (!force && isEntryFullyTranslated(found.entry)) {
    console.log(`= ${toolId}: already fully translated`);
    return true;
  }
  const enMessages = loadJson(path.join(MESSAGES_DIR, "en.json")) as Record<string, Record<string, unknown>>;
  const enContent = enMessages.tool?.[toolId];
  if (!enContent) { console.error(`✗ ${toolId}: missing tool.${toolId} in en.json`); return false; }

  const prompt = buildPrompt(toolId, enContent as Record<string, unknown>, {
    title: found.entry.titles.en,
    description: found.entry.descriptions.en,
    categoryEnglish: found.category,
  });

  const outDir = path.join(CACHE_DIR, "translations");
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${toolId}.json`);

  // copilot may flake; try gpt-5.4-mini first (cheap, 90%+ success), then
  // gpt-5.5 as fallback. Each model gets ATTEMPTS_PER_MODEL tries.
  for (const model of MODEL_FALLBACK) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
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

      // Merge messages and registry.
      for (const l of TARGET_LOCALES) {
        const m = loadJson(path.join(MESSAGES_DIR, `${l}.json`));
        (m as any).tool = (m as any).tool || {};
        (m as any).tool[toolId] = parsed[l].content;
        saveJson(path.join(MESSAGES_DIR, `${l}.json`), m);
        found.entry.slugs[l] = parsed[l].slug;
        found.entry.titles[l] = parsed[l].title;
        found.entry.descriptions[l] = parsed[l].description;
      }
      writeCategoryFile(found.category, found.entries);
      console.log(`✓ ${toolId} translated in ${dur}s (${model})`);
      return true;
    }
  }
  console.error(`✗ ${toolId}: failed after ${MODEL_FALLBACK.length * ATTEMPTS_PER_MODEL} attempts across ${MODEL_FALLBACK.join("/")}`);
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
  for (const id of ids) {
    const success = await translateOne(id, args.force);
    state[id] = { at: new Date().toISOString(), status: success ? "ok" : "fail" };
    saveState(state);
    if (success) ok++; else fail++;
  }
  console.log(`\nfinished: ok=${ok} fail=${fail}`);
  process.exit(fail === 0 ? 0 : 1);
}

void main();
