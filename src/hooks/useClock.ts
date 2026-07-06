import { useEffect, useState } from "react";

const now = () => new Date().toTimeString().slice(0, 8);

/** Live HH:MM:SS clock for the bottom status line. */
export function useClock(): string {
  const [time, setTime] = useState(now);

  useEffect(() => {
    const id = window.setInterval(() => setTime(now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
