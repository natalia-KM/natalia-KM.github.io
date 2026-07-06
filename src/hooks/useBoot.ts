import { useEffect, useState } from "react";
import { bootLines } from "../content";

const SESSION_KEY = "nkos-booted";

/**
 * Returns the boot-sequence text, typed out line by line on first visit.
 * Instant if prefers-reduced-motion or already shown this session.
 * Builds from a slice each tick, so it's idempotent under StrictMode.
 */
export function useBoot(): string {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let booted = false;
    try {
      booted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }

    if (reduce || booted) {
      setHtml(bootLines.join("\n"));
      return;
    }

    let i = 0;
    let timer = 0;
    const step = () => {
      setHtml(bootLines.slice(0, i + 1).join("\n"));
      i += 1;
      if (i < bootLines.length) {
        timer = window.setTimeout(step, i === 1 ? 120 : 130);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
      }
    };
    step();

    return () => window.clearTimeout(timer);
  }, []);

  return html;
}
