import { identity } from "../content";
import { Prompt } from "./Prompt";

export function Contact() {
  return (
    <section className="block" id="contact">
      <Prompt command="./contact.sh" />
      <div className="out contact">
        <a href={`mailto:${identity.email}`}>
          <b>email</b>
          {identity.email}
        </a>
        <a href={identity.github} target="_blank" rel="noopener">
          <b>github</b>
          {identity.githubLabel}
        </a>
        <a href={identity.linkedin} target="_blank" rel="noopener">
          <b>linkedin</b>
          {identity.linkedinLabel}
        </a>
      </div>
    </section>
  );
}
