# GamesJam — Mobile-first mini-games portal (v1: Tetris)

## Overview
Launch a new sibling site `games.weavejam.com` (brand: **GamesJam**) — a mobile-first
mini-games portal. v1 ships the portal shell + the first game: a standard Tetris.

## Motivation
- Extends the weavejam.com family (sudoku / tools / games) with a games-focused
  destination.
- Mobile-first means real touch ergonomics, PWA install, no zoom/scroll surprises.
- Establishes a reusable game shell (audio, settings, score, touch HUD, i18n) so
  follow-up games (Snake, 2048, breakout, …) are quick to add.

## Requirements

### Portal (the "shell")
1. New app `apps/gamesjam` deployed at `https://games.weavejam.com`.
2. Brand: **GamesJam** — logo wordmark, color palette distinct from sudoku/tools.
3. Home page: a responsive grid of game cards (each card → cover, title, short
   description, "Play" CTA). v1 lists Tetris + greyed-out "coming soon" placeholders.
4. i18n: zh-CN + en-US, URL-localized (`/en/...`, `/zh-CN/...`) matching the
   weavetools convention. Default locale auto-detected (`navigator.language`),
   user can switch from a header menu, choice persisted in `localStorage`.
5. PWA: installable, full-screen on mobile, custom splash + icons, works offline
   for already-visited routes (assets cached).
6. Settings drawer (gear icon in header): master volume slider, music toggle, SFX
   toggle, language switch. Persisted to localStorage. (Dark theme only in v1 —
   light/system theme deferred.)
7. Wake Lock active during gameplay so the phone doesn't dim/lock mid-game.
8. Safe-area aware layout (`100dvh` + `env(safe-area-inset-*)`).
9. GA4 measurement ID injected via existing `scripts/new-site.ps1` flow.
10. SEO basics: per-locale `<title>` / `<meta description>`, `hreflang` alternates,
    Open Graph image, `sitemap.xml`, `robots.txt`.

### Tetris game (the first game)
11. Standard SRS rotation system with the seven tetrominoes (I, O, T, S, Z, J, L).
12. 10×20 visible playfield (24 row buffer above for spawn).
13. 7-bag random piece generator.
14. Ghost piece (rendered at the landing position, dimmed).
15. Hold piece (1 slot, can swap once per piece).
16. Next-piece preview: 5 upcoming pieces.
17. Drop mechanics: soft drop, hard drop, lock delay (500 ms with 15 move-resets).
18. Line clear with animation + SFX; T-spin detected (basic 3-corner rule) and
    scored; back-to-back tetris recognised.
19. Scoring: standard guideline (Single 100, Double 300, Triple 500, Tetris 800,
    × level multiplier; back-to-back ×1.5; combos +50/n).
20. Level + gravity curve: level rises every 10 lines, gravity follows the
     standard table up to level 20.
21. Game over when a new piece can't spawn; restart and "back to home" buttons.
22. Local high-score persisted per device (`localStorage`, key
     `gamesjam:scores` — a JSON map of `{ [gameSlug]: bestScore }` so the
     shell can persist scores for additional games without code changes).
23. Audio: Korobeiniki BGM (loops, crossfades on game-over), SFX for move,
     rotate, lock, hard-drop, line-clear, level-up, hold, fail, win. Sourced from
     `D:\fluttergames\little-games\godot\assets\audio\tetris\`. Respect master /
     music / SFX volumes from settings.
24. Touch controls (default on touch devices):
     - Swipe left/right → move
     - Swipe down → soft drop
     - Swipe up → hard drop
     - Single tap → rotate CW
     - Two-finger tap → rotate CCW
     - Long press → hold
     - On-screen HUD buttons mirror these for discoverability (toggleable).
25. Keyboard controls (desktop):
     - ←/→ move, ↓ soft drop, Space hard drop, ↑/X rotate CW, Z rotate CCW,
       C/Shift hold, P/Esc pause.
26. Pause overlay: resume / restart / settings / quit-to-home.
27. Portrait-locked on mobile (CSS + manifest hint); landscape on desktop is fine.

## Acceptance Criteria
- `pnpm --filter @weavejam/gamesjam build` succeeds, `pnpm --filter @weavejam/gamesjam dev` serves locally.
- Pushed to `main` triggers `.github/workflows/deploy-gamesjam.yml`, which deploys
  to Cloudflare Pages project `gamesjam`.
- `https://games.weavejam.com/` returns 200, shows the portal, has the Tetris card.
- `https://games.weavejam.com/en/tetris` and `/zh-CN/tetris` both return 200 and
  load the game.
- iPhone Safari + Android Chrome smoke test: install as PWA, launch, play Tetris
  with swipe controls, lose, restart, change volume in settings.
- Lighthouse mobile PWA audit: installable ✓, performance ≥ 80, no critical a11y
  issues.
- All SFX + BGM play (after first user gesture) on iOS Safari without unlock
  glitches.
- Closing/reopening the page restores last selected language, settings, and
  remembers high score.

## Technical Approach

### Stack
- **Vite + React 19 + TypeScript** (matches `apps/sudoku`; uses existing
  `templates/vite-react`).
- **Phaser 3** for the Tetris canvas / game loop / input / tween / audio
  routing. Mounted in a React component (`<TetrisGame />`) that owns the
  Phaser instance lifecycle.
- **TailwindCSS** for portal UI (cards, header, drawer).
- **Zustand** for global settings + per-game high-score store (small, no
  boilerplate, plays well with both React and Phaser).
- **react-router-dom v6** with localized routes: `/`, `/en`, `/zh-CN`,
  `/en/tetris`, `/zh-CN/tetris`. Game pages are `React.lazy` chunks.
- **vite-plugin-pwa** for service worker, manifest, install prompt.
- **Howler.js** wrapped behind a small `AudioManager` to handle iOS unlock,
  sprite playback, BGM loop/crossfade, and ducking on focus loss.
- **react-i18next** with two locale JSON bundles (`en.json`, `zh-CN.json`),
  loaded lazily.

### Directory layout
```
apps/gamesjam/
├── public/
│   ├── games/tetris/audio/*.mp3        (copied from little-games)
│   ├── icons/                          PWA icons
│   └── og.png
├── src/
│   ├── app/                            Routes + layout shells
│   │   ├── Layout.tsx
│   │   ├── HomePage.tsx
│   │   └── TetrisPage.tsx
│   ├── shell/                          Reusable game-shell pieces
│   │   ├── AudioManager.ts
│   │   ├── SettingsStore.ts            (Zustand)
│   │   ├── ScoreStore.ts               (Zustand, localStorage persist)
│   │   ├── SettingsDrawer.tsx
│   │   ├── Header.tsx
│   │   ├── GameFrame.tsx               (pause overlay, top HUD slot)
│   │   ├── TouchHUD.tsx
│   │   └── useWakeLock.ts
│   ├── games/tetris/
│   │   ├── TetrisGame.tsx              React mount + Phaser bootstrap
│   │   ├── scene/
│   │   │   ├── PlayScene.ts
│   │   │   ├── pieces.ts               SRS data, 7-bag
│   │   │   ├── board.ts                grid + line-clear + collision
│   │   │   ├── rotation.ts             SRS kick tables
│   │   │   ├── scoring.ts              guideline scoring + T-spin
│   │   │   └── audio.ts                audio sprite map for Howler
│   │   └── tetris.test.ts              unit tests for board/rotation/scoring
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── en.json
│   │   └── zh-CN.json
│   ├── styles/                         tailwind base + theme
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── wrangler.toml
```

### Audio pipeline
- All 17 mp3s copied to `public/games/tetris/audio/`.
- `AudioManager.loadTetris()` builds two Howler instances:
  - `bgm` (one of the Korobeiniki variants, looped)
  - `sfx` (audio sprite for the short clips so we hold one decoded buffer)
- All channels respect `SettingsStore` master + music/SFX gains; subscribes
  on init so live volume changes take effect mid-game.
- On `document.visibilitychange` → hidden, BGM mutes & game pauses.

### Routing & i18n
- Path strategy mirrors weavetools: `/<locale>/<game-slug>` where locale is
  `en` or `zh-CN`. Root `/` redirects to `/<detected-locale>`.
- Tetris slug: `tetris` for `en`, `eluosi-fangkuai` for `zh-CN`.
- `hreflang` and `<link rel="alternate">` injected per page.

### Deployment
- CF Pages project name: `gamesjam`.
- Add `.github/workflows/deploy-gamesjam.yml` mirroring `deploy-toolsjam.yml`
  (filter triggers on `apps/gamesjam/**`, build outDir `dist`, vite template).
- DNS: CNAME `games.weavejam.com → gamesjam.pages.dev` via the `cloudflare-dns`
  skill, then bind custom domain in CF Pages.

### Error handling
- Phaser scene wrapped in an error boundary that shows a friendly "Something
  went wrong, tap to reload" overlay and reports `console.error` to GA4 as a
  custom event (no Sentry in v1 — keep it lean).
- Audio load failures degrade gracefully (game plays silently rather than
  blocking).

## Testing Strategy
- **Unit tests** (Vitest) for the pure-logic parts of Tetris that are easy to
  break: `board` (collision, line clear), `rotation` (each SRS kick case for
  every piece), `scoring` (Single/Double/Triple/Tetris/T-spin/B2B/combo),
  `pieces` (7-bag yields each piece exactly once per 7). Goal: > 90 %
  coverage on these four files.
- **Manual smoke test checklist** in PR description: install PWA on iOS +
  Android, play one full game, lose, restart, change language, change volume,
  background the tab (BGM should stop), foreground (should resume paused).
- **Build check**: `pnpm --filter @weavejam/gamesjam build` succeeds in CI.
- **Lighthouse**: not gated in CI for v1 — manual run before merge,
  screenshots in PR description.

## Out of Scope (v1)
- Other games (Snake, 2048, etc.) — only placeholder cards in the grid.
- Accounts, online leaderboard, social share buttons.
- Multiplayer / online play.
- Achievements, dailies, ad units.
- Replays / undo.
- Custom themes/skins; light/system theme.
- Sentry / error monitoring backend (rely on GA4 only).
- Cross-game shared `packages/game-shell` extraction — keep everything in
  `apps/gamesjam/src/shell/` for v1; extract when a second game ships.
