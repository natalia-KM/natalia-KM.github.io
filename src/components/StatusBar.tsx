import { identity } from "../content";
import { THEMES, type ThemeId } from "../themes";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface Props {
  themeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  onFlipScheme: () => void;
  onToggleScan: () => void;
}

export function StatusBar({ themeId, onSelectTheme, onFlipScheme, onToggleScan }: Props) {
  const scheme = THEMES[themeId].scheme;

  return (
    <div className="bar">
      <span className="id">
        <b>NK</b>-OS
      </span>
      <span className="dims">
        {identity.user}@{identity.host}: ~
      </span>
      <span className="spacer" />
      <button type="button" title="Toggle scanlines" onClick={onToggleScan}>
        <b>[F1]</b>scanlines
      </button>
      <button type="button" title="Flip light / dark" onClick={onFlipScheme}>
        <b>[F2]</b>
        {scheme}
      </button>
      <ThemeSwitcher themeId={themeId} onSelect={onSelectTheme} />
    </div>
  );
}
