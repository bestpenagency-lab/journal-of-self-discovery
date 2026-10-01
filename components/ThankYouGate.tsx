"use client";

import { useCallback, useEffect, useState } from "react";
import { IconCheck, IconDownload, IconEnvelope } from "@/components/Icons";

const PDF_FALLBACK = "/journal-of-self-discovery.pdf";

interface VerifyResult {
  ok: boolean;
  downloadUrl?: string | null;
  emailed?: boolean;
}

type GateState =
  | { status: "loading" }
  | { status: "missing"; url: string }
  | { status: "ready"; url: string; emailed: boolean }
  | { status: "error"; message: string };

export default function ThankYouGate() {
  const [state, setState] = useState<GateState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const verify = useCallback(async () => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      queueMicrotask(() => setState({ status: "missing", url: PDF_FALLBACK }));
      return;
    }

    try {
      const res = await fetch("/api/verify-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = (await res.json()) as VerifyResult;

      if (data.ok && data.downloadUrl) {
        setState({ status: "ready", url: data.downloadUrl, emailed: data.emailed === true });
        return;
      }
      if (data.ok && !data.downloadUrl) {
        setState({ status: "ready", url: PDF_FALLBACK, emailed: false });
        return;
      }
      setState({ status: "error", message: "We couldn't confirm your payment yet." });
    } catch {
      setState({ status: "error", message: "Something went wrong verifying your payment." });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void verify();
  }, [verify, attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  return (
    <div className="ty-gate">
      {state.status === "loading" && (
        <>
          <span className="cta-btn cta-btn--large download-btn download-btn--disabled" aria-disabled="true">
            <IconDownload size={20} color="#fff" strokeWidth={1.8} />
            Checking your payment...
          </span>
          <p className="ty-note">
            <IconEnvelope size={16} color="var(--purple-light)" strokeWidth={1.8} />
            <span>Confirming a moment, then your journal unlocks below and in your inbox.</span>
          </p>
        </>
      )}

      {(state.status === "ready" || state.status === "missing") && (
        <>
          <a href={state.url} download className="cta-btn cta-btn--large download-btn">
            <IconDownload size={20} color="#fff" strokeWidth={1.8} />
            Download Now
          </a>
          {state.status === "missing" ? (
            <p className="ty-note">
              <IconCheck size={16} color="var(--purple-light)" strokeWidth={1.8} />
              <span>Congratulations, your Journal of Self-Discovery is ready to download.</span>
            </p>
          ) : state.emailed ? (
            <p className="ty-note">
              <IconEnvelope size={16} color="var(--purple-light)" strokeWidth={1.8} />
              <span>A backup copy has also been sent to your email.</span>
            </p>
          ) : (
            <p className="ty-note">
              <IconCheck size={16} color="var(--purple-light)" strokeWidth={1.8} />
              <span>Your Journal of Self-Discovery is ready to download.</span>
            </p>
          )}
        </>
      )}

      {state.status === "error" && (
        <>
          <button type="button" onClick={retry} className="cta-btn cta-btn--large download-btn">
            <IconDownload size={20} color="#fff" strokeWidth={1.8} />
            Try again
          </button>
          <p className="ty-note">
            <IconEnvelope size={16} color="var(--purple-light)" strokeWidth={1.8} />
            <span>{state.message} If it keeps failing, check your email for a copy of your journal.</span>
          </p>
        </>
      )}
    </div>
  );
}