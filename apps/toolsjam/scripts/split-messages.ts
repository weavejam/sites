/**
 * scripts/split-messages.ts
 *
 * One-shot migration: take the monolithic `messages/<locale>.json` files and
 * split them into:
 *
 *   messages/shared/<locale>.json           ← home, category, footer (~50KB)
 *   messages/tool/<tool-id>/<locale>.json   ← per-tool, ~3KB each
 *
 * After running this, the monolithic files can be deleted (rollback available
 * via scripts/merge-messages.ts).
 *
 * Idempotent: re-running overwrites the split files with the latest content
 * from the monolithic file.  Once we delete the monolithic files this script
 * becomes a no-op (which is fine — it's only meant to run during migration).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const APP_ROOT = path.resolve(__dirname, "..");
const MSG_DIR = path.join(APP_ROOT, "messages");
const SHARED_DIR = path.join(MSG_DIR, "shared");
const TOOL_DIR = path.join(MSG_DIR, "tool");

const SHARED_KEYS = ["home", "category", "footer"] as const;

function listLocaleFiles(): string[] {
  if (!existsSync(MSG_DIR)) return [];
  return readdirSync(MSG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join(MSG_DIR, f));
}

function ensureDir(p: string) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function writeJson(p: string, data: unknown) {
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function localeFromFile(p: string): string {
  return path.basename(p, ".json");
}

function main() {
  const files = listLocaleFiles();
  if (files.length === 0) {
    console.log("no messages/<locale>.json found — nothing to split");
    return;
  }
  ensureDir(SHARED_DIR);
  ensureDir(TOOL_DIR);

  let totalTools = 0;
  for (const file of files) {
    const locale = localeFromFile(file);
    const raw = readFileSync(file, "utf-8");
    const all = JSON.parse(raw) as Record<string, unknown>;

    // shared bundle
    const shared: Record<string, unknown> = {};
    for (const k of SHARED_KEYS) {
      if (all[k] !== undefined) shared[k] = all[k];
    }
    writeJson(path.join(SHARED_DIR, `${locale}.json`), shared);

    // per-tool bundles
    const toolBlock = (all.tool ?? {}) as Record<string, Record<string, unknown>>;
    const toolIds = Object.keys(toolBlock);
    for (const id of toolIds) {
      const dir = path.join(TOOL_DIR, id);
      ensureDir(dir);
      writeJson(path.join(dir, `${locale}.json`), toolBlock[id]);
    }
    console.log(`${locale}: shared ${SHARED_KEYS.length} keys, ${toolIds.length} tools`);
    totalTools = toolIds.length;
  }
  console.log(`DONE — split ${files.length} locales × ${totalTools} tools`);
}

main();
