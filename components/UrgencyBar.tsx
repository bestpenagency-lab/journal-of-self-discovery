"use client";

import { useEffect, useState } from "react";

const START_SECONDS = 1 * 3600 + 23 * 60 + 7;
const STRIPE_LINK = "https://buy.stripe.com/7sYeVe3A41HublT20X9bO0a";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function UrgencyBar() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 1 ? START_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || !visible) return null;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="urgency-bar">
      <button
        type="button"
        className="urgency-close"
        aria-label="Dismiss"
        onClick={() => setClosed(true)}
      >
        ×
      </button>
      <span className="urgency-msg">
        Price returns to <strong>$29</strong> when the timer ends
      </span>
      <span className="launch-timer" role="timer">
        <span className="launch-timer-label">Ends in</span>
        <span className="launch-timer-digits">
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </span>
      <a
        href={STRIPE_LINK}
        className="urgency-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get It: $9.97 →
      </a>
    </div>
  );
}