# @weavejam/weavetools

Multilingual static rebuild of [___WEAVETOOLS_DOT_COM___](https://___WEAVETOOLS_DOT_COM___) at
`tools.weavejam.com`. Next.js (App Router) + Tailwind v4 + shadcn-style UI +
next-intl, static-exported, deployed to Azure Storage Static Website fronted by
Cloudflare CDN.

## Why static export to Azure (not Cloudflare Pages)

We render 10 locales × ~2,837 tool pages ≈ 28k HTML files. Cloudflare Pages
caps a single deployment at 20,000 files, so we ship to Azure Storage Static
Website and put Cloudflare in front for CDN/edge cache.

## Layout

```
.scrape/             # snapshots of the legacy site (gitignored content)
messages/<locale>.json   # 10 UI dictionaries
src/i18n/locales.ts      # locale registry
src/data/categories.ts   # 10 categories × per-locale slug map
src/data/tools/*.ts      # generated per-category tool registries
src/tools/<id>.tsx       # generated per-tool React components
src/app/[locale]/*       # i18n routes
scripts/port-page.ts     # CLI: scrape + LLM port a single tool to TSX + i18n JSON
scripts/deploy-azure.ts  # upload `out/` to Azure + purge CF cache
```

## Local dev

```pwsh
pnpm install
pnpm --filter @weavejam/weavetools dev
```

## Porting tool pages from ___WEAVETOOLS_DOT_COM___

```pwsh
# Snapshot all en pages locally (one-time, ~1 min).
pnpm --filter @weavejam/weavetools scrape

# Port a single tool by URL slug (English path).
pnpm --filter @weavejam/weavetools port-page math/percentage-calculator

# Batch a list.
pnpm --filter @weavejam/weavetools port-page --batch .scrape/pilot.txt
```

Each port-page run shells out to `copilot` (this CLI) with a curated prompt and
writes:

- `src/tools/<id>.tsx` — the React component with all UI strings inlined as
  `t(...)` lookups.
- Updates to `src/data/tools/<category>.ts` — a new `ToolEntry` with per-locale
  titles, descriptions, and URL slugs.
- Per-locale chunks merged into `messages/<locale>.json` under
  `tool.<id>.*`.

## Deploy

```pwsh
pnpm --filter @weavejam/weavetools deploy
```

Requires env vars `AZURE_STORAGE_ACCOUNT`, `AZURE_STORAGE_KEY`,
`CF_API_TOKEN`, `CF_ZONE_ID`. The Azure storage account must have static-website
hosting enabled and `tools.weavejam.com` pointed at the `$web` endpoint via a
Cloudflare CNAME (with CF proxy on).

## SEO

- `src/app/sitemap.ts` emits all `{locale, category, tool}` URLs.
- Every page sets `<link rel="alternate" hrefLang>` for every locale via
  `buildAlternates()`.
- AdSense is gated by `NEXT_PUBLIC_ADSENSE_ENABLED=1`; ship to production with
  it off until the AdSense application is approved, then flip the flag.
- 301 redirects from legacy ___WEAVETOOLS_DOT_COM___ paths are handled at the CF layer (CF
  Worker or page rules). See `docs/redirects.md` (TODO after migration).

## Adding a locale

1. Add the code to `src/i18n/locales.ts` (`locales`, `localeNames`, `hreflang`).
2. Create `messages/<code>.json` (copy `en.json` as starting point).
3. Add the locale's slug to every entry in `src/data/categories.ts` and to
   every `ToolEntry.slugs` / `titles` / `descriptions` map.
4. Re-run `pnpm port-page --backfill <locale>` to translate every existing tool
   page into the new locale via copilot CLI.
