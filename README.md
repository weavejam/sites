# 数独 Sudoku

A Vite + TypeScript Sudoku web app supporting 4×4 and 9×9 boards with Easy / Standard / Hard difficulty.

Live demo: https://shudu.weavejam.com

## Features

- 4×4 (four-box) and 9×9 (nine-box) modes
- Three difficulty levels: Easy / Standard / Hard
- Random puzzle generation with unique-solution check
- Click or keyboard input (number keys, arrow keys, backspace)
- Conflict highlighting, peer/same-number highlighting
- Hint, check, and reveal-answer actions
- Timer and auto-save (localStorage)
- Mobile-friendly responsive layout

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. Deployed via Cloudflare Pages.

## License

MIT
