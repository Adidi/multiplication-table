# Multiplication Table

A playful multiplication table game for kids (second grade and up). Pick a number, flip colorful cards to reveal the answers, and shuffle or mix exercises from all the tables.

**Play it here: [adidi.github.io/multiplication-table](https://adidi.github.io/multiplication-table/)**

## Features

- **Number tiles** – ten big, colorful tiles on the home page, one per number. Each number keeps its own color everywhere in the app.
- **Flip cards** – every exercise is a card. Tap it and it flips horizontally to reveal the answer, with the exercise repeated small in the corner.
- **Shuffle** – reorder a number's cards with one tap. Cards turn back to their question side and deal in again.
- **Mix mode** – twelve random exercises drawn from all the tables, colored by their first number so kids can tell which table they came from.
- **Hebrew and English** – Hebrew (RTL) is the default. Switching language flips the whole layout, while numbers and exercises always read left to right.
- **Dark and light mode** – dark is the default. Both the language and theme choices are remembered.
- **Mobile friendly** – card text scales with the card, and the footer navigation becomes a sticky bottom bar on phones.

## Tech stack

- [React 19](https://react.dev) with the React Compiler
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) – logical properties only (`ps`, `pe`, `start`, `end`…), so RTL/LTR is a single `dir` attribute
- [Base UI](https://base-ui.com/react) – accessible popover for the language and theme pickers
- [Lucide](https://lucide.dev) – icons
- [wouter](https://github.com/molefrog/wouter) – routing
- [oxlint](https://oxc.rs) – linting

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check and build for production into dist/
npm run preview   # serve the production build locally
npm run lint      # run oxlint
```

## Project structure

```
src/
├── app.tsx                  # providers, header, routes
├── main.tsx
├── index.css                # theme tokens, dark mode, tile animations
├── pages/
│   ├── home.tsx             # number tiles + mix tile
│   ├── number.tsx           # one number's exercises (/number/:n)
│   ├── mix.tsx              # random exercises from all tables (/mix)
│   └── not-found.tsx
├── components/              # app-specific building blocks
│   ├── number-tile.tsx
│   ├── mix-tile.tsx
│   ├── exercise-tile.tsx    # the flip card
│   ├── exercise-grid.tsx
│   ├── number-nav.tsx       # footer: prev / home / mix / next
│   ├── page-header.tsx
│   ├── shuffle-button.tsx
│   ├── site-header.tsx
│   ├── language-picker.tsx
│   ├── theme-picker.tsx
│   ├── back-home-link.tsx
│   └── scroll-to-top.tsx
├── ui/
│   └── popover-menu.tsx     # generic popover picker built on Base UI
└── lib/
    ├── tile-colors.ts       # one color per number, shared everywhere
    ├── shuffle.ts           # shuffle helpers and random exercise draw
    ├── theme/
    │   ├── theme.tsx        # ThemeProvider
    │   └── context.ts       # useTheme()
    └── i18n/
        ├── i18n.tsx         # LocaleProvider and t() helper
        ├── context.ts       # useLocale()
        ├── langs.ts         # LANGS registry: add new languages here
        ├── en.json
        └── he.json
```

## Adding a language

1. Copy `src/lib/i18n/en.json` to `src/lib/i18n/<code>.json` and translate the values. Keep the `{n}` placeholders.
2. Register it in the `LANGS` map in `src/lib/i18n/langs.ts` with its display name and text direction.

That's it. The language picker lists every entry in `LANGS`.

## Routes

| Path         | Page                                 |
| ------------ | ------------------------------------ |
| `/`          | Home: number tiles and the Mix tile  |
| `/number/:n` | Exercises for number `n` (1–10)      |
| `/mix`       | Random exercises from all the tables |

## Deployment

The app is deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`. Every push to `main` lints, builds, and publishes `dist/` to `https://adidi.github.io/multiplication-table/`.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Notes:

- `vite.config.ts` sets `base` to `/multiplication-table/`. If you rename the repository, update it there.
- The build also writes `dist/404.html` (a copy of `index.html`) so deep links such as `/number/3` load the app instead of GitHub's 404 page.

## License

MIT
