You are porting MULTIPLE tool pages from the legacy site `tooldone.com`
into the new app at `apps/tooldone/`. Process ALL pages listed below in
this single session — don't ask which to do first. Read the inputs, write
the files for every page, exit when all are done. Do not ask questions.

# Context

- Monorepo root: <REPO_ROOT> (this worktree's root, not the main checkout)
- Target app:    <REPO_ROOT>/apps/tooldone/
- Stack:         Next.js 15 (App Router, `output: 'export'`), React 19,
  Tailwind v4, shadcn-style UI in `src/components/ui/`, next-intl 3.
- Locales:       en, zh-CN, zh-TW, ja, ko, es, fr, de, pt, ru
- Categories:    see `src/data/categories.ts` (CategoryId union).
- Tool registry: `src/data/tools/<category>.ts` — append a `ToolEntry` here.
- Per-tool UI:   `src/tools/<id>.tsx` — default export
                 `(props: { locale: Locale }) => React.ReactNode`.
- HTML snapshots live OUTSIDE this worktree under
  `D:\shudu\shudu\apps\tooldone\.scrape\html\<category>\<slug>.html`.
  The exact absolute path for each page is given below. Read it directly
  (the path is already added to your trusted dirs). DO NOT enumerate
  `.scrape\html\` inside the worktree (it's gitignored and empty there).
  DO NOT fall back to fetching the live site unless a specific snapshot
  file genuinely cannot be opened.
- Per-tool i18n: write to `messages/en.json` only under `tool.<id>`.
                 Other 9 locales are filled by a later batch step. DO NOT
                 touch other locale files.
- Per-tool fixtures: `src/tools/<id>.fixtures.ts` exporting
                 `fixtures: ToolFixture[]` (type from `@/tools/fixture`).
- Reference an existing tool for shape:
                 `src/tools/percentage-calculator.tsx` + its fixtures + en.json block.

# Pages to port in this run

{{JOBS_BLOCK}}

# For EACH page, perform all tasks below

**Order of operations matters for crash recovery: complete ALL work
(tsx + registry + en.json + fixtures) for tool #1 before starting tool
#2. That way, if the session dies mid-batch, the completed tools are
fully usable.**

1. Parse the snapshot HTML. Extract:
   - Page title, meta description, all visible copy, FAQ, examples, input
     field labels, button text, unit names, dropdown options.
   - The deterministic calculation logic. Reverse-engineer it from inline
     scripts, JSON data, or visible content. If math is ambiguous, prefer
     the canonical formula for the tool name.

2. Generate `src/tools/<TOOL_ID>.tsx`:
   - "use client" component (state for inputs).
   - Uses `useTranslations("tool.<TOOL_ID>")` for ALL user-visible strings —
     never hard-code English in JSX.
   - Uses `Input`, `Label`, `Button`, `Card*` from `@/components/ui/*`.
   - Renders these sections in order:
     a) Calculator card (inputs + result).
     b) `about` — long-form SEO body (3–5 paragraphs, what the tool does,
        the formula or method, what the answer means, common use cases).
     c) `examples` — at least 3 worked examples in a `<table>`.
     d) `howto` — 3–5 numbered steps.
     e) `faq` — 4–6 Q&A.
   - JSON-LD `WebApplication` + `FAQPage` via `<script type="application/ld+json">`.
   - For howto/faq DO NOT probe `t(\`howto.step${i}\`)` in a loop — read
     `t.raw("howto.steps")` as a string[] (or define a fixed-length array).

3. Append a new `ToolEntry` to `src/data/tools/<CATEGORY>.ts`:
   - `id: "<TOOL_ID>"`, `category: "<CATEGORY>"`
   - **Fill only the `en` field** for `slugs`, `titles`, `descriptions`.
     Leave other locales as the empty string `""`.
   - English title: SEO-optimized, ≤ 60 chars, NO brand suffix, lead with
     primary keyword (`"Percentage Calculator"`, `"BMI Calculator - Body Mass Index for Adults"`).
   - English description ≤ 160 chars, rich with secondary keywords.

4. Append `tool.<TOOL_ID>` to `messages/en.json` with all keys the
   component references: `title`, `tagline`, `intro`, `type.*`, `field.*`,
   `placeholder.*`, `button.*`, `error.*`, `result.heading`,
   one `result.<key>` per mode, `formula`, `about.heading`,
   `about.body` (≥ 300 words, multiple paragraphs joined with `\n\n`),
   `examples.heading`, `examples.intro`, `examples.items` (array of
   `{ input, output, note? }`, ≥ 3), `howto.heading`, `howto.steps`
   (array of strings, 3–5), `faq.heading`, `faq.items` (array of
   `{ q, a }`, 4–6).

   **CRITICAL — to survive transient API errors, do en.json edits ONE
   TOOL AT A TIME, not all 5 tools in a single Edit call.** Workflow:
   for each tool, (a) re-read the last ~10 lines of en.json to find the
   current insertion point, (b) emit a single Edit call adding just that
   one `"<TOOL_ID>": { ... }` block, (c) move to the next tool.

5. Generate `src/tools/<TOOL_ID>.fixtures.ts` exporting
   `fixtures: ToolFixture[]` with at least 2 happy-path cases. Use exact
   label strings matching the English `field.*` / `button.*` / `type.*`
   values. Avoid invalid-input fixtures that rely on `<input type="number">`
   accepting non-numeric text.

# Rules

- Do NOT run the build. Do NOT install packages. Do NOT modify other
  locale JSON files. Do NOT modify shared infra (i18n config, categories,
  layout, components/ui/*, fixtures barrel — that is regenerated after
  this prompt).
- Only touch, per tool: the component, the category registry, the en.json
  namespace, and the fixtures file.
- Process all pages even if one fails — write what you can.

Begin now.
