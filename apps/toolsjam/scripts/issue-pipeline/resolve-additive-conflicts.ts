/**
 * Mechanically resolves additive merge conflicts produced by concurrent
 * toolsjam port batches.  Three file patterns are handled:
 *
 *   - messages/*.json     — both sides add disjoint sibling object keys.
 *                           Resolve by joining the two blocks with ",\n".
 *
 *   - data/tools/*.ts     — both sides append a new entry to the tools
 *                           array.  Each entry sits inside one shared
 *                           "{ ... }" pair that the diff collapsed.
 *                           Resolve by splitting into two entries via
 *                           "  },\n  {".
 *
 *   - tools/_fixtures-barrel.ts — auto-generated import barrel.  Easiest
 *                           to drop the conflict markers AND regenerate
 *                           via `pnpm fixtures:barrel`.  Here we still
 *                           emit a best-effort "take both" so the file
 *                           parses if the regen step is skipped.
 *
 * Usage:  pnpm tsx scripts/issue-pipeline/resolve-additive-conflicts.ts <file...>
 *         (with no args, runs `git diff --name-only --diff-filter=U` itself)
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

const CONFLICT_RE =
  /^<<<<<<< [^\r\n]*\r?\n([\s\S]*?)^=======\r?\n([\s\S]*?)^>>>>>>> [^\r\n]*\r?\n/gm;

function resolveJsonFile(text: string): string {
  return text.replace(CONFLICT_RE, (_m, ours: string, theirs: string) => {
    const left = ours.replace(/[\s\n]+$/, "");
    const right = theirs.replace(/[\s\n]+$/, "");
    if (!left) return right + "\n";
    if (!right) return left + "\n";
    return left + ",\n" + right + "\n";
  });
}

function resolveToolsArray(text: string): string {
  return text.replace(CONFLICT_RE, (_m, ours: string, theirs: string) => {
    const left = ours.replace(/[\s\n]+$/, "");
    const right = theirs.replace(/[\s\n]+$/, "");
    if (!left) return right + "\n";
    if (!right) return left + "\n";
    return left + "\n  },\n  {\n" + right + "\n";
  });
}

function resolveBarrel(text: string): string {
  // Take the union of both sides verbatim; duplicates are rare because
  // each batch ports disjoint tool ids.  fixtures:barrel regen will
  // canonicalize anyway.
  return text.replace(CONFLICT_RE, (_m, ours: string, theirs: string) => {
    return ours + theirs;
  });
}

function filesFromGit(): string[] {
  const out = execSync("git diff --name-only --diff-filter=U", {
    encoding: "utf8",
  });
  return out
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function main() {
  const root = execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  }).trim();
  process.chdir(root);
  const args = process.argv.slice(2);
  const files = args.length ? args : filesFromGit();
  if (files.length === 0) {
    console.log("[resolve-conflicts] nothing to resolve");
    return;
  }
  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    if (!raw.includes("<<<<<<<")) continue;
    let next: string;
    if (file.endsWith(".json")) {
      next = resolveJsonFile(raw);
    } else if (
      file.includes("data/tools/") ||
      file.includes("data\\tools\\")
    ) {
      next = resolveToolsArray(raw);
    } else if (basename(file) === "_fixtures-barrel.ts") {
      next = resolveBarrel(raw);
    } else {
      console.warn(`[resolve-conflicts] skip ${file} (no handler)`);
      continue;
    }
    if (next.includes("<<<<<<<")) {
      throw new Error(`[resolve-conflicts] ${file} still has conflict markers`);
    }
    writeFileSync(file, next);
    console.log(`[resolve-conflicts] ✓ ${file}`);
    execSync(`git add "${file}"`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
