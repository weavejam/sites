// Apply per-tool English content blocks staged at
// `.port-batches/en-content/<tool-id>.json` into the monolithic
// `messages/en.json` under `tool.<tool-id>`.
//
// Why this exists:
//   Letting the dev copilot edit `messages/en.json` (1MB, 12k+ lines, 127+
//   tool entries) one tool at a time via `Edit` was slow (5-10 min/tool) and
//   fragile (throttled mid-edit → corrupt JSON; ambiguous old_str → bail to
//   heredoc shell tricks).  Far better:
//     1. dev copilot writes each new tool's English content to its own small
//        standalone JSON file at `.port-batches/en-content/<id>.json`
//        (atomic per file, cheap, no anchor matching, no global file lock).
//     2. This script does a single deterministic merge: parse en.json,
//        overlay tool[id] = <staged JSON>, stringify, write.
//
// CLI:
//   pnpm exec tsx scripts/apply-en-content.ts [tool-id...]
//   - no args → apply every *.json present under `.port-batches/en-content/`
//   - with args → apply ONLY those (error if any staged file is missing)
//
// Exit codes:
//   0 — applied (or nothing to apply)
//   1 — soft failure (missing files when ids passed explicitly, invalid JSON)
//   2 — hard failure (could not read/write en.json)

import {
  existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync,
  statSync, writeFileSync,
} from "node:fs";
import path from "node:path";

const APP = path.resolve(__dirname, "..");
const EN_FILE = path.join(APP, "messages", "en.json");
const STAGE_DIR = path.join(APP, ".port-batches", "en-content");
const LOCK_DIR = path.join(APP, ".port-batches", ".en-apply-lock");

interface EnRoot { tool?: Record<string, unknown>; [k: string]: unknown; }

function loadJson<T = unknown>(p: string): T {
  return JSON.parse(readFileSync(p, "utf8")) as T;
}
function saveJson(p: string, obj: unknown) {
  // Preserve existing format: 2-space indent, trailing newline.
  writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

// FS lock — same pattern as apply-translations.ts.  Although every port
// worker has its own worktree (so en.json contention across workers is
// impossible), a single worker may still call apply twice (e.g. retry
// after a partial write) and the lock guarantees no torn writes.
async function acquireLock(timeoutMs = 5 * 60 * 1000, staleAfterMs = 2 * 60 * 1000): Promise<void> {
  const started = Date.now();
  mkdirSync(path.dirname(LOCK_DIR), { recursive: true });
  while (true) {
    try {
      mkdirSync(LOCK_DIR);
      try {
        writeFileSync(
          path.join(LOCK_DIR, "owner.txt"),
          `pid=${process.pid} at=${new Date().toISOString()}\n`,
          "utf8",
        );
      } catch {}
      return;
    } catch (e: unknown) {
      const err = e as NodeJS.ErrnoException;
      if (err.code !== "EEXIST") throw e;
      try {
        const stat = statSync(LOCK_DIR);
        if (Date.now() - stat.mtimeMs > staleAfterMs) {
          console.warn(`[apply-en-content] stealing stale lock (age=${Math.round((Date.now() - stat.mtimeMs) / 1000)}s)`);
          try { rmdirSync(LOCK_DIR, { recursive: true }); } catch {}
          continue;
        }
      } catch {}
      if (Date.now() - started > timeoutMs) {
        throw new Error("apply-en-content: lock acquire timed out");
      }
      await new Promise((r) => setTimeout(r, 300 + Math.floor(Math.random() * 400)));
    }
  }
}
function releaseLock(): void {
  try { rmdirSync(LOCK_DIR, { recursive: true }); } catch {}
}

interface ApplyResult {
  applied: string[];
  skipped: { id: string; reason: string }[];
}

export async function applyEnContent(ids?: string[]): Promise<ApplyResult> {
  if (!existsSync(STAGE_DIR)) {
    if (ids && ids.length > 0) {
      return { applied: [], skipped: ids.map((id) => ({ id, reason: "stage dir missing" })) };
    }
    return { applied: [], skipped: [] };
  }
  let targets: string[];
  if (ids && ids.length > 0) {
    targets = ids;
  } else {
    targets = readdirSync(STAGE_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  }
  if (targets.length === 0) return { applied: [], skipped: [] };

  await acquireLock();
  try {
    let en: EnRoot;
    try {
      en = loadJson<EnRoot>(EN_FILE);
    } catch (e) {
      throw new Error(`could not read ${EN_FILE}: ${(e as Error).message}`);
    }
    if (!en.tool || typeof en.tool !== "object") en.tool = {};

    const applied: string[] = [];
    const skipped: { id: string; reason: string }[] = [];

    for (const id of targets) {
      const stagedPath = path.join(STAGE_DIR, `${id}.json`);
      if (!existsSync(stagedPath)) { skipped.push({ id, reason: "no staged file" }); continue; }
      let content: unknown;
      try {
        content = loadJson(stagedPath);
      } catch (e) {
        skipped.push({ id, reason: `bad json: ${(e as Error).message}` });
        continue;
      }
      if (!content || typeof content !== "object" || Array.isArray(content)) {
        skipped.push({ id, reason: "staged content is not a JSON object" });
        continue;
      }
      en.tool[id] = content;
      applied.push(id);
    }

    if (applied.length > 0) saveJson(EN_FILE, en);
    return { applied, skipped };
  } finally {
    releaseLock();
  }
}

if (require.main === module) {
  const ids = process.argv.slice(2);
  applyEnContent(ids.length > 0 ? ids : undefined)
    .then((r) => {
      for (const id of r.applied) console.log(`✓ ${id}`);
      for (const s of r.skipped) console.warn(`- ${s.id}: ${s.reason}`);
      console.log(`\nDONE — applied=${r.applied.length} skipped=${r.skipped.length}`);
      // Hard-fail if explicit ids requested but any couldn't be applied;
      // soft-pass if scan-mode (no args) found nothing.
      const explicit = ids.length > 0;
      if (explicit && r.skipped.length > 0) process.exit(1);
      process.exit(0);
    })
    .catch((e) => { console.error(e); process.exit(2); });
}
