# weavejam/sites

Monorepo for all `*.weavejam.com` sites.

```
apps/
  sudoku/          # Vite + TS — https://sudoku.weavejam.com
packages/          # shared libs (per-site tailwind/eslint/tsconfig stay local)
templates/
  vite-react/      # starter for new Vite + React + TS sites
  nextjs/          # starter for new Next.js + Tailwind sites
scripts/
  new-site.ps1     # scaffold a new site + create GA4 property
```

## Quick start

```bash
pnpm install            # install all workspaces
pnpm dev                # turbo runs every site's dev (use --filter for one)
pnpm --filter @weavejam/sudoku dev
pnpm --filter @weavejam/sudoku build
```

## Add a new site

```powershell
# Vite + React + TS site
pnpm new-site -Name blog -Template vite -Domain blog.weavejam.com

# Next.js + Tailwind site
pnpm new-site -Name shop -Template nextjs -Domain shop.weavejam.com
```

The script:
1. Copies the template into `apps/<name>/`
2. Calls the `ga4-property` skill to create a GA4 Property and injects the Measurement ID
3. Prints next steps (Cloudflare Pages project + DNS — handled by the `cloudflare-dns` skill)

## Deploy

Each app deploys to its own Cloudflare Pages project:

```bash
pnpm --filter @weavejam/sudoku build
pnpm --filter @weavejam/sudoku deploy
```

CF Pages "Build watch paths" should be set so only the affected app rebuilds on push.
