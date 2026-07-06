/* ===========================================================================
   NK-OS THEMES — palette data + runtime applier (ported from design/themes.js).
   ---------------------------------------------------------------------------
   Every colour on the site is a CSS custom property on :root, so a theme is
   just this token set. `applyTheme` writes the tokens onto the document root
   as inline CSS variables, which override the baked-in :root block in index.css.

   TO SHIP WITHOUT THE SWITCHER: pick one theme, paste its `tokens` into the
   :root {} block in src/index.css, delete src/components/ThemeSwitcher.tsx and
   the <ThemeSwitcher/> usage, and (optionally) delete this file.
   =========================================================================== */

export type Scheme = "dark" | "light";

export interface Theme {
  label: string;
  scheme: Scheme;
  tokens: {
    bg: string;
    bg2: string;
    fg: string;
    bright: string;
    dim: string;
    faint: string;
    ok: string;
    err: string;
    accent: string;
    line: string;
    sel: string;
    scan: string;
    glow: string;
  };
}

export type ThemeId =
  | "gruvbox"
  | "gruvbox-light"
  | "one-dark"
  | "one-light"
  | "monokai"
  | "monokai-light"
  | "amber"
  | "amber-light"
  | "nord"
  | "tokyo-night"
  | "catppuccin";

export const THEMES: Record<ThemeId, Theme> = {
  "gruvbox": {
    label: "Gruvbox", scheme: "dark",
    tokens: { bg: "#282828", bg2: "#32302f", fg: "#d5c4a1", bright: "#fbf1c7", dim: "#928374", faint: "#665c54", ok: "#b8bb26", err: "#fb4934", accent: "#83a598", line: "#3c3836", sel: "rgba(131,165,152,0.22)", scan: "rgba(0,0,0,0.26)", glow: "rgba(213,196,161,0.035)" },
  },
  "gruvbox-light": {
    label: "Gruvbox Light", scheme: "light",
    tokens: { bg: "#fbf1c7", bg2: "#f2e5bc", fg: "#3c3836", bright: "#282828", dim: "#7c6f64", faint: "#a89984", ok: "#79740e", err: "#cc241d", accent: "#427b58", line: "#d5c4a1", sel: "rgba(66,123,88,0.16)", scan: "rgba(60,56,54,0.05)", glow: "rgba(0,0,0,0)" },
  },
  "one-dark": {
    label: "One Dark", scheme: "dark",
    tokens: { bg: "#282c34", bg2: "#2f343d", fg: "#abb2bf", bright: "#e6e6e6", dim: "#5c6370", faint: "#464c56", ok: "#98c379", err: "#e06c75", accent: "#61afef", line: "#3a3f4b", sel: "rgba(97,175,239,0.20)", scan: "rgba(0,0,0,0.26)", glow: "rgba(97,175,239,0.04)" },
  },
  "one-light": {
    label: "One Light", scheme: "light",
    tokens: { bg: "#fafafa", bg2: "#f0f0f1", fg: "#383a42", bright: "#202227", dim: "#a0a1a7", faint: "#c2c2c4", ok: "#50a14f", err: "#e45649", accent: "#4078f2", line: "#dcdce0", sel: "rgba(64,120,242,0.14)", scan: "rgba(60,60,70,0.05)", glow: "rgba(0,0,0,0)" },
  },
  "monokai": {
    label: "Monokai", scheme: "dark",
    tokens: { bg: "#272822", bg2: "#31322b", fg: "#cfd0c2", bright: "#f8f8f2", dim: "#75715e", faint: "#504b3a", ok: "#a6e22e", err: "#f92672", accent: "#66d9ef", line: "#3b3c34", sel: "rgba(102,217,239,0.18)", scan: "rgba(0,0,0,0.28)", glow: "rgba(166,226,46,0.035)" },
  },
  "monokai-light": {
    label: "Monokai Light", scheme: "light",
    tokens: { bg: "#f9f8f2", bg2: "#efeee4", fg: "#4a4a40", bright: "#272822", dim: "#8a8776", faint: "#b8b5a3", ok: "#6a8f00", err: "#d0175a", accent: "#1c93a6", line: "#e2e0d0", sel: "rgba(28,147,166,0.14)", scan: "rgba(60,58,50,0.05)", glow: "rgba(0,0,0,0)" },
  },
  "amber": {
    label: "Amber Phosphor", scheme: "dark",
    tokens: { bg: "#0c0b08", bg2: "#14110b", fg: "#edcf95", bright: "#ffc24a", dim: "#94794a", faint: "#5f4e30", ok: "#8fe36b", err: "#ff7a63", accent: "#ff9d3c", line: "#2c2312", sel: "rgba(255,194,74,0.22)", scan: "rgba(0,0,0,0.28)", glow: "rgba(255,176,66,0.05)" },
  },
  "amber-light": {
    label: "Amber Paper", scheme: "light",
    tokens: { bg: "#ece2c9", bg2: "#e3d6b6", fg: "#33291a", bright: "#1c150a", dim: "#7c6c4c", faint: "#a8966e", ok: "#2f7d32", err: "#b3402f", accent: "#b0531a", line: "#cdbd94", sel: "rgba(176,83,26,0.18)", scan: "rgba(90,74,42,0.06)", glow: "rgba(0,0,0,0)" },
  },
  "nord": {
    label: "Nord", scheme: "dark",
    tokens: { bg: "#2e3440", bg2: "#3b4252", fg: "#d8dee9", bright: "#eceff4", dim: "#616e88", faint: "#4c566a", ok: "#a3be8c", err: "#bf616a", accent: "#88c0d0", line: "#3b4252", sel: "rgba(136,192,208,0.20)", scan: "rgba(0,0,0,0.26)", glow: "rgba(136,192,208,0.04)" },
  },
  "tokyo-night": {
    label: "Tokyo Night", scheme: "dark",
    tokens: { bg: "#1a1b26", bg2: "#24283b", fg: "#a9b1d6", bright: "#c0caf5", dim: "#565f89", faint: "#414868", ok: "#9ece6a", err: "#f7768e", accent: "#7aa2f7", line: "#2a2e42", sel: "rgba(122,162,247,0.20)", scan: "rgba(0,0,0,0.28)", glow: "rgba(122,162,247,0.04)" },
  },
  "catppuccin": {
    label: "Catppuccin Mocha", scheme: "dark",
    tokens: { bg: "#1e1e2e", bg2: "#313244", fg: "#cdd6f4", bright: "#eff1f5", dim: "#6c7086", faint: "#45475a", ok: "#a6e3a1", err: "#f38ba8", accent: "#94e2d5", line: "#313244", sel: "rgba(148,226,213,0.18)", scan: "rgba(0,0,0,0.26)", glow: "rgba(148,226,213,0.04)" },
  },
};

export const DEFAULT_THEME: ThemeId = "gruvbox";

/** Light/dark counterparts, so [F2] can flip the current palette's scheme. */
export const SIBLINGS: Partial<Record<ThemeId, ThemeId>> = {
  "gruvbox": "gruvbox-light",
  "gruvbox-light": "gruvbox",
  "one-dark": "one-light",
  "one-light": "one-dark",
  "monokai": "monokai-light",
  "monokai-light": "monokai",
  "amber": "amber-light",
  "amber-light": "amber",
};

export function isThemeId(value: string | null): value is ThemeId {
  return value != null && value in THEMES;
}

/** Write a theme's tokens onto :root as CSS variables (token "bg2" -> "--bg-2"). */
export function applyTheme(name: ThemeId, root: HTMLElement = document.documentElement): void {
  const theme = THEMES[name];
  if (!theme) return;
  for (const [key, value] of Object.entries(theme.tokens)) {
    const cssVar = "--" + (key === "bg2" ? "bg-2" : key);
    root.style.setProperty(cssVar, value);
  }
  root.style.colorScheme = theme.scheme;
  root.dataset.theme = name;
  root.dataset.scheme = theme.scheme;
}
