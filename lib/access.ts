import { createHash, createHmac, timingSafeEqual } from "crypto";

export const SITE_URL = "https://journal.mindshiftlabconsulting.com";
export const PDF_PATH = "/journal-of-self-discovery.pdf";

const KIT_TAG = "Journal Buyer";
const KIT_FIELD = "download_url";

interface KitResponse {
  ok: boolean;
  status: number;
  json: {
    tag?: { id?: number | string };
    subscriber?: { id?: number | string };
    warnings?: string[];
  };
}

function sign(value: string) {
  return createHmac("sha256", process.env.DELIVERY_LINK_SECRET ?? "")
    .update(value)
    .digest("hex");
}

export function signDownloadLink(email: string, sessionId: string) {
  const params = new URLSearchParams({
    e: email,
    s: sessionId,
    t: sign(`${email}|${sessionId}`),
  });
  return `${SITE_URL}/download?${params.toString()}`;
}

export function verifyDownloadLink(email: string, sessionId: string, token: string) {
  const expected = sign(`${email}|${sessionId}`);
  const a = Buffer.from(token ?? "");
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function purchaseEventId(sessionId: string) {
  return `stripe_${sessionId}`;
}

export interface HashedCustomer {
  em: string;
  fn: string;
  ln: string;
}

export function hashCustomer(email: string, name: string): HashedCustomer {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");
  return {
    em: email.trim() ? sha256(email.trim().toLowerCase()) : "",
    fn: firstName ? sha256(firstName.toLowerCase()) : "",
    ln: lastName ? sha256(lastName.toLowerCase()) : "",
  };
}

export async function sendCapiPurchase(sessionId: string, email: string, name: string) {
  const token = process.env.META_CONVERSATIONS_API_TOKEN ?? "";
  const PIXEL_ID = "3549766651863161";
  if (!token || !sessionId) return { ok: false, upstream: "not_configured" };

  const hashed = hashCustomer(email, name);
  const user_data: Record<string, string> = {};
  if (hashed.em) user_data.em = hashed.em;
  if (hashed.fn) user_data.fn = hashed.fn;
  if (hashed.ln) user_data.ln = hashed.ln;

  const url = new URL(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`);
  url.searchParams.set("access_token", token);
  const test = process.env.META_TEST_EVENT_CODE?.trim();
  if (test) url.searchParams.set("test_event_code", test);

  const event = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: purchaseEventId(sessionId),
    action_source: "website",
    user_data,
    custom_data: {
      value: 9.97,
      currency: "USD",
      content_name: "Journal of Self-Discovery",
      content_type: "product",
    },
  };

  let upstream = "";
  let ok = false;
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });
    upstream = await res.text();
    ok = res.ok;
  } catch (error) {
    upstream = error instanceof Error ? error.message : "fetch_failed";
  }
  return { ok, upstream };
}

export async function getStripeSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (!key) return null;

  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const session: {
    payment_status?: string;
    customer_details?: { email?: string; name?: string } | null;
  } = await res.json();

  return session;
}

async function kitRequest(path: string, init?: RequestInit): Promise<KitResponse> {
  const key = process.env.KIT_API_KEY ?? "";
  const res = await fetch(`https://api.kit.com${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": key,
      ...(init?.headers ?? {}),
    },
  });
  const json = (await res.json().catch(() => null)) ?? {};
  return { ok: res.ok, status: res.status, json };
}

interface KitDeliveryResult {
  ok: boolean;
  fieldConfigured: boolean;
}

export async function deliverToKit(email: string, downloadLink: string): Promise<KitDeliveryResult> {
  const tag = await kitRequest("/v4/tags", {
    method: "POST",
    body: JSON.stringify({ name: KIT_TAG }),
  });
  const tagId = tag.json.tag?.id;
  if (!tagId) return { ok: false, fieldConfigured: false };

  const subscriber = await kitRequest("/v4/subscribers", {
    method: "POST",
    body: JSON.stringify({
      email_address: email,
      fields: { [KIT_FIELD]: downloadLink },
    }),
  });
  const subscriberId = subscriber.json.subscriber?.id;
  if (!subscriberId) return { ok: false, fieldConfigured: false };

  const warnings = subscriber.json.warnings ?? [];
  const fieldConfigured = !warnings.some((w) => w.toLowerCase().includes("download_url"));

  const tagged = await kitRequest(`/v4/tags/${tagId}/subscribers/${subscriberId}`, {
    method: "POST",
  });

  return { ok: tagged.ok, fieldConfigured };
}