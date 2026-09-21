import { createHash } from "crypto";
import { NextResponse } from "next/server";

const PIXEL_ID = "3549766651863161";
const ACCESS_TOKEN = process.env.META_CONVERSATIONS_API_TOKEN ?? "";
const RELAY_SECRET = process.env.NEXT_PUBLIC_META_CAPI_RELAY_SECRET ?? "";

const ALLOWED_EVENTS = new Set([
  "Purchase",
  "Lead",
  "AddToCart",
  "InitiateCheckout",
]);

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function POST(request: Request) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  if (request.headers.get("x-relay-secret") !== RELAY_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: {
    event_name?: string;
    event_id?: string;
    value?: number;
    currency?: string;
    email?: string;
    test_event_code?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { event_name, event_id, value, currency, email, test_event_code } = body;

  if (!event_name || !ALLOWED_EVENTS.has(event_name) || !event_id) {
    return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
  }

  const user_data: Record<string, string> = {};
  if (typeof email === "string" && email.trim()) {
    user_data.em = sha256(email.trim().toLowerCase());
  }

  const event = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    action_source: "website",
    user_data,
    custom_data: {
      value: typeof value === "number" ? value : 0,
      currency: currency ?? "USD",
      content_name: "Journal of Self-Discovery",
      content_type: "product",
    },
  };

  const url = new URL(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`);
  url.searchParams.set("access_token", ACCESS_TOKEN);
  if (typeof test_event_code === "string" && test_event_code.trim()) {
    url.searchParams.set("test_event_code", test_event_code.trim());
  }

  const upstream = await fetch(url.toString(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ data: [event] }),
  });

  const text = await upstream.text();
  return NextResponse.json({ ok: upstream.ok, upstream: text });
}