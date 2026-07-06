import { useBoot } from "../hooks/useBoot";

/** The boot-sequence <pre>. Lines carry inline HTML (the [ok] / ready spans). */
export function Boot() {
  const html = useBoot();
  return <pre id="boot" dangerouslySetInnerHTML={{ __html: html }} />;
}
