import { NextResponse } from "next/server";
import {
  deliverToKit,
  getStripeSession,
  hashCustomer,
  purchaseEventId,
  signDownloadLink,
} from "@/lib/access";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.KIT_API_KEY) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let body: { sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "missing_session" }, { status: 400 });
  }

  const session = await getStripeSession(sessionId);
  if (!session) {
    return NextResponse.json({ ok: false, error: "session_not_found" }, { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ ok: false, error: "not_paid" }, { status: 402 });
  }

  const email = session.customer_details?.email?.trim() ?? "";

  if (!email) {
    return NextResponse.json({
      ok: true,
      downloadUrl: null,
      emailed: false,
      reason: "no_email",
      purchaseEventId: purchaseEventId(sessionId),
    });
  }

  const downloadLink = signDownloadLink(email, sessionId);
  const delivery = await deliverToKit(email, downloadLink);

  return NextResponse.json({
    ok: true,
    downloadUrl: downloadLink,
    emailed: delivery.ok,
    fieldConfigured: delivery.fieldConfigured,
    purchaseEventId: purchaseEventId(sessionId),
    userData: hashCustomer(email, session.customer_details?.name ?? ""),
  });
}