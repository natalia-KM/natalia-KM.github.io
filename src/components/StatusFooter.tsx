import { identity } from "../content";
import { useClock } from "../hooks/useClock";

export function StatusFooter() {
  const time = useClock();

  return (
    <div className="status">
      <span className="mode">— READY —</span>
      <a href={`mailto:${identity.email}`}>{identity.email}</a>
      <span className="spacer" />
      <span className="hide-sm">UTF-8</span>
      <span className="hide-sm">{time}</span>
      <span>© {new Date().getFullYear()} NK</span>
    </div>
  );
}
