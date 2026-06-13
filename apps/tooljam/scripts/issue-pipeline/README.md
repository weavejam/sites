# tooljam issue-pipeline runbook

Parallel, issue-driven migration of 2840 calculator pages from legacy
`tooldone.com` into `apps/tooljam/` using Copilot CLI workers. One
GitHub issue → one git worktree → one PR (5 pages × 10 locales).

## Quick start

```pwsh
# 1. (one-time) Scrape source HTML into .scrape/html/
pnpm scrape

# 2. (one-time) Create labels in GitHub
gh label create tooldone-port --color "0e8a16" --force
gh label create ready --color "0e8a16" --force
gh label create in-progress --color "fbca04" --force
gh label create blocked --color "d93f0b" --force
gh label create review-failed --color "d93f0b" --force

# 3. Slice URLs into batches & create issues
pnpm create-issues --count 10              # smoke
pnpm create-issues --all                   # rest

# 4. Run N workers in parallel (each picks one ready issue → PR)
pnpm run-workers -c 8

# 5. If you change the PRD template or pipeline contract:
pnpm refresh-issues                        # re-render bodies of all open issues
```

## Architecture

```
.scrape/urls-en.txt           ── 2840 legacy URLs (one per line)
.scrape/html/<cat>/<id>.html  ── pre-fetched English HTML snapshots
.port-batches/index.json      ── batch-NNN → {issue, urls, status}
scripts/issue-pipeline/
  create-issues.ts            ── slice URLs → batches → GH issues
  refresh-issues.ts           ── re-render PRDs in place (after template changes)
  issue-worker.ts             ── one-shot pipeline for ONE issue
  run-workers.ts              ── concurrency dispatcher (spawns N workers)
  prd-template.md             ── PRD body template (rendered per issue)
  dev-prompt.md               ── prompt fed to claude-sonnet-4.6 port agent
  gh-helper.ts                ── gh wrapper with curl+token fallback (TLS flakes)
```

## Worker phase sequence

| # | Phase            | Tool                                    | Notes                                                    |
|---|------------------|-----------------------------------------|----------------------------------------------------------|
| 1 | claim            | gh label dance + index.json             | `in-progress` label is the lock                          |
| 2 | worktree         | git worktree add                        | base = `origin/main`, branch = `port/issue-{N}`          |
| 3 | install          | pnpm install --frozen-lockfile          | --prefer-offline; ~8s in warm cache                      |
| 4 | port+review      | copilot --model claude-sonnet-4.6       | port 5 pages → internal task sub-agent (gpt-5.5) review → fix BLOCKERs |
| 5 | translate        | pnpm translate-tool <ids>               | gpt-5.4-mini first, gpt-5.5 fallback (~3 min/tool/model) |
| 6 | fixtures-barrel  | pnpm fixtures:barrel                    | regenerates _fixtures-barrel.ts                          |
| 7 | unit + build + e2e | pnpm test && pnpm build && pnpm test:e2e --grep "<ids>" | NO `--` separator before --grep!  |
| 8 | commit + push    | git                                     | message includes `Closes #N`                             |
| 9 | PR + auto-merge  | gh-helper (TLS-flake-resilient)         | `--squash --delete-branch`                               |
| 10| cleanup          | git worktree remove + rmSync fallback   | branch lives on remote until auto-merge fires            |

## Gotchas (lessons learned the hard way)

### Copilot CLI
- **Use `--allow-all`, not `--allow-all-tools`.** The shorter flag covers only tool permissions; the worker also needs path + URL trust because it writes into arbitrary worktree paths.
- **Always pair with `--no-ask-user`** for non-interactive batch runs.
- **Pipe the prompt via stdin**, not via `--prompt`. Some prompts exceed CLI argv length.
- **Killing copilot.exe is risky**: copilot spawns a worker `copilot.exe` that owns the parent PID's child. Always trace the parent chain freshly (`Get-CimInstance Win32_Process -Filter "ProcessId=$PID"` walking up). NEVER hardcode whitelist PIDs across messages.

### Translate
- **gpt-5.4-mini** handles ~90% of tools at 5× lower cost. **gpt-5.5** is the fallback (some long-tail tools, especially those with domain-specific terms like `a1c-calculator`, `percentage-calculator`, return JSON missing `pt`).
- Each fallback chain costs ~6× a single mini run in the worst case (4 attempts × ~3 min).

### Next.js i18n routing
- **URL pattern**: `/{locale}/{categorySlug[locale]}/{toolSlug[locale]}` — BOTH category and tool slugs are localized.
- Example: zh-CN biology basal-area is `/zh-CN/shengwuxue/xiong-gao-duan-mian-ji-ji-suan-qi`, NOT `/zh-CN/biology/basal-area-calculator`.
- A 404 on a translated page usually means: (a) the slug is correct but you used the English category, or (b) the translate phase didn't run for that tool yet.
- `output: 'export'` + `dynamicParams: false` means a tool with ANY empty slug in any locale breaks `generateStaticParams()` for the entire route.

### Playwright / pnpm
- **DON'T** write `pnpm test:e2e -- --grep "x"` — the `--` makes pnpm pass `--grep` as a filename and playwright responds with "No tests found".
- **DO** write `pnpm test:e2e --grep "x"`.

### Git worktree on Windows
- `git worktree remove` fails when `node_modules` contains symlinks/junctions. Always follow with `rmSync(wt, {recursive: true, force: true})` + `git worktree prune`.
- `next dev` running in the source tree locks the directory → `git mv apps/X apps/Y` fails. Stop dev server first.

### gh CLI
- **TLS handshake timeouts** are common against `api.github.com` from Windows. Use `scripts/issue-pipeline/gh-helper.ts` which retries with curl + `gh auth token` fallback.
- `gh pr merge --auto` silently fails when the default branch isn't checked out in the current worktree — but it usually works anyway because CI completes faster than the verification. Squash + delete-branch is enabled regardless.

### Rebrand sed pitfalls
- When rewriting brand names that share substrings with placeholders, beware case-insensitive uppercase rules corrupting placeholders mid-pipeline (e.g. `___TOOLDONE_DOT_COM___` → `___TOOLJAM_DOT_COM___`).
- Process URL-like strings in a SEPARATE pre-pass before token replacement, and prefer placeholders that don't contain the source token (e.g. `%%KEEP_DOMAIN%%`).

## Models used

| Use case                  | Model               | Why                                       |
|---------------------------|---------------------|-------------------------------------------|
| Page port (Phase 4)       | claude-sonnet-4.6   | Best at large structured codegen          |
| Self-review sub-agent     | gpt-5.5             | High-quality critique on a fresh context  |
| Translation (Phase 5)     | gpt-5.4-mini → 5.5  | Cheap default + fallback for failures     |
