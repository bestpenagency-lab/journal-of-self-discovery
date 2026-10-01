import { createHmac, timingSafeEqual } from "crypto";

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
    customer_details?: { email?: string } | null;
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