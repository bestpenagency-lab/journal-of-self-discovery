import { NextResponse } from "next/server";
import { PDF_PATH, verifyDownloadLink } from "@/lib/access";

const INVALID_PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Journal of Self-Discovery</title>
  </head>
  <body style="font-family: Arial, sans-serif; text-align: center; padding: 3rem 1rem; background: #0d0b1f; color: #f5f0ff;">
    <h1 style="font-size: 1.4rem; color: #b57bff;">This download link is not valid.</h1>
    <p style="color: #c3b8df; max-width: 420px; margin: 1rem auto;">
      If you purchased the Journal of Self-Discovery, check your inbox for your personal download link, or
      <a href="/" style="color: #b57bff;">visit the homepage</a> to buy again.
    </p>
  </body>
</html>`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("e") ?? "";
  const sessionId = searchParams.get("s") ?? "";
  const token = searchParams.get("t") ?? "";

  if (!verifyDownloadLink(email, sessionId, token)) {
    return new Response(INVALID_PAGE, {
      status: 403,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return NextResponse.redirect(new URL(PDF_PATH, request.url), 307);
}