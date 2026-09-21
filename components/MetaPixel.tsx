"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PURCHASE_VALUE = 9.97;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function track(type: string, data?: unknown) {
  if (typeof window.fbq === "function") {
    window.fbq("track", type, data);
  }
}

const LEAD_KEY = "msl_pixel_lead";
const PURCHASE_KEY = "msl_pixel_purchase";

export default function MetaPixel() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  const fireLeadOnce = () => {
    if (!sessionStorage.getItem(LEAD_KEY)) {
      sessionStorage.setItem(LEAD_KEY, "1");
      track("Lead");
    }
  };

  const firePurchaseOnce = () => {
    if (!sessionStorage.getItem(PURCHASE_KEY)) {
      sessionStorage.setItem(PURCHASE_KEY, "1");
      track("Purchase", { value: PURCHASE_VALUE, currency: "USD" });
    }
  };

  useEffect(() => {
    // The base code already fired PageView on init for the first route,
    // so only fire the page-specific conversion events on mount.
    if (pathname === "/") fireLeadOnce();
    if (pathname === "/thank-you") firePurchaseOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    track("PageView");
    if (pathname === "/") fireLeadOnce();
    if (pathname === "/thank-you") firePurchaseOnce();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest?.('a[href*="buy.stripe.com"]')) return;
      track("AddToCart");
      track("InitiateCheckout", { value: PURCHASE_VALUE, currency: "USD" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}