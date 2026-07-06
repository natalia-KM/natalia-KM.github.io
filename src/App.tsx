import { useEffect } from "react";
import { StatusBar } from "./components/StatusBar";
import { Boot } from "./components/Boot";
import { Whoami } from "./components/Whoami";
import { About } from "./components/About";
import { StackList } from "./components/StackList";
import { Work } from "./components/Work";
import { Contact } from "./components/Contact";
import { CommandLine } from "./components/CommandLine";
import { StatusFooter } from "./components/StatusFooter";
import { useNkTheme } from "./hooks/useNkTheme";
import { useScanlines } from "./hooks/useScanlines";

export default function App() {
  const { themeId, setThemeId, flipScheme, cycleTheme } = useNkTheme();
  const { on: scanOn, toggle: toggleScan } = useScanlines();

  // Global shortcuts: F1 scanlines · F2 light/dark · F3 next theme (Shift = prev).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        toggleScan();
      } else if (e.key === "F2") {
        e.preventDefault();
        flipScheme();
      } else if (e.key === "F3") {
        e.preventDefault();
        cycleTheme(e.shiftKey ? -1 : 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [flipScheme, toggleScan, cycleTheme]);

  return (
    <div className={scanOn ? "crt" : "crt noscan"}>
      <StatusBar
        themeId={themeId}
        onSelectTheme={setThemeId}
        onFlipScheme={flipScheme}
        onToggleScan={toggleScan}
      />
      <main>
        <Boot />
        <Whoami />
        <About />
        <StackList />
        <Work />
        <Contact />
        <CommandLine
          themeId={themeId}
          scanOn={scanOn}
          onFlipScheme={flipScheme}
          onToggleScan={toggleScan}
          onSetTheme={setThemeId}
          onCycleTheme={cycleTheme}
        />
      </main>
      <StatusFooter />
    </div>
  );
}
