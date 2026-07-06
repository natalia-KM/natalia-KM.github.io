# CLAUDE.md

Guidance for working in this repo.

## What this is

The personal portfolio at **natalia-KM.github.io** — a single-page site themed as a
tiny retro operating system, **"NK-OS"**: a boot sequence, terminal-style sections,
an interactive command prompt, CRT scanlines, and selectable editor colour themes.

Stack: **Vite + React 19 + TypeScript**, deployed to **GitHub Pages** via GitHub Actions.
It is a GitHub *user* site (served from the domain root), so the Vite `base` is `/`.

## Commands

```bash
npm install      # install deps
npm run dev      # local dev server (Vite)
npm run build    # tsc typecheck + vite build -> dist/
npm run preview  # serve the production build locally
```

There is no test suite or linter wired up; `npm run build` (which runs `tsc`) is the
correctness gate. Run it after non-trivial changes.

## Layout

```
index.html              Vite entry: fonts (VT323 + JetBrains Mono) + #root
src/
  main.tsx              React entry
  App.tsx               composition + global F1/F2/F3 keys + .crt wrapper
  content.ts            ALL copy/data (identity, boot lines, stack, work, projects)
  themes.ts             THEMES palette data + applyTheme() + SIBLINGS + cycle order
  index.css             the entire design; all colour via CSS custom properties
  hooks/                useNkTheme · useScanlines · useBoot · useClock
  components/           StatusBar · ThemeSwitcher · Boot · Prompt · Whoami · About
                        · StackList · Work · Contact · CommandLine · StatusFooter
public/shouldIbuy/      standalone "Should I Buy It?" tool, served at /shouldIbuy/
.github/workflows/      deploy.yml — build + publish dist/ to Pages
design/                 original single-file design export (reference; not built)
```

## Where to change things

- **Text / projects / links / stack** → `src/content.ts`. Components are presentational
  and read from it; don't hard-code copy in components. Some fields (about lead, boot
  lines, echo output) contain inline HTML rendered via `dangerouslySetInnerHTML`.
- **Colours / theming** → `src/themes.ts` (palette tokens) and the `:root {}` block in
  `src/index.css` (the baked-in default, currently Gruvbox). Every colour is a CSS
  custom property — never hard-code hex in component styles.
- **Terminal commands / easter eggs** → the `table` and easter-egg blocks in
  `src/components/CommandLine.tsx`. `help` output is the `HELP` constant there.

## Theming model

- All colour lives in CSS custom properties on `:root`. A theme is just a token set.
- `applyTheme(id)` writes a theme's tokens onto `:root` as inline vars (overriding the
  baked-in defaults) and sets `data-theme` + `data-scheme`.
- Light-scheme visual tweaks key off `:root[data-scheme="light"]`, so any light palette
  gets the "paper" treatment (not just the built-in one).
- Controls: the `<ThemeSwitcher>` dropdown, `[F3]`/`Shift+[F3]` to cycle, `theme <name>`
  in the terminal. `[F1]` toggles scanlines, `[F2]` flips light/dark.
- Persisted keys: `localStorage["nkos-theme"]`, `localStorage["nkos-scan"]`,
  `sessionStorage["nkos-booted"]` (boot animation plays once per session).

## Conventions

- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters` — keep it clean or
  the build fails.
- Respect `prefers-reduced-motion` (boot typing, smooth scroll, cursor blink already do).
- The CRT overlays are confined between the top bar (2.5rem) and status line (1.9rem);
  keep effects off the chrome bars.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to Pages. **Requires** the repo's Pages source to be set to **"GitHub Actions"**
(Settings → Pages), otherwise the workflow output is ignored.
