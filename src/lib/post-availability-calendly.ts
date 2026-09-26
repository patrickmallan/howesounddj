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
  const params = new URLSearchParams({ surface });
  if (journeyId) params.set("jid", journeyId);
  const month = weddingDate.slice(0, 7);
  if (/^\d{4}-\d{2}$/.test(month)) params.set("month", month);
  return `/go/consult?${params.toString()}`;
}
