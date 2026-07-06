import { identity } from "../content";

/** Reusable `natalia@nk-os ~ %` command line, used as each section's header. */
export function Prompt({ command }: { command: string }) {
  return (
    <p className="cmd">
      <span className="u">{identity.user}</span>
      <span className="s">@</span>
      <span className="h">{identity.host}</span>{" "}
      <span className="p">~</span> <span className="s">%</span>{" "}
      <span className="c">{command}</span>
    </p>
  );
}
