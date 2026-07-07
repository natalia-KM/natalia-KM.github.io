import { identity } from "../content";
import { Prompt } from "./Prompt";

export function Whoami() {
  return (
    <section className="block" id="whoami">
      <Prompt command="whoami" />
      <div className="out">
        <div className="name">
          {identity.nameLines[0]}
          <br />
          {identity.nameLines[1]}
        </div>
        <p className="tagline">
          {identity.role}
          <br />
          <span className="loc">
            /* {identity.location} - {identity.student} */
          </span>
        </p>
      </div>
    </section>
  );
}
