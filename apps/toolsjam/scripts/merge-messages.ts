/**
 * scripts/merge-messages.ts — EMERGENCY ROLLBACK
 *
 * Read the split layout (messages/shared/*.json + messages/tool/<id>/*.json)
 * and reconstruct the monolithic messages/<locale>.json files.  Only meant
 * for the case where we need to revert to the pre-split shape.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const APP_ROOT = path.resolve(__dirname, "..");
const MSG_DIR = path.join(APP_ROOT, "messages");
const SHARED_DIR = path.join(MSG_DIR, "shared");
const TOOL_DIR = path.join(MSG_DIR, "tool");

function listLocales(): string[] {
  if (!existsSync(SHARED_DIR)) return [];
  return readdirSync(SHARED_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.basename(f, ".json"));
}

function listToolIds(): string[] {
  if (!existsSync(TOOL_DIR)) return [];
  return readdirSync(TOOL_DIR).filter((f) =>
    statSync(path.join(TOOL_DIR, f)).isDirectory(),
  );
}

function main() {
  const locales = listLocales();
  const ids = listToolIds();
  console.log(`merging ${locales.length} locales × ${ids.length} tools`);
  for (const locale of locales) {
    const shared = JSON.parse(
      readFileSync(path.join(SHARED_DIR, `${locale}.json`), "utf-8"),
    ) as Record<string, unknown>;
    const tool: Record<string, unknown> = {};
    for (const id of ids) {
      const p = path.join(TOOL_DIR, id, `${locale}.json`);
      if (!existsSync(p)) continue;
      tool[id] = JSON.parse(readFileSync(p, "utf-8"));
    }
    const merged = { ...shared, tool };
    writeFileSync(path.join(MSG_DIR, `${locale}.json`), JSON.stringify(merged, null, 2) + "\n");
    console.log(`${locale}: ${Object.keys(tool).length} tools merged`);
  }
}

main();
