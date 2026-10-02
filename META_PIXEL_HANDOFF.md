# Meta Pixel + Conversions API: Developer Handoff

**Project:** Journal of Self-Discovery (Mind Shift Lab / Lucia Giammarco Granier)
**Current staging:** https://journal-landing-umber.vercel.app
**Repo:** https://github.com/bestpenagency-lab/journal-of-self-discovery
**Stack:** Next.js (App Router) + Vercel. Two routes: `/` (landing) and `/thank-you` (post-purchase download).

---

## 0. Fill this in before sending

Replace every `<< >>` placeholder below with the real value from Meta Events Manager.

| Placeholder | Value to paste | Where to find it in Meta |
|---|---|---|
| `<<PIXEL_ID>>` |  | Events Manager > Data Sources > your Pixel > Settings |
| `<<TEST_EVENT_CODE>>` |  | Events Manager > Test Events tab |
| `<<ACCESS_TOKEN>>` |  | Pixel Settings > Conversions API > Generate access token (SECRET, server-side only) |
| `<<DOMAIN_VERIFICATION_TAG>>` |  | Brand Safety > Domains > Add domain > Verify with meta tag |
| `<<DOMAIN_VERIFICATION_TXT>>` |  | Same screen > Verify with DNS (preferred if you control DNS) |

**Security rule:** `<<ACCESS_TOKEN>>` is a secret. It must live in server environment variables only, never in client code, and be shared through a secure channel.

---

## 1. Goal

Track the full funnel for paid Meta traffic:

```
Ad click  ->  /  (landing)  ->  Buy Now (Stripe)  ->  /thank-you  ->  Download
```

Events required: `PageView`, `Lead`, `InitiateCheckout`, `Purchase` (see map in section 3).

---

## 2. Base pixel (every page, both routes)

Create `components/MetaPixel.tsx`. This is a client component that loads the base pixel once and re-fires `PageView` on every route change (required because Next.js App Router is a single-page app).

```tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "<<PIXEL_ID>>";

export default function MetaPixel() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return; // base script already fired the initial PageView
    }
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL_ID}');
            fbq('track','PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
```

Mount it once in `app/layout.tsx`:

```tsx
import MetaPixel from "@/components/MetaPixel";

// inside <body>
<MetaPixel />
{children}
```

---

## 3. Event map (what fires where)

| Event | Trigger | Where | Payload |
|---|---|---|---|
| `PageView` | Every page load + route change | Global (layout) | none |
| `Lead` | User clicks the main CTA / any lead form | Landing `/` | none |
| `InitiateCheckout` | User clicks "Buy Now" (goes to Stripe) | Landing `/` | `{value:9.97, currency:"USD", content_name:"Journal of Self-Discovery", content_type:"product"}` |
| `Purchase` | Once, on successful return | `/thank-you` | `{value:9.97, currency:"USD", content_name:"Journal of Self-Discovery", content_type:"product"}` |

Rules:
- Fire `Purchase` exactly once. Guard against refresh and back-button double counts.
- Do not rely on the anchor tag being clicked; fire on the page view of `/thank-you` plus server-side (section 5).

---

## 4. Firing `Lead` and `InitiateCheckout` on the landing CTA

The landing CTA is an anchor to the Stripe Payment Link. Add an `onClick` handler (the section stays a client component or the CTA becomes a small client child):

```tsx
"use client";

function track(evt: string, data?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq === "function") fbq("track", evt, data);
}

// On the "Buy Now" anchor:
onClick={() =>
  track("InitiateCheckout", {
    value: 9.97,
    currency: "USD",
    content_name: "Journal of Self-Discovery",
    content_type: "product",
  })
}
```

Use `track("Lead")` on any email capture or secondary CTA.

---

## 5. Reliable Purchase tracking (Conversions API, recommended)

Browser-only `Purchase` loses 15-30% of conversions (iOS ATT, ad blockers). Send the purchase **server-side** with the Conversions API, from the real Stripe payment event.

Two options, easiest first:

1. **Stripe native integration / Zapier-Make:** connect Stripe to Meta so a paid checkout sends the Purchase event. Fastest, no code.
2. **Stripe webhook -> Next.js API route -> Meta CAPI:** add `app/api/meta-purchase/route.ts` that receives the Stripe `checkout.session.completed` event and POSTs to:
   `https://graph.facebook.com/v21.0/<<PIXEL_ID>>/events?access_token=<<ACCESS_TOKEN>>`
   with `event_name: "Purchase"`, `event_time`, `event_id` (for deduplication), `action_source: "website"`, and hashed user data (email/phone via SHA-256).

If you use both browser and server, send the **same `event_id`** so Meta deduplicates instead of double counting.

---

## 6. Domain verification (required for iOS + Aggregated Event Measurement)

1. Events Manager > Brand Safety > Domains > Add your production domain.
2. Verify either by DNS TXT record (preferred) or by placing this in `app/layout.tsx` `<head>`:

```tsx
<meta name="facebook-domain-verification" content="<<DOMAIN_VERIFICATION_TAG>>" />
```

3. After verification, set **Purchase** as the top-priority event in Aggregated Event Measurement.

---

## 7. Hosting notes (for the production domain move)

- Point the production domain to this Vercel project and redeploy.
- Update the **Stripe Payment Link** redirect after payment to `https://<PRODUCTION_DOMAIN>/thank-you`.
- Keep the download file at `/journal-of-self-discovery.pdf`. It is already served with `Content-Disposition: attachment` (configured in `next.config.ts`), which forces a real device download on mobile. Do not remove that header.
- `<<PIXEL_ID>>` is public and safe in client code. `<<ACCESS_TOKEN>>` is secret: server env vars only, never committed to git.

---

## 8. Verification checklist (before marking done)

1. Install the **Meta Pixel Helper** extension. Load `/` and confirm one `PageView`.
2. Use Events Manager > **Test Events** with `<<TEST_EVENT_CODE>>`. Walk the funnel and confirm the order:
   `PageView` -> `Lead` / `InitiateCheckout` -> `Purchase`.
3. Do one real test purchase. Confirm exactly **one** `Purchase` with `value: 9.97` and `currency: USD`.
4. Navigate between `/` and `/thank-you` and confirm a fresh `PageView` fires each time.
5. If CAPI is enabled, confirm the event appears under both Browser and Server with the same `event_id` (deduplicated).
6. Turn off Test mode, then confirm events still register live.
7. Set **Purchase** as top priority under Aggregated Event Measurement.

---

## 9. What "done" looks like

- One pixel load, no duplicate events.
- `PageView` on every route.
- `InitiateCheckout` on Buy Now, `Purchase` on thank-you (browser + server, deduplicated).
- Domain verified, Purchase prioritized, Test Events passing.
- No secrets in frontend code or git history.
