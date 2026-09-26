import { after, NextResponse } from "next/server";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";
import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";
import { isJourneyId, isJourneySurface } from "@/lib/availability-journey-event";
import { isIsolatedPreview } from "@/lib/is-isolated-preview";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(request: Request) {
  // Every public scheduling link passes through this gate. Preview builds can
  // be inspected without ever opening the live booking calendar.
  if (isIsolatedPreview()) {
    return NextResponse.redirect(new URL("/preview/scheduling", request.url));
  }
  const source = new URL(request.url);
  const requestedJourneyId = source.searchParams.get("jid");
  const journeyId = isJourneyId(requestedJourneyId) ? requestedJourneyId : null;
  const requestedSurface = source.searchParams.get("surface");
  const surface = isJourneySurface(requestedSurface) ? requestedSurface : "post_availability";
  const month = source.searchParams.get("month")?.slice(0, 7) ?? "";
  if (journeyId) {
    const occurredAt = new Date().toISOString();
    after(() => forwardAvailabilityJourney({ kind: "event", event: { journeyId, eventId: crypto.randomUUID(), eventType: "CONSULT_CLICKED", occurredAt, pagePath: "/contact", surface } }));
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
