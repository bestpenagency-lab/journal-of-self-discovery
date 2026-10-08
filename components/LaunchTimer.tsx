"use client";

import { useEffect, useState } from "react";

const START_SECONDS = 1 * 3600 + 23 * 60 + 7;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function LaunchTimer({ compact = false }) {
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 1 ? START_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <span
      className={compact ? "launch-timer launch-timer--compact" : "launch-timer"}
      role="timer"
    >
      {!compact && (
        <span className="launch-timer-label">Ends in</span>
      )}
      <span className="launch-timer-digits">
        {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    </span>
  );
}