# BugDrop Feedback Widget — Monorepo Integration

## Overview

Add a self-hosted in-app feedback widget (forked from [mean-weasel/bugdrop](https://github.com/mean-weasel/bugdrop), MIT) to the weavejam monorepo as `apps/bugdrop`. Deploy it as a Cloudflare Worker at `feedback.weavejam.com`. Integrate into the `sudoku` and `toolsjam` apps with i18n support so users can submit bug reports, feature requests, and general feedback. Submissions automatically create GitHub Issues in `weavejam/sites`.

## Motivation

- No existing feedback channel for weavejam users; bug reports and feature requests go unseen.
- BugDrop provides: client-side DOM screenshot, annotation, category tagging, email capture, and GitHub Issues creation with zero external database — a perfect fit for our static-export apps which cannot run their own API routes.
- Hosting it ourselves (vs. SaaS) keeps all data in GitHub and avoids monthly SaaS fees.
- Placing it in the monorepo allows shared CI, shared secrets management, and future reuse across all weavejam properties.

## Requirements

1. **apps/bugdrop**: Fork BugDrop source into `apps/bugdrop/` with its own `package.json` and `wrangler.toml`. Must build cleanly with `pnpm build` and deploy with `pnpm deploy`.
2. **i18n support**: The widget must accept a `data-i18n` attribute (JSON string) that overrides any UI text string, keyed by the internal string ID. Fallback to English defaults when a key is absent. Initial locales: `en`, `zh-CN`, `zh-TW`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, `ru`.
3. **CORS / origins**: Worker enforces `ALLOWED_ORIGINS` env var (comma-separated). Production value covers all weavejam domains.
4. **GitHub App auth**: Uses a GitHub App (not a PAT) installed on `weavejam/sites`. App ID and private key stored as CF Worker secrets. Screenshots committed to a `bugdrop-screenshots` branch in `weavejam/sites`.
5. **Rate limiting**: 3 submissions per IP per 5 minutes via Cloudflare Workers KV. Returns HTTP 429 with a user-friendly error if exceeded.
6. **Feedback categories**: bug report, feature request, gossip (general comment). Each maps to a GitHub label.
7. **Metadata auto-attached**: page URL (path only, no query/hash), viewport, user-agent, locale, timestamp — always included in the GitHub Issue body.
8. **Email field**: Optional; shown in the issue body if provided.
9. **sudoku integration**: Script tag added to `apps/sudoku` layout. Widget activated for locale `en` only (sudoku has no i18n currently).
10. **toolsjam integration**: Script tag added to `apps/toolsjam` layout passing `data-locale={locale}` and `data-i18n` JSON from the `messages/shared/{locale}.json` feedback namespace (to be added).
11. **Deployment CI**: GitHub Actions workflow `deploy-bugdrop.yml` triggers on push to `main` when `apps/bugdrop/**` changes.
12. **Custom domain**: Worker bound to `feedback.weavejam.com` via Cloudflare DNS CNAME.

## Acceptance Criteria

- [ ] `pnpm --filter @weavejam/bugdrop build` produces `public/widget.js` and a bundled Worker.
- [ ] `pnpm --filter @weavejam/bugdrop deploy` deploys to Cloudflare Workers (requires secrets in environment).
- [ ] Loading `https://feedback.weavejam.com/widget.js` returns the widget JS.
- [ ] Submitting feedback on toolsjam (with screenshot) creates a GitHub Issue in `weavejam/sites` with: correct label, screenshot image embedded, page URL, viewport/UA metadata.
- [ ] `data-i18n='{"submit":"提交",...}'` on the script tag changes the button text to "提交".
- [ ] Submitting 4 times in < 5 min from the same IP returns HTTP 429.
- [ ] The widget renders correctly in both sudoku and toolsjam layouts across viewport sizes.
- [ ] GitHub Actions deploy workflow runs green on `main` push with `apps/bugdrop` changes.

## Technical Approach

### apps/bugdrop layout

```
apps/bugdrop/
  package.json          # name: @weavejam/bugdrop, scripts: build, deploy, dev
  wrangler.toml         # worker name, kv_namespaces, routes
  tsconfig.json
  src/
    index.ts            # Hono app entry (from BugDrop upstream)
    lib/                # github.ts, jwt.ts, authToken.ts (from upstream)
    routes/             # api.ts (from upstream)
    types.ts            # Env, FeedbackPayload (from upstream + i18n additions)
    widget/             # widget source (from upstream + i18n patch)
      index.ts          # Main widget; add i18n string resolution
      i18n.ts           # NEW: string key registry + resolver function
  public/               # built widget.js (gitignored, generated)
```

### i18n patch (minimal)

Add `src/widget/i18n.ts`:
```typescript
export const DEFAULT_STRINGS: Record<string, string> = {
  "button.label": "Feedback",
  "form.title.bug": "Report a Bug",
  "form.title.feature": "Feature Request",
  "form.title.gossip": "Share Feedback",
  "form.description.placeholder": "Describe your feedback...",
  "form.email.placeholder": "Email (optional)",
  "form.submit": "Submit",
  "form.cancel": "Cancel",
  "success.heading": "Thanks!",
  "success.body": "Your feedback has been submitted.",
  // ... all UI strings
};

export function t(key: string, overrides: Record<string, string>): string {
  return overrides[key] ?? DEFAULT_STRINGS[key] ?? key;
}
```

In `src/widget/index.ts`, parse `data-i18n` attribute as JSON into an overrides map, then replace all hardcoded strings with `t("key", overrides)` calls.

### wrangler.toml (key settings)

```toml
name = "bugdrop-feedback"
main = "src/index.ts"
compatibility_date = "2024-09-02"

[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "<KV_ID>"

[vars]
ENVIRONMENT = "production"
ALLOWED_ORIGINS = "https://toolsjam.com,https://weavetools.com,https://sudoku.weavejam.com"

[[routes]]
pattern = "feedback.weavejam.com/*"
zone_name = "weavejam.com"
```

Secrets (set via `wrangler secret put`):
- `GITHUB_APP_ID`
- `GITHUB_PRIVATE_KEY`

### sudoku integration

In `apps/sudoku/src/app/layout.tsx` (or equivalent root layout):
```tsx
<Script
  src="https://feedback.weavejam.com/widget.js"
  data-repo="weavejam/sites"
  data-label="sudoku"
  strategy="afterInteractive"
/>
```

### toolsjam integration

In `apps/toolsjam/src/app/[locale]/layout.tsx`:
```tsx
<Script
  src="https://feedback.weavejam.com/widget.js"
  data-repo="weavejam/sites"
  data-label="toolsjam"
  data-locale={locale}
  data-i18n={JSON.stringify(feedbackI18n[locale] ?? feedbackI18n.en)}
  strategy="afterInteractive"
/>
```

`feedbackI18n` is a small static map of BugDrop UI string overrides per locale (a separate `src/lib/bugdrop-i18n.ts` in toolsjam — ~80 lines, 10 locales × ~8 strings).

### GitHub Actions deploy

`.github/workflows/deploy-bugdrop.yml`:
```yaml
on:
  push:
    branches: [main]
    paths: [apps/bugdrop/**]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm --filter @weavejam/bugdrop build
      - run: pnpm --filter @weavejam/bugdrop deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## Testing Strategy

- **Widget i18n unit tests**: Given `data-i18n='{"form.submit":"提交"}'`, verify rendered button text equals "提交".
- **Worker API unit tests** (Vitest + `@cloudflare/vitest-pool-workers`): Verify `/api/feedback` returns 422 on missing fields, 429 on rate limit, 200 on valid payload (GitHub API mocked).
- **E2E smoke test** (Playwright against `wrangler dev` local): Submit a feedback form, verify GitHub Issue created (stub GitHub API with `msw`).
- **Manual integration test**: Load toolsjam dev, click widget, verify issue appears in `weavejam/sites` with correct label and screenshot.

## Out of Scope

- Feedback board / issue tracking UI (BugDrop has a `/board` WIP feature — we skip it for v1).
- Authentication / login for submitters (anonymous + optional email is sufficient for v1).
- Weavetools integration (defer to after toolsjam integration is validated).
- Custom annotation drawing tools (include BugDrop's existing annotation support as-is).
- Automated i18n translation of BugDrop UI strings via the translate-sweeper pipeline (manual translation for the ~8 widget strings per locale is fine for v1).
