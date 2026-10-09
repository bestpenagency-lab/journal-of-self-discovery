"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : "";
}

const PURCHASE_VALUE = 9.97;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function track(type: string, data?: unknown, options?: { eventID?: string }) {
  if (typeof window.fbq === "function") {
    window.fbq("track", type, data, options);
  }
}

function uid(prefix: string) {
  const raw =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${raw}`;
}

function getClientId() {
  const KEY = "msl_client_id";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = uid("c");
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

const LEAD_KEY = "msl_pixel_lead";
const VIEW_KEY = "msl_pixel_view";

function relayEvent(payload: Record<string, unknown>) {
  fetch("/api/meta-capi", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-relay-secret": process.env.NEXT_PUBLIC_META_CAPI_RELAY_SECRET ?? "",
    },
    body: JSON.stringify({
      event_source_url:
        typeof window !== "undefined" ? window.location.href : undefined,
      ...payload,
    }),
  }).catch(() => {});
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  const fireLeadOnce = () => {
    if (sessionStorage.getItem(LEAD_KEY)) return;
    sessionStorage.setItem(LEAD_KEY, "1");
    const eventId = uid("l");

    track("Lead", undefined, { eventID: eventId });
    relayEvent({
      event_name: "Lead",
      event_id: eventId,
      external_id: getClientId(),
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    });
  };

  const fireViewOnce = () => {
    if (sessionStorage.getItem(VIEW_KEY)) return;
    sessionStorage.setItem(VIEW_KEY, "1");
    const eventId = uid("v");

    track(
      "ViewContent",
      {
        value: PURCHASE_VALUE,
        currency: "USD",
        content_name: "Journal of Self-Discovery",
        content_type: "product",
      },
      { eventID: eventId }
    );
    relayEvent({
      event_name: "ViewContent",
      event_id: eventId,
      value: PURCHASE_VALUE,
      currency: "USD",
      external_id: getClientId(),
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    });
  };

  useEffect(() => {
    if (pathname === "/") fireViewOnce();
    if (pathname === "/") fireLeadOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    track("PageView");
    if (pathname === "/") fireViewOnce();
    if (pathname === "/") fireLeadOnce();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest?.('a[href*="buy.stripe.com"]')) return;

      const addId = uid("a");
      const initId = uid("i");
      const fbp = getCookie("_fbp");
      const fbc = getCookie("_fbc");
      const external_id = getClientId();

      track("AddToCart", undefined, { eventID: addId });
      relayEvent({
        event_name: "AddToCart",
        event_id: addId,
        external_id,
        fbp,
        fbc,
      });

      track(
        "InitiateCheckout",
        { value: PURCHASE_VALUE, currency: "USD" },
        { eventID: initId }
      );
      relayEvent({
        event_name: "InitiateCheckout",
        event_id: initId,
        value: PURCHASE_VALUE,
        currency: "USD",
        external_id,
        fbp,
        fbc,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}