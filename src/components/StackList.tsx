import { stackGroups } from "../content";
import { Prompt } from "./Prompt";

export function StackList() {
  return (
    <section className="block" id="stack">
      <Prompt command="ls ~/stack --grouped" />
      <div className="out stack">
        {stackGroups.map((group) => (
          <div className="grp" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
