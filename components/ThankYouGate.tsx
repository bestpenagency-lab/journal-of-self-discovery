"use client";

import { useCallback, useEffect, useState } from "react";
import { IconCheck, IconDownload, IconEnvelope } from "@/components/Icons";

const PDF_FALLBACK = "/journal-of-self-discovery.pdf";

interface VerifyResult {
  ok: boolean;
  downloadUrl?: string | null;
  emailed?: boolean;
  purchaseEventId?: string;
  userData?: { em?: string; fn?: string; ln?: string; ph?: string };
}

function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : "";
}

function getClientId() {
  const KEY = "msl_client_id";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = `c_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

function firePurchase(result: VerifyResult) {
  const eventId = result.purchaseEventId;
  if (!eventId) return;

  const firedKey = `msl_purchase_fired_${eventId}`;
  try {
    if (sessionStorage.getItem(firedKey)) return;
    sessionStorage.setItem(firedKey, "1");
  } catch {}

  const payload: Record<string, unknown> = {
    event_name: "Purchase",
    event_id: eventId,
    value: 9.97,
    currency: "USD",
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    external_id: getClientId(),
  };
  if (result.userData?.em) payload.em = result.userData.em;
  if (result.userData?.fn) payload.fn = result.userData.fn;
  if (result.userData?.ln) payload.ln = result.userData.ln;
  if (result.userData?.ph) payload.ph = result.userData.ph;

  if (typeof window.fbq === "function") {
    window.fbq("track", "Purchase", { value: 9.97, currency: "USD" }, { eventID: eventId });
  }
  fetch("/api/meta-capi", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-relay-secret": process.env.NEXT_PUBLIC_META_CAPI_RELAY_SECRET ?? "",
    },
    body: JSON.stringify(payload),
  }).catch(() => {});
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

      if (data.ok) {
        firePurchase(data);
        if (data.downloadUrl) {
          setState({ status: "ready", url: data.downloadUrl, emailed: data.emailed === true });
          return;
        }
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