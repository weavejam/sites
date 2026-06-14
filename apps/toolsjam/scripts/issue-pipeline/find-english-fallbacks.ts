/**
 * Scan all category files to find tools whose non-en slug equals the en
 * slug (or whose non-en title equals the en title) — these are the ones
 * that took the English fallback during overnight translation flakes.
 *
 * Prints a list of `<toolId>` lines (one per stdout line) ready to pipe
 * into `pnpm translate-tool --force`.
 *
 * Usage: pnpm exec tsx scripts/issue-pipeline/find-english-fallbacks.ts
 */

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(__dirname, "..", "..", "src", "data", "tools");
const NON_EN = ["zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de", "pt", "ru"];

const stub: string[] = [];

for (const file of readdirSync(DATA_DIR)) {
  if (!file.endsWith(".ts") || file === "index.ts") continue;
  const src = readFileSync(path.join(DATA_DIR, file), "utf8");
  // Match each entry: { id: "...", ..., slugs: { en: "x", "zh-CN": "y", ... } }
  const entryRe = /\{\s*id:\s*"([^"]+)"[\s\S]*?slugs:\s*\{([^}]*)\}[\s\S]*?titles:\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(src))) {
    const id = m[1];
    const slugsBlock = m[2];
    const titlesBlock = m[3];
    const enSlug = /"?en"?:\s*"([^"]+)"/.exec(slugsBlock)?.[1];
    const enTitle = /"?en"?:\s*"([^"]+)"/.exec(titlesBlock)?.[1];
    if (!enSlug || !enTitle) continue;
    let isFallback = false;
    for (const loc of NON_EN) {
      const slugMatch = new RegExp(`"${loc}":\\s*"([^"]+)"`).exec(slugsBlock);
      const titleMatch = new RegExp(`"${loc}":\\s*"([^"]+)"`).exec(titlesBlock);
      if (!slugMatch || !titleMatch) continue;
      // If any non-en locale's slug AND title both equal English, this
      // was almost certainly a fallback (real translations differ in at
      // least slug for zh/ja/ko/ru — though es/fr/de may legitimately
      // share slug occasionally, so we require BOTH slug AND title to
      // match before flagging).
      if (slugMatch[1] === enSlug && titleMatch[1] === enTitle) {
        isFallback = true;
        break;
      }
    }
    if (isFallback) stub.push(id);
  }
}

for (const id of stub) console.log(id);
console.error(`# total: ${stub.length} tools with English fallback`);
