import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "nkos-scan";

/** CRT scanline overlay on/off, persisted. Toggled by [F1] and the `scan` command. */
export function useScanlines() {
  const [on, setOn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);

  return { on, toggle };
}
