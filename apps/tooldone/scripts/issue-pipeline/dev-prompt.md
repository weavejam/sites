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
site `tooldone.com` into `apps/tooldone/`. You are NON-INTERACTIVE: do all work,
do not ask questions, exit when done.

# Context

- Worktree root: <REPO_ROOT>  (THIS worktree — ALL writes go here)
- Target app:    <REPO_ROOT>/apps/tooldone/
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
  `D:\shudu\shudu\apps\tooldone\.scrape\html\<category>\<slug>.html`
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

4. Append `tool.<TOOL_ID>` to `messages/en.json` with all referenced keys.
   `about.body` ≥ 300 words, multiple paragraphs joined with `\n\n`.
   **CRITICAL — to survive transient API errors, edit en.json ONE TOOL AT A TIME**:
   (a) re-read the last ~10 lines of en.json, (b) one Edit call adds just that
   tool's block, (c) move on.

5. Generate `src/tools/<TOOL_ID>.fixtures.ts` exporting `fixtures: ToolFixture[]`
   with ≥ 2 happy-path cases. Use exact label strings matching the English
   `field.*` / `button.*` / `type.*` values. Avoid invalid-input fixtures that
   depend on `<input type="number">` accepting non-numeric text.

Rules during Phase 1:
- Do NOT run the build. Do NOT install packages. Do NOT modify other locale
  JSON files. Do NOT modify shared infra (i18n config, categories, layout,
  components/ui/*, fixtures barrel).
- Per tool you may only touch: the component, the category registry, the
  en.json namespace, and the fixtures file.

When Phase 1 is complete, regenerate the fixtures barrel by running:
    pnpm fixtures:barrel
inside `<REPO_ROOT>/apps/tooldone`. This is the ONLY shell command you run.

# Phase 2 — Self-review (sub-agent)

Spawn ONE `task` sub-agent with these parameters:
  - agent_type: "code-review"
  - model: "gpt-5.5"
  - name: "tooldone-batch-reviewer"
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

If `verdict !== "PASS"`, fix EVERY `BLOCKER` item in place (edit files directly).
WARN items: fix if cheap, otherwise note in the report. Re-spawn the same
reviewer sub-agent and repeat. Max 2 review rounds total. After round 2,
write whatever JSON you have to `{{REVIEW_OUT}}` (BLOCKERs that remain will
be visible to humans on the PR).

## Reviewer prompt (pass verbatim to the sub-agent, with placeholders filled)

You are a code + SEO reviewer for batch {{BATCH_ID}} of the tooldone migration
sitting at `<REPO_ROOT>/apps/tooldone`. The pages added in this batch are:

{{JOBS_BLOCK}}

Review ONLY files changed by this batch (the 5 `.tsx`, the 5 `.fixtures.ts`,
the modified `<category>.ts` registry files, and the `tool.<id>` additions to
`messages/en.json`). Use `git --no-pager diff origin/main..HEAD` inside
`<REPO_ROOT>` to see the diff.

Check, for EACH page:
- Component uses `useTranslations("tool.<id>")` for every visible string.
- Title in registry: ≤ 60 chars, primary keyword first, no brand suffix.
- Description in registry: 120–160 chars.
- `about.body` in en.json: ≥ 300 words, multiple paragraphs.
- `examples.items`: ≥ 3 entries with realistic, internally-consistent numbers.
- `howto.steps`: 3–5 action-oriented items.
- `faq.items`: 4–6 Q&A, answers ≥ 2 sentences.
- Fixtures: ≥ 2 happy-path cases, label strings match the en.json `field/button/type` values.
- JSON-LD `WebApplication` and `FAQPage` are present in the component.
- No hard-coded English strings in JSX outside `<script type="application/ld+json">` blocks.
- File only changed within its allowed scope (no edits to ui/, i18n config, categories, other locales). NOTE: `src/tools/_fixtures-barrel.ts` is auto-regenerated by the outer worker (`pnpm fixtures:barrel`) AFTER you finish — it WILL appear in the diff, but that is correct and NOT a BLOCKER.

Respond with ONLY a single JSON object matching the schema above — no
markdown, no commentary. `items` MUST list every BLOCKER you find; an empty
array + verdict PASS means the diff is clean.

# Phase 3 — Done

Stop. Do not run tests, build, commit, or push — the outer worker script does
those steps. Exit.
