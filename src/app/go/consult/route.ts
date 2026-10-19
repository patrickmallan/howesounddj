import { after, NextResponse } from "next/server";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";
import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";
import { isJourneyId, isJourneyPagePath, isJourneySurface } from "@/lib/availability-journey-event";
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
  const surface = isJourneySurface(requestedSurface) ? requestedSurface : journeyId ? "post_availability" : "direct_consult";
  const requestedPagePath = source.searchParams.get("page");
  const pagePath = isJourneyPagePath(requestedPagePath) ? requestedPagePath : undefined;
  if (journeyId) {
    const occurredAt = new Date().toISOString();
    after(() => forwardAvailabilityJourney({ kind: "event", event: { journeyId, eventId: crypto.randomUUID(), eventType: "CONSULT_CLICKED", occurredAt, pagePath, surface } }));
  }
  const target = new URL(CONSULT_CALENDLY_URL);
  target.searchParams.set("utm_source", "howesounddj");
  target.searchParams.set("utm_medium", journeyId ? "post_availability" : "direct_consult");
  target.searchParams.set("utm_campaign", "sound_check");
  target.searchParams.set("utm_content", surface);
  if (journeyId) target.searchParams.set("utm_term", `hsdj_journey_${journeyId}`);
  else if (pagePath) target.searchParams.set("utm_term", `hsdj_page_${pagePath === "/" ? "home" : pagePath.slice(1).replaceAll("/", "_")}`);
  return NextResponse.redirect(target);
}
