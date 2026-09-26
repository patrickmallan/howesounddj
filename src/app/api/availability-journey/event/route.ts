import { NextResponse } from "next/server";
import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";
import { readJsonObject, RequestBodyError } from "@/lib/api-request";
import { parseClientJourneyEvent } from "@/lib/availability-journey-event";
import { isIsolatedPreview } from "@/lib/is-isolated-preview";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (isIsolatedPreview()) {
    return NextResponse.json({ error: "preview_only" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((origin && origin !== new URL(request.url).origin) || fetchSite === "cross-site") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  let body: Record<string, unknown>;
  try {
    body = await readJsonObject(request, 1024);
  } catch (error) {
    return NextResponse.json({ error: "invalid_request" }, { status: error instanceof RequestBodyError ? error.status : 400 });
  }
  const event = parseClientJourneyEvent(body);
  if (!event) return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  const ok = await forwardAvailabilityJourney({ kind: "event", event });
  return NextResponse.json({ ok }, { status: ok ? 200 : 503 });
}
