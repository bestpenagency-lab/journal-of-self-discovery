"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "3549766651863161";
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
  const readyRef = useRef(false);
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
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (readyRef.current) {
      track("PageView");
    }
  }, [pathname]);

  useEffect(() => {
    if (!readyRef.current) return;
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

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        onLoad={() => {
          readyRef.current = true;
          if (pathname === "/") fireLeadOnce();
          if (pathname === "/thank-you") firePurchaseOnce();
        }}
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}