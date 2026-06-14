// Re-merge cached translations into category .ts + messages JSON files.
// Use when translate-tool was run in parallel and lost writes due to
// concurrent edits of the same category file.  This is idempotent — reads
// each cache JSON and re-applies entry slug/title/desc + tool messages.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const APP = path.resolve(__dirname, "..", "..");
const MESSAGES_DIR = path.join(APP, "messages");
const DATA_DIR = path.join(APP, "src", "data", "tools");
const CACHE_DIR = path.join(APP, ".port-page-cache", "translations");

const LOCALES = ["zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de", "pt", "ru"];

interface ToolEntry {
  id: string;
  category: string;
  slugs: Record<string, string>;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}

function loadJson<T = unknown>(p: string): T {
  return JSON.parse(readFileSync(p, "utf8")) as T;
}
function saveJson(p: string, obj: unknown) {
  writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function readCategoryFile(category: string): { entries: ToolEntry[] } {
  const file = path.join(DATA_DIR, `${category}.ts`);
  const src = readFileSync(file, "utf8");
  const m = src.match(/export const tools[^=]*=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (!m) throw new Error(`could not parse ${file}`);
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const arr = Function(`"use strict"; return (${m[1]});`)() as ToolEntry[];
  return { entries: arr };
}
function writeCategoryFile(category: string, entries: ToolEntry[]) {
  const file = path.join(DATA_DIR, `${category}.ts`);
  const body = JSON.stringify(entries, null, 2)
    .replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, "$1:");
  const out = `import type { ToolEntry } from "@/data/tools";\n\nexport const tools: ToolEntry[] = ${body};\n`;
  writeFileSync(file, out, "utf8");
}

function listCategories(): string[] {
  return readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
}

function findEntry(id: string): { category: string; entries: ToolEntry[]; entry: ToolEntry } | null {
  for (const cat of listCategories()) {
    const { entries } = readCategoryFile(cat);
    const e = entries.find((x) => x.id === id);
    if (e) return { category: cat, entries, entry: e };
  }
  return null;
}

const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("usage: tsx remerge-translations.ts <toolId>...");
  process.exit(2);
}

// Group entries by category to avoid re-reading files and to write each
// category exactly once.
const byCategory: Map<string, { entries: ToolEntry[]; touched: string[] }> = new Map();

let okMessages = 0;
let okEntries = 0;
let fail = 0;
for (const id of ids) {
  const cachePath = path.join(CACHE_DIR, `${id}.json`);
  if (!existsSync(cachePath)) {
    console.error(`✗ ${id}: no cache at ${cachePath}`);
    fail++;
    continue;
  }
  const cache = loadJson<Record<string, { slug: string; title: string; description: string; content: unknown }>>(cachePath);
  const missing = LOCALES.filter((l) => !cache[l]?.content);
  if (missing.length) {
    console.error(`✗ ${id}: cache missing locales ${missing.join(",")}`);
    fail++;
    continue;
  }
  const found = findEntry(id);
  if (!found) {
    console.error(`✗ ${id}: not in any category`);
    fail++;
    continue;
  }
  // Merge messages
  for (const l of LOCALES) {
    const m = loadJson<Record<string, any>>(path.join(MESSAGES_DIR, `${l}.json`));
    m.tool = m.tool || {};
    m.tool[id] = cache[l].content;
    saveJson(path.join(MESSAGES_DIR, `${l}.json`), m);
    found.entry.slugs[l] = cache[l].slug;
    found.entry.titles[l] = cache[l].title;
    found.entry.descriptions[l] = cache[l].description;
  }
  okMessages++;
  // Collect category writes (do once at end)
  let bucket = byCategory.get(found.category);
  if (!bucket) {
    bucket = { entries: found.entries, touched: [] };
    byCategory.set(found.category, bucket);
  }
  // Replace entry in bucket.entries by id
  const idx = bucket.entries.findIndex((x) => x.id === id);
  if (idx >= 0) bucket.entries[idx] = found.entry;
  bucket.touched.push(id);
  okEntries++;
  console.log(`✓ ${id} merged (category=${found.category})`);
}

// Write each touched category file once
for (const [cat, { entries, touched }] of byCategory) {
  writeCategoryFile(cat, entries);
  console.log(`→ wrote ${cat}.ts (${touched.length} entries: ${touched.join(", ")})`);
}

console.log(`\nDONE — merged=${okEntries} fail=${fail} category-files=${byCategory.size}`);
process.exit(fail > 0 ? 1 : 0);
