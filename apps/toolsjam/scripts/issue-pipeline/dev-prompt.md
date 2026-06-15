// Dev-side prompt that drives one batch in a dedicated worktree.
// Rendered by issue-worker.ts and piped to `copilot --model claude-sonnet-4.6`.
//
// Placeholders:
//   <REPO_ROOT>       absolute path of THIS worktree (where you must write)
//   {{ISSUE_NUMBER}}  GitHub issue number
//   {{BATCH_ID}}      e.g. batch-001
//   {{JOBS_BLOCK}}    multi-line block describing each page
//   {{REVIEW_OUT}}    absolute path where reviewer sub-agent must write its JSON report

You are a senior front-end engineer porting MULTIPLE tool pages from the legacy
site `tooldone.com` into `apps/toolsjam/`. You are NON-INTERACTIVE: do all work,
do not ask questions, exit when done.

# Context

- Worktree root: <REPO_ROOT>  (THIS worktree — ALL writes go here)
- Target app:    <REPO_ROOT>/apps/toolsjam/
- GitHub issue:  #{{ISSUE_NUMBER}}  (batch id: {{BATCH_ID}})
- Stack:         Next.js 15 (App Router, `output: 'export'`), React 19,
                 Tailwind v4, shadcn-style UI in `src/components/ui/`, next-intl 3.
- Locales:       en, zh-CN, zh-TW, ja, ko, es, fr, de, pt, ru.
                 Only touch `en` here. Other locales are filled by a later step.
- Categories:    `src/data/categories.ts` (CategoryId union).
- Tool registry: `src/data/tools/<category>.ts` — append a `ToolEntry`.
- Per-tool UI:   `src/tools/<id>.tsx` — default export
                 `(props: { locale: Locale }) => React.ReactNode`.
- HTML snapshots: under
  `D:\shudu\shudu\apps\toolsjam\.scrape\html\<category>\<slug>.html`
  Read those absolute paths directly. DO NOT fetch the live site.
- Reference: `src/tools/percentage-calculator.tsx` + its fixtures + en.json block.

# Pages to port in this run

{{JOBS_BLOCK}}

# Phase 1 — Implement (port all pages)

For EACH page, in order, complete all of: tsx + registry entry + en.json block +
fixtures. Finish page #1 completely before starting page #2 — that way a crash
mid-batch leaves earlier pages usable.

1. Parse the snapshot HTML. Extract title, meta description, all visible copy,
   FAQ, examples, input labels, button text, units, dropdown options, and the
   deterministic calculation logic. Prefer the canonical formula if inline
   scripts are ambiguous.

2. Generate `src/tools/<TOOL_ID>.tsx`:
   - `"use client"` component with state for inputs.
   - `useTranslations("tool.<TOOL_ID>")` for ALL visible strings — no hard-coded English in JSX.
   - Uses `Input`, `Label`, `Button`, `Card*` from `@/components/ui/*`.
   - Sections in order: calculator card / `about` / `examples` (table, ≥3 rows) /
     `howto` (3–5 numbered steps) / `faq` (4–6 Q&A).
   - JSON-LD `WebApplication` + `FAQPage` via `<script type="application/ld+json">`.
   - For howto/faq DO NOT loop `t(\`howto.step${i}\`)`; use `t.raw("howto.steps")` (string[]).

3. Append a new `ToolEntry` to `src/data/tools/<CATEGORY>.ts`:
   - `id: "<TOOL_ID>"`, `category: "<CATEGORY>"`
   - Fill only the `en` field for `slugs`, `titles`, `descriptions`. Other locales = `""`.
   - English title ≤ 60 chars, primary keyword first, no brand suffix.
   - English description 120–160 chars, primary + ≥1 secondary keyword, ends with a value prop.

4. Write `tool.<TOOL_ID>`'s English content directly to a per-tool i18n file:
       `<REPO_ROOT>/apps/toolsjam/messages/tool/<TOOL_ID>/en.json`
   Use the `create` tool — one call per tool, atomic, no anchor matching, no
   shared-file race. The file's top-level JSON object IS the value of
   `tool.<TOOL_ID>` (no outer `{"tool": ...}` wrapping). Required keys
   include `title`, `tagline`, plus every `t("…")` / `t.raw("…")` key your
   `.tsx` references — typically `about`, `examples`, `howto`, `faq`,
   `field`, `button`, etc. `about.body` ≥ 300 words, multiple paragraphs
   joined with `\n\n`. Non-English locales (`zh-CN.json`, `ja.json`, …)
   under the SAME directory are filled later by the translate sweeper —
   do NOT create them.

5. Generate `src/tools/<TOOL_ID>.fixtures.ts` exporting `fixtures: ToolFixture[]`
   with ≥ 2 happy-path cases. Use exact label strings matching the English
   `field.*` / `button.*` / `type.*` values. Avoid invalid-input fixtures that
   depend on `<input type="number">` accepting non-numeric text.

Rules during Phase 1:
- Do NOT run the build. Do NOT install packages. Do NOT modify shared infra
  (i18n config, categories, layout, components/ui/*, fixtures barrel).
- Do NOT touch `messages/shared/*.json` or any other tool's
  `messages/tool/<OTHER_ID>/*.json` — only your own tools' folders.
- Per tool you may only touch: the component, the category registry,
  `messages/tool/<TOOL_ID>/en.json`, and the fixtures file.

When Phase 1 is complete, regenerate the fixtures barrel by running:
    pnpm fixtures:barrel
inside `<REPO_ROOT>/apps/toolsjam`. This is the ONLY shell command you run.

# Phase 2 — Self-review (sub-agent)

Spawn ONE `task` sub-agent with these parameters:
  - agent_type: "code-review"
  - model: "gpt-5.5"
  - name: "toolsjam-batch-reviewer"
  - description: "review batch {{BATCH_ID}}"
  - mode: "sync"
  - prompt: see "Reviewer prompt" block below

Wait for the sub-agent's result. Parse the JSON it returns. Schema:
```json
{
  "verdict": "PASS" | "BLOCKER" | "WARN",
  "summary": "one-paragraph human summary",
  "items": [
    { "severity": "BLOCKER" | "WARN" | "NIT",
      "file": "src/tools/...",
      "line": 42,
      "message": "..." }
  ]
}
```

If `verdict === "PASS"`, write the full JSON to `{{REVIEW_OUT}}` and proceed to Phase 3.

If `verdict !== "PASS"`, handle items by severity:

**BLOCKER items** — must be fixed before the PR can land. Fix EVERY BLOCKER
in place, then re-spawn the same reviewer sub-agent. Repeat up to **2 review
rounds total**. If any BLOCKER still remains after round 2:
  - Write the final reviewer JSON to `{{REVIEW_OUT}}` (DO NOT delete it).
  - Create a follow-up GitHub issue so a human can decide what to do:
    `gh issue create --title "follow-up({{BATCH_ID}}): unresolved BLOCKERs" \
      --label "toolsjam-followup,bug" \
      --body "Batch {{BATCH_ID}} (PR for issue #{{ISSUE_NUMBER}}) shipped with unresolved BLOCKER findings:\n\n<paste the BLOCKER items from the final reviewer JSON here as a markdown list>"`
  - **Do NOT exit non-zero just because BLOCKERs remain.** The outer worker
    decides whether the build/tests will catch the issue; your job is to
    record the finding and move on.

**WARN / NIT items** — DO NOT fix them in this batch. Doing so widens the
diff, increases the chance of a flaky round, and slows the pipeline.
Instead, accumulate ALL WARN + NIT items from EVERY review round into a
single follow-up issue at the very end:
  `gh issue create --title "follow-up({{BATCH_ID}}): WARN/NIT findings" \
    --label "toolsjam-followup,polish" \
    --body "Batch {{BATCH_ID}} (PR for issue #{{ISSUE_NUMBER}}) — non-blocking review findings to address later:\n\n<paste the WARN/NIT items as a markdown list, grouped by file>"`
Skip this `gh issue create` if there were zero WARN/NIT items across all rounds.

Always write the FINAL reviewer JSON (last round's verdict + items) to
`{{REVIEW_OUT}}`. The outer worker embeds it in the PR body.

## Reviewer prompt (pass verbatim to the sub-agent, with placeholders filled)

You are a code + SEO reviewer for batch {{BATCH_ID}} of the toolsjam migration
sitting at `<REPO_ROOT>/apps/toolsjam`. The pages added in this batch are:

{{JOBS_BLOCK}}

Review ONLY files changed by this batch (the 5 `.tsx`, the 5 `.fixtures.ts`,
the modified `<category>.ts` registry files, and the 5 per-tool English i18n
files at `apps/toolsjam/messages/tool/<id>/en.json`). Read those JSON files
directly with `cat` / `Read`. Use `git --no-pager diff origin/main..HEAD`
inside `<REPO_ROOT>` to see the full committed diff.

Check, for EACH page:
- Component uses `useTranslations("tool.<id>")` for every visible string.
- Title in registry: ≤ 60 chars, primary keyword first, no brand suffix.
- Description in registry: 120–160 chars.
- `messages/tool/<id>/en.json` exists and is valid JSON.
- `about.body` in that JSON: ≥ 300 words, multiple paragraphs.
- `examples.items`: ≥ 3 entries with realistic, internally-consistent numbers.
- `howto.steps`: 3–5 action-oriented items.
- `faq.items`: 4–6 Q&A, answers ≥ 2 sentences.
- Fixtures: ≥ 2 happy-path cases, label strings match the en.json's `field/button/type` values.
- JSON-LD `WebApplication` and `FAQPage` are present in the component.
- No hard-coded English strings in JSX outside `<script type="application/ld+json">` blocks.
- File only changed within its allowed scope (no edits to ui/, i18n config,
  categories, `messages/shared/*.json`, or other tools' message folders).
  NOTE: `src/tools/_fixtures-barrel.ts` is regenerated by the outer worker
  AFTER you finish — it WILL appear in the diff, but that is correct and NOT
  a BLOCKER.

Respond with ONLY a single JSON object matching the schema above — no
markdown, no commentary. `items` MUST list every BLOCKER you find; an empty
array + verdict PASS means the diff is clean.

# Phase 3 — Done

Stop. Do not run tests, build, commit, or push — the outer worker script does
those steps. Exit.
