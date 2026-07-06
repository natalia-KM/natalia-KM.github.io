import { aboutHtml } from "../content";
import { Prompt } from "./Prompt";

export function About() {
  return (
    <section className="block" id="about">
      <Prompt command="cat about.txt" />
      <div className="out prose">
        <p dangerouslySetInnerHTML={{ __html: aboutHtml.lead }} />
        <p className="cmt">{aboutHtml.note}</p>
      </div>
    </section>
  );
}
