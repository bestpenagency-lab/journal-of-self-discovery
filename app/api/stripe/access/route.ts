import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { deliverToKit, sendCapiPurchase, signDownloadLink } from "@/lib/access";

interface CheckoutEvent {
  type?: string;
  data?: {
    object?: {
      id?: string;
      payment_status?: string;
      customer_details?: { email?: string; name?: string } | null;
    };
  };
}

function verifySignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  if (!secret || !signatureHeader) return false;

  const parts = new Map<string, string>();
  for (const piece of signatureHeader.split(",")) {
    const [key, ...rest] = piece.split("=");
    parts.set(key, rest.join("="));
  }

  const timestamp = parts.get("t");
  const signature = parts.get("v1");
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (Number.isNaN(age) || age > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const received = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  return received.length === wanted.length && timingSafeEqual(received, wanted);
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!verifySignature(rawBody, request.headers.get("stripe-signature"))) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }

  let event: CheckoutEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true, received: true, ignored: true });
  }

  const session = event.data?.object ?? {};
  if (session.payment_status !== "paid") {
    return NextResponse.json({ ok: true, received: true, skipped: "not_paid" });
  }

  const email = session.customer_details?.email?.trim() ?? "";
  if (!email || !session.id) {
    return NextResponse.json({ ok: true, received: true, skipped: "no_email" });
  }

  const downloadLink = signDownloadLink(email, session.id);
  const delivery = await deliverToKit(email, downloadLink);

  const capi = await sendCapiPurchase(
    session.id,
    email,
    session.customer_details?.name ?? ""
  );

  return NextResponse.json({
    ok: true,
    received: true,
    delivered: delivery.ok,
    capi: capi.ok ? { ok: true } : { ok: false, upstream: capi.upstream },
  });
}