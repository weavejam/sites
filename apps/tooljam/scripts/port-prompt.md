You are porting a single page from the legacy site `tooldone.com` into the
new app at `apps/tooljam/`. This run is fully non-interactive — read the
inputs, write the files, exit. Do not ask questions.

# Context

- Monorepo root: `D:\shudu\shudu`
- Target app:    `D:\shudu\shudu\apps\tooljam\`
- Stack:         Next.js 15 (App Router, `output: 'export'`), React 19,
  Tailwind v4, shadcn-style UI in `src/components/ui/`, next-intl 3.
- Locales:       en, zh-CN, zh-TW, ja, ko, es, fr, de, pt, ru
- Categories:    see `src/data/categories.ts` (CategoryId union).
- Tool registry: `src/data/tools/<category>.ts` — append a `ToolEntry` here.
- Per-tool UI:   `src/tools/<id>.tsx` — default export
                 `(props: { locale: Locale }) => React.ReactNode`.
- Per-tool i18n: write to `messages/en.json` only under `tool.<id>`.
                 (Other 9 locales are filled in by `scripts/translate-tool.ts`
                 in a separate batch step. DO NOT touch other locale files.)

# Inputs

- Tool id (English slug):        {{TOOL_ID}}
- Category id:                   {{CATEGORY}}
- Source URL:                    {{URL}}
- Local HTML snapshot file:      {{HTML_PATH}}

# Tasks (perform all)

1. Parse the snapshot HTML. Extract:
   - Page title, meta description, all visible copy, FAQ, examples, input
     field labels, button text, unit names, dropdown options.
   - The deterministic calculation logic. Reverse-engineer it from any
     inline scripts, JSON data, or visible content. If the math is
     ambiguous, prefer the canonical formula for the tool name.

2. Generate `src/tools/{{TOOL_ID}}.tsx`:
   - "use client" component (calculator needs state).
   - Uses `useTranslations("tool.{{TOOL_ID}}")` from `next-intl` for ALL
     user-visible strings — never hard-code English in JSX.
   - Uses `Input`, `Label`, `Button`, `Card*` from `@/components/ui/*`.
   - Renders these sections in order:
     a) Calculator card (inputs + result).
     b) `about` — long-form SEO body (3–5 paragraphs, what the tool does,
        the formula or method, what the answer means, common use cases).
     c) `examples` — at least 3 worked examples shown as a `<table>` or
        styled list (input → output with brief explanation).
     d) `howto` — 3–5 numbered steps.
     e) `faq` — 4–6 Q&A.
   - JSON-LD `WebApplication` + `FAQPage` injected via
     `<script type="application/ld+json">`.
   - Default export.

3. Append a new `ToolEntry` to `src/data/tools/{{CATEGORY}}.ts` with:
   - `id: "{{TOOL_ID}}"`, `category: "{{CATEGORY}}"`
   - **Fill only the `en` field** for `slugs`, `titles`, `descriptions`.
     Leave other locales as the empty string `""` — they are filled in
     later by the translate step. The TypeScript types still require all
     10 keys; use `""` placeholders.
   - English title rules (SEO-optimized, like the legacy tooljam site):
     * NO brand suffix. NO "— Fast & Free Online Tool", no "ToolJam".
     * Lead with the primary keyword users actually search for.
     * Either pure feature: `"Percentage Calculator"`,
       `"Acres to Hectares Converter"`, or feature + qualifier:
       `"BMI Calculator - Body Mass Index for Adults"`.
     * Keep ≤ 60 characters.
   - English description ≤ 160 characters; rich with secondary keywords,
     no fluff, no brand name.

4. Append per-tool i18n entries to `messages/en.json` only, under
   `tool.{{TOOL_ID}}`. Required keys (component must reference all of
   these — keep names stable so the translator can map them):
   - `title`, `tagline`, `intro`
   - `type.*` (mode labels if applicable), `field.*` (input labels),
     `placeholder.*`, `button.*`, `error.*`
   - `result.heading`, plus one `result.<key>` per output mode
   - `about.heading`, `about.body` (≥ 300 words of natural English,
     written like a knowledgeable blog post; you can use multiple
     paragraphs separated by `\n\n` inside a single string).
   - `examples.heading`, `examples.intro`, `examples.items` (array of
     `{ input: string, output: string, note?: string }` — at least 3).
     If you prefer flat keys, use `examples.e1_input`, `examples.e1_output`,
     `examples.e1_note`, …, but the array form is preferred.
   - `howto.heading`, `howto.step1`…`howto.stepN`
   - `faq.heading`, `faq.q1`/`faq.q1_a` … `faq.q4`/`faq.q4_a` (4–6 pairs)
   - `formula` (one line, plain text)

5. Generate `src/tools/{{TOOL_ID}}.fixtures.ts` exporting
   `fixtures: ToolFixture[]` (type from `@/tools/fixture`). Include at
   least 2 happy-path cases that drive the primary calculation. Use
   exact label strings (matching the English `field.*` / `button.*` /
   `type.*` values) — avoid generic regexes that match multiple labels.
   Do NOT include invalid-input fixtures relying on `<input type="number">`
   accepting non-numeric text (real browsers reject those keystrokes).
   See existing `src/tools/percentage-calculator.fixtures.ts` for shape.

6. Do NOT run the build. Do NOT install packages. Do NOT modify other
   locale JSON files. Only touch: the component, the category registry,
   `messages/en.json`, and the fixtures file.

# Quality bar

- Long, keyword-dense English copy that would rank for the tool's primary
  search intent. Write like a domain expert, not a templated SEO bot.
- At least 3 concrete worked examples with real numbers.
- All input labels, button text, unit names, error messages routed
  through `t(...)`.
- Code passes `pnpm --filter @weavejam/tooljam build` (no TS errors).
- Component renders deterministically given the same inputs.

Begin now.
