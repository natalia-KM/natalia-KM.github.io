import { useCallback, useEffect, useState } from "react";
import { applyTheme, DEFAULT_THEME, isThemeId, SIBLINGS, THEMES, type ThemeId } from "../themes";

const STORAGE_KEY = "nkos-theme";
const THEME_IDS = Object.keys(THEMES) as ThemeId[];

/**
 * Owns the active theme id. Applies it to :root (inline CSS vars) and persists
 * it. `flipScheme` swaps the current palette for its light/dark sibling, which
 * is what [F2] and the `theme` command do.
 */
export function useNkTheme() {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isThemeId(stored)) return stored;
    } catch {
      /* ignore */
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    applyTheme(themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      /* ignore */
    }
  }, [themeId]);

  const flipScheme = useCallback(() => {
    setThemeId((current) => SIBLINGS[current] ?? current);
  }, []);

  const cycleTheme = useCallback((dir: 1 | -1 = 1) => {
    setThemeId((current) => {
      const i = THEME_IDS.indexOf(current);
      return THEME_IDS[(i + dir + THEME_IDS.length) % THEME_IDS.length];
    });
  }, []);

  return { themeId, setThemeId, flipScheme, cycleTheme };
}
