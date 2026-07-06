import { THEMES, type ThemeId } from "../themes";

/* Live theme picker in the top bar. Also cyclable with [F3] / Shift+[F3],
   or `theme <name>` in the terminal. */
interface Props {
  themeId: ThemeId;
  onSelect: (id: ThemeId) => void;
}

export function ThemeSwitcher({ themeId, onSelect }: Props) {
  return (
    <select
      aria-label="Theme"
      title="Theme — or press [F3] to cycle"
      value={themeId}
      onChange={(e) => onSelect(e.target.value as ThemeId)}
    >
      {(Object.keys(THEMES) as ThemeId[]).map((id) => (
        <option key={id} value={id}>
          {THEMES[id].label}
        </option>
      ))}
    </select>
  );
}
