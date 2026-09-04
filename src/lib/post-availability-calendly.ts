import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";

export type PostAvailabilityCalendlyParams = {
  weddingDate: string;
  surface: string;
  journeyId?: string;
};

/**
 * Calendly prefill: wedding date + funnel metadata only (no PII).
 * Uses standard `month` (YYYY-MM) and UTM fields for attribution.
 */
export function buildPostAvailabilityCalendlyUrl({
  weddingDate,
  surface,
  journeyId,
}: PostAvailabilityCalendlyParams): string {
  if (journeyId) {
    const params = new URLSearchParams({ jid: journeyId, surface });
    const month = weddingDate.slice(0, 7);
    if (/^\d{4}-\d{2}$/.test(month)) params.set("month", month);
    return `/go/consult?${params.toString()}`;
  }
  const url = new URL(CONSULT_CALENDLY_URL);
  const month = weddingDate.slice(0, 7);
  if (/^\d{4}-\d{2}$/.test(month)) {
    url.searchParams.set("month", month);
  }
  url.searchParams.set("utm_source", "howesounddj");
  url.searchParams.set("utm_medium", "post_availability");
  url.searchParams.set("utm_campaign", "sound_check");
  url.searchParams.set("utm_content", surface);
  return url.toString();
}
