import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { identity } from "../content";
import { isThemeId, SIBLINGS, THEMES, type ThemeId } from "../themes";

interface Props {
  themeId: ThemeId;
  scanOn: boolean;
  onFlipScheme: () => void;
  onToggleScan: () => void;
  onSetTheme: (id: ThemeId) => void;
  onCycleTheme: (dir?: 1 | -1) => void;
}

interface EchoLine {
  id: number;
  html: string;
}

const THEME_IDS = Object.keys(THEMES) as ThemeId[];

const HELP = [
  "available commands —",
  "  <span class='hl'>about</span> <span class='hl'>stack</span> <span class='hl'>work</span> <span class='hl'>contact</span> <span class='hl'>whoami</span>   jump to a section",
  "  <span class='hl'>github</span> <span class='hl'>linkedin</span> <span class='hl'>email</span>              open a link",
  "  <span class='hl'>theme &lt;name&gt;</span> <span class='hl'>themes</span> <span class='hl'>light</span> <span class='hl'>dark</span>    palette / scheme",
  "  <span class='hl'>scan</span> <span class='hl'>neofetch</span> <span class='hl'>date</span> <span class='hl'>pwd</span> <span class='hl'>clear</span>     system",
  "  <span class='hl'>[F1]</span> scanlines · <span class='hl'>[F2]</span> light/dark · <span class='hl'>[F3]</span> next theme",
  "  this is most of them — the rest are just hidden.",
].join("\n");

const NEOFETCH = [
  "<span class='hl'>natalia@nk-os</span>",
  "-----------------",
  "<span class='hl'>os</span>      NK-OS 1.0.4",
  "<span class='hl'>host</span>    Leicester, UK",
  "<span class='hl'>role</span>    full-stack software engineer",
  "<span class='hl'>stack</span>   react · typescript · java · python",
  "<span class='hl'>shell</span>   zsh (nk-os edition)",
  "<span class='hl'>status</span>  <span class='ok'>online</span>",
].join("\n");

// Easter-egg response pools — one is picked at random each time.
const COFFEE = [
  "that's outside my scope.",
  "I only do that for people I've met.",
  "I run on it too — you're on your own.",
];
const IMPRESS = [
  "you did scroll all the way down here.",
  "scroll up — that was the whole pitch.",
];
const SUDO = [
  "permission denied.",
  "that won't get you far here.",
  "admin of what, exactly? it's a homepage.",
];
const EXIT = [
  "it's a single page — nowhere to exit to.",
  "you can leave; the tab won't.",
  "no exit — that's kind of the point of a homepage.",
];
const pick = (options: string[]): string => options[Math.floor(Math.random() * options.length)];

/** The live terminal at the bottom: an input plus an echo log of results. */
export function CommandLine({
  themeId,
  scanOn,
  onFlipScheme,
  onToggleScan,
  onSetTheme,
  onCycleTheme,
}: Props) {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<EchoLine[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [inputWidth, setInputWidth] = useState(4);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureCanvas = useRef<HTMLCanvasElement | null>(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Size the input to its content so the block cursor tracks the typed text.
  // Canvas measurement has no layout side-effects (an off-screen DOM measurer
  // can extend the page and make the scroll position jump on clear).
  useLayoutEffect(() => {
    const canvas = (measureCanvas.current ??= document.createElement("canvas"));
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setInputWidth(value.length * 9 + 8);
      return;
    }
    ctx.font = '15px "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
    setInputWidth(Math.ceil(ctx.measureText(value).width) + 8);
  }, [value]);

  const print = useCallback((html: string, cls?: string) => {
    setShowHint(false);
    setLines((prev) => [
      ...prev,
      { id: idRef.current++, html: cls ? `<span class="${cls}">${html}</span>` : html },
    ]);
  }, []);

  const go = useCallback(
    (selector: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      print(`<span class="hl">%</span> ${trimmed.replace(/</g, "&lt;")}`);

      const lower = trimmed.toLowerCase();
      const base = lower.split(/\s+/)[0];
      const arg = lower.slice(base.length).trim();

      // ---- easter eggs (hidden; responses shuffled) ----
      if (lower === "make me a coffee" || lower === "sudo make me a coffee") {
        print(pick(COFFEE));
        return;
      }
      if (lower === "impress me") {
        print(pick(IMPRESS));
        return;
      }
      if (lower === "sudo") {
        print(pick(SUDO));
        return;
      }

      // ---- commands that take an argument ----
      if (base === "echo") {
        print(rest(trimmed).replace(/</g, "&lt;") || " ");
        return;
      }
      if (base === "theme") {
        if (!arg) {
          onFlipScheme();
          print(`→ scheme: ${SIBLINGS[themeId] ?? themeId}`);
        } else if (arg === "next") {
          onCycleTheme(1);
          print("→ next theme");
        } else if (arg === "prev") {
          onCycleTheme(-1);
          print("→ prev theme");
        } else if (isThemeId(arg)) {
          onSetTheme(arg);
          print(`→ theme: ${THEMES[arg].label}`);
        } else {
          print(`unknown theme: ${arg.replace(/</g, "&lt;")} — try \`themes\``, "er");
        }
        return;
      }

      // ---- simple commands ----
      const table: Record<string, () => string | null> = {
        help: () => HELP,
        about: () => (go("#about"), "→ about.txt"),
        stack: () => (go("#stack"), "→ ~/stack"),
        ls: () => (go("#work"), "→ ~/work"),
        work: () => (go("#work"), "→ ~/work"),
        projects: () => (go("#work"), "→ ~/work"),
        contact: () => (go("#contact"), "→ contact.sh"),
        email: () => {
          location.href = `mailto:${identity.email}`;
          return "→ opening mail…";
        },
        github: () => {
          window.open(identity.github, "_blank", "noopener");
          return `→ ${identity.githubLabel}`;
        },
        linkedin: () => {
          window.open(identity.linkedin, "_blank", "noopener");
          return `→ ${identity.linkedinLabel}`;
        },
        themes: () =>
          "themes: " +
          THEME_IDS.map((id) => `<span class='hl'>${id}</span>`).join(" · ") +
          "\nusage: <span class='hl'>theme &lt;name&gt;</span>",
        light: () => {
          if (THEMES[themeId].scheme !== "light") onFlipScheme();
          return "→ scheme: light";
        },
        dark: () => {
          if (THEMES[themeId].scheme !== "dark") onFlipScheme();
          return "→ scheme: dark";
        },
        scan: () => {
          onToggleScan();
          return `→ scanlines ${scanOn ? "off" : "on"}`;
        },
        scanlines: () => {
          onToggleScan();
          return `→ scanlines ${scanOn ? "off" : "on"}`;
        },
        neofetch: () => NEOFETCH,
        pwd: () => "/home/natalia",
        date: () => new Date().toString(),
        whoami: () => (go("#whoami"), "natalia kmiecik — full-stack software engineer"),
        clear: () => {
          setLines([]);
          setShowHint(true);
          return null;
        },
        top: () => (go("#whoami"), "→ top"),
        itinerary: () => (go("#p-itinerary"), "→ itinerary-hub"),
        "itinerary-hub": () => (go("#p-itinerary"), "→ itinerary-hub"),
        "should-i-buy-it": () => (go("#p-sib"), "→ should-i-buy-it"),
        sib: () => (go("#p-sib"), "→ should-i-buy-it"),
        "invoicing-platform": () => (go("#work"), "→ invoicing-platform <span class='er'>[private]</span>"),
        "market-data-dashboard": () => (go("#work"), "→ market-data-dashboard <span class='er'>[private]</span>"),
        "merchant-ops-suite": () => (go("#work"), "→ merchant-ops-suite <span class='er'>[private]</span>"),
        exit: () => pick(EXIT),
      };

      const fn = table[lower] ?? table[base];
      if (fn) {
        const out = fn();
        if (out) print(out);
      } else {
        print(`nk-os: command not found: ${base.replace(/</g, "&lt;")} — try \`help\``, "er");
      }
    },
    [print, go, onFlipScheme, onToggleScan, onSetTheme, onCycleTheme, themeId, scanOn],
  );

  return (
    <section className="block" id="prompt">
      <div className="live" onClick={() => inputRef.current?.focus()}>
        <label htmlFor="cmd">
          <span className="u">{identity.user}</span>@<span className="h">{identity.host}</span>{" "}
          <span className="p">~</span> %
        </label>
        <input
          ref={inputRef}
          id="cmd"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="terminal command input"
          value={value}
          style={{ width: `${inputWidth}px` }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              run(value);
              setValue("");
            }
          }}
        />
        <span className="cursor" />
      </div>
      <div id="echo">
        {showHint && (
          <span className="cmt" style={{ display: "block" }}>
            type `help` for commands — or just scroll
          </span>
        )}
        {lines.map((line) => (
          <div className="r" key={line.id} dangerouslySetInnerHTML={{ __html: line.html }} />
        ))}
      </div>
    </section>
  );
}

/** Text after the first word (preserves original casing for `echo`). */
function rest(raw: string): string {
  const t = raw.trim();
  const i = t.search(/\s/);
  return i === -1 ? "" : t.slice(i + 1).trim();
}
