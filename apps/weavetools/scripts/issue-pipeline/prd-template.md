# weavetools Port Batch PRD: {{BATCH_ID}}

## Overview
Port {{N_PAGES}} calculator pages from legacy tooldone.com into `apps/weavetools/`. English locale only — other 9 locales are handled by a separate `translate-tool.ts` pipeline after merge.

## Motivation
Part of the full tooldone.com → apps/weavetools migration (~568 batches × 5 pages = 2840 pages total). Each batch ships as one reviewable, revertable PR.

## Scope — Pages in this batch

{{PAGES_TABLE}}

## Requirements
1. For each page, create `src/tools/<id>.tsx` as a `"use client"` component using `useTranslations("tool.<id>")` for **every** user-visible string (no hard-coded English in JSX).
2. Append a new `ToolEntry` to `src/data/tools/<category>.ts`. Fill only the `en` field for `slugs`, `titles`, `descriptions`; leave other locales as `""`.
3. Add a `tool.<id>` block to `messages/en.json` with all keys the component references (see `port-batch-prompt.md` for the full key list).
4. Create `src/tools/<id>.fixtures.ts` exporting `fixtures: ToolFixture[]` with ≥ 2 happy-path cases.
5. Each page renders correctly at `/en/<category>/<id>` with: calculator card → `about` (≥ 300-word SEO body) → `examples` (≥ 3 in a table) → `howto` (3–5 steps) → `faq` (4–6 Q&A) → JSON-LD `WebApplication` + `FAQPage` script tags.

## Acceptance Criteria
- [ ] All {{N_PAGES}} `.tsx` files exist and use i18n correctly
- [ ] `pnpm fixtures:barrel` regenerates without error
- [ ] `pnpm test` passes (vitest covers new fixtures)
- [ ] `pnpm build` succeeds (static export must work)
- [ ] `pnpm test:e2e` passes for the {{N_PAGES}} new routes
- [ ] Reviewer sub-agent (gpt-5.5) report posted as PR comment with verdict `PASS` (or all `BLOCKER`s fixed and re-reviewed)
- [ ] PR body contains `Closes #{{ISSUE_NUMBER}}` and has auto-merge enabled (squash)

## Technical Approach
- Conventions: `apps/weavetools/scripts/port-batch-prompt.md` (authoritative)
- Reference impl: `src/tools/percentage-calculator.tsx` + its fixtures + `messages/en.json#tool.percentage-calculator`
- Stack: Next.js 15 (App Router, `output: 'export'`), React 19, Tailwind v4, shadcn-style UI in `src/components/ui/`, next-intl 3
- HTML snapshots: `D:\shudu\shudu\apps\weavetools\.scrape\html\<category>\<slug>.html` (already added to trusted dirs by worker)
- Dev model: `claude-sonnet-4.6`
- Review model: `gpt-5.5` (invoked via internal task sub-agent after implementation, before push)

## Testing Strategy
- **Unit**: vitest runs each new tool's `fixtures` against its component (existing `fixture.ts` harness)
- **Build**: `pnpm build` — static export of all routes must succeed
- **E2E**: Playwright filtered to the {{N_PAGES}} new routes (`--grep "<tool-id>"`)
- **Review**: structured JSON from reviewer sub-agent saved verbatim as a PR comment

## Out of Scope
- Translation to the other 9 locales (`zh-CN`, `zh-TW`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, `ru`) — handled separately
- Any change to shared infra: `src/i18n/*`, `src/data/categories.ts`, `src/app/layout*`, `src/components/ui/*`, `_fixtures-barrel.ts` (regenerated automatically)
- Pages outside this batch's listed tool IDs

## Worker Instructions (executed by `issue-worker.ts`)
1. Claim issue: add `in-progress` label, comment with worker id
2. `git worktree add ../sites-worktrees/issue-{{ISSUE_NUMBER}} -b port/issue-{{ISSUE_NUMBER}} origin/main`
3. `pnpm install --frozen-lockfile --prefer-offline`
4. Spawn `copilot --model claude-sonnet-4.6` with `port-batch-prompt.md` rendered for these {{N_PAGES}} pages; instructions tell it to invoke an internal task sub-agent (`gpt-5.5`) for review after writing files, parse its structured-JSON output, fix BLOCKERs, then exit
5. `pnpm fixtures:barrel && pnpm test && pnpm build && pnpm test:e2e --grep "<tool-ids>"`
6. Commit all changes, push branch
7. `gh pr create --title "port(weavetools): {{BATCH_ID}}" --body "Closes #{{ISSUE_NUMBER}}\n\n<review report>"`
8. `gh pr merge --auto --squash --delete-branch`
9. Remove worktree (branch lives on remote until auto-merge fires)
