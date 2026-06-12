# __SITENAME__

Created from the `nextjs` template (Next.js 15 + Tailwind v4, static export to Cloudflare Pages).

- Dev: `pnpm --filter @weavejam/__SITENAME__ dev`
- Build: `pnpm --filter @weavejam/__SITENAME__ build` (outputs `out/`)
- Deploy: `pnpm --filter @weavejam/__SITENAME__ deploy`

If you need SSR / API routes (incompatible with `output: "export"`),
remove that line from `next.config.ts` and switch to `@cloudflare/next-on-pages`.

GA4 Measurement ID: `__GA_MEASUREMENT_ID__` (injected into `app/layout.tsx`).
