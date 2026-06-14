// Apply cached translations (.port-page-cache/translations/*.json) into
// category .ts + messages JSON files.
//
// This is the SOURCE-MUTATING step of translation.  `translate-tool.ts` only
// writes cache JSONs (safe to run N-parallel because each tool has its own
// cache file).  This script then flushes those cache JSONs into the source
// files.  It uses an atomic mkdir-based file lock so multiple translate-tool
// processes can each call `applyTranslations()` at the end of their run
// without racing on the shared category .ts files (which hold many tools
// each — e.g. statistic.ts holds 200+ tools).
//
// CLI usage:
//   pnpm tsx scripts/apply-translations.ts [toolId...]
//   (no args = apply every cache file present)
//
// Programmatic:
//   import { applyTranslations } from "./apply-translations";
//   await applyTranslations(["tool-a", "tool-b"]);

import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const APP = path.resolve(__dirname, "..");
const MESSAGES_DIR = path.join(APP, "messages");
const DATA_DIR = path.join(APP, "src", "data", "tools");
const CACHE_ROOT = path.join(APP, ".port-page-cache");
const CACHE_DIR = path.join(CACHE_ROOT, "translations");
const LOCK_DIR = path.join(CACHE_ROOT, ".apply-lock");

const LOCALES = ["zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de", "pt", "ru"];

interface ToolEntry {
  id: string;
  category: string;
  slugs: Record<string, string>;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}

interface CacheLocale {
  slug: string;
  title: string;
  description: string;
  content: unknown;
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

// Atomic FS lock — mkdir() is atomic across processes on Windows + POSIX.
// Stale-lock fallback: any lock older than `staleAfterMs` is forcibly stolen.
async function acquireLock(timeoutMs = 10 * 60 * 1000, staleAfterMs = 5 * 60 * 1000): Promise<void> {
  const started = Date.now();
  // ensure parent exists
  mkdirSync(CACHE_ROOT, { recursive: true });
  while (true) {
    try {
      mkdirSync(LOCK_DIR);
      // own the lock — write pid marker for diagnostics
      try { writeFileSync(path.join(LOCK_DIR, "owner.txt"), `pid=${process.pid} at=${new Date().toISOString()}`, "utf8"); } catch {}
      return;
    } catch (e: any) {
      if (e.code !== "EEXIST") throw e;
      // Check if lock is stale
      try {
        const stat = statSync(LOCK_DIR);
        if (Date.now() - stat.mtimeMs > staleAfterMs) {
          console.warn(`[apply-translations] stealing stale lock (age=${Math.round((Date.now() - stat.mtimeMs) / 1000)}s)`);
          try { rmdirSync(LOCK_DIR, { recursive: true } as any); } catch {}
          continue;
        }
      } catch {}
      if (Date.now() - started > timeoutMs) throw new Error("apply-translations: lock acquire timed out");
      await new Promise((r) => setTimeout(r, 500 + Math.floor(Math.random() * 500)));
    }
  }
}
function releaseLock(): void {
  try { rmdirSync(LOCK_DIR, { recursive: true } as any); } catch {}
}

export interface ApplyResult { applied: string[]; skipped: { id: string; reason: string }[]; categories: string[]; }

export async function applyTranslations(ids?: string[]): Promise<ApplyResult> {
  // Default: apply every cache file present.
  if (!ids || ids.length === 0) {
    if (!existsSync(CACHE_DIR)) return { applied: [], skipped: [], categories: [] };
    ids = readdirSync(CACHE_DIR).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
  }
  await acquireLock();
  try {
    // Snapshot all categories once inside the lock so we don't re-read after
    // mutations.  Holds whole-tool registry in memory (~few MB worst case).
    const catCache = new Map<string, ToolEntry[]>();
    const dirtyCats = new Set<string>();
    const applied: string[] = [];
    const skipped: { id: string; reason: string }[] = [];

    // Index id → category by scanning each category once.
    const idToCat = new Map<string, string>();
    for (const cat of listCategories()) {
      const { entries } = readCategoryFile(cat);
      catCache.set(cat, entries);
      for (const e of entries) idToCat.set(e.id, cat);
    }

    // Snapshot messages JSON once per locale.
    const msgs = new Map<string, Record<string, any>>();
    for (const l of LOCALES) msgs.set(l, loadJson<Record<string, any>>(path.join(MESSAGES_DIR, `${l}.json`)));

    for (const id of ids) {
      const cachePath = path.join(CACHE_DIR, `${id}.json`);
      if (!existsSync(cachePath)) { skipped.push({ id, reason: "no cache" }); continue; }
      let cache: Record<string, CacheLocale>;
      try { cache = loadJson<Record<string, CacheLocale>>(cachePath); }
      catch (e: any) { skipped.push({ id, reason: `bad json: ${e?.message ?? e}` }); continue; }
      const missing = LOCALES.filter((l) => !cache[l]?.content);
      if (missing.length) { skipped.push({ id, reason: `missing locales ${missing.join(",")}` }); continue; }
      const cat = idToCat.get(id);
      if (!cat) { skipped.push({ id, reason: "not in any category registry" }); continue; }
      const entries = catCache.get(cat)!;
      const entry = entries.find((e) => e.id === id)!;

      for (const l of LOCALES) {
        const m = msgs.get(l)!;
        m.tool = m.tool || {};
        m.tool[id] = cache[l].content;
        entry.slugs[l] = cache[l].slug;
        entry.titles[l] = cache[l].title;
        entry.descriptions[l] = cache[l].description;
      }
      dirtyCats.add(cat);
      applied.push(id);
    }

    // Flush ALL writes at the very end (still inside lock).
    for (const cat of dirtyCats) writeCategoryFile(cat, catCache.get(cat)!);
    // messages flush — every locale touched if anything applied
    if (applied.length > 0) {
      for (const l of LOCALES) saveJson(path.join(MESSAGES_DIR, `${l}.json`), msgs.get(l));
    }

    return { applied, skipped, categories: [...dirtyCats] };
  } finally {
    releaseLock();
  }
}

// CLI entry
if (require.main === module) {
  const ids = process.argv.slice(2);
  applyTranslations(ids.length > 0 ? ids : undefined)
    .then((r) => {
      for (const id of r.applied) console.log(`✓ ${id}`);
      for (const s of r.skipped) console.warn(`- ${s.id}: ${s.reason}`);
      console.log(`\nDONE — applied=${r.applied.length} skipped=${r.skipped.length} categories=${r.categories.length} [${r.categories.join(", ")}]`);
      process.exit(r.skipped.some((s) => !s.reason.startsWith("no cache")) ? 1 : 0);
    })
    .catch((e) => { console.error(e); process.exit(2); });
}
