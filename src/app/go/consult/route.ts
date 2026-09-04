import { NextResponse } from "next/server";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";
import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const source = new URL(request.url);
  const journeyId = source.searchParams.get("jid");
  const surface = source.searchParams.get("surface")?.slice(0, 120) ?? "post_availability";
  const month = source.searchParams.get("month")?.slice(0, 7) ?? "";
  if (journeyId) {
    const occurredAt = new Date().toISOString();
    await forwardAvailabilityJourney({ kind: "event", event: { journeyId, eventId: crypto.randomUUID(), eventType: "CONSULT_CLICKED", occurredAt, pagePath: "/contact", surface } });
    await forwardAvailabilityJourney({ kind: "event", event: { journeyId, eventId: crypto.randomUUID(), eventType: "CALENDLY_OPENED", occurredAt, pagePath: "/contact", surface } });
  }
  const target = new URL(CONSULT_CALENDLY_URL);
  if (/^\d{4}-\d{2}$/.test(month)) target.searchParams.set("month", month);
  target.searchParams.set("utm_source", "howesounddj");
  target.searchParams.set("utm_medium", "post_availability");
  target.searchParams.set("utm_campaign", "sound_check");
  target.searchParams.set("utm_content", surface);
  if (journeyId) target.searchParams.set("utm_term", `hsdj_journey_${journeyId}`);
  return NextResponse.redirect(target);
}
