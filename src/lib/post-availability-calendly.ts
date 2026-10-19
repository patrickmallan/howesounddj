export type PostAvailabilityCalendlyParams = {
  surface: string;
  journeyId?: string;
  pagePath?: string;
};

/**
 * Handoff metadata only (no PII). The wedding month must not be passed as
 * Calendly's `month` parameter: that controls which consult-booking month opens.
 */
export function buildPostAvailabilityCalendlyUrl({
  surface,
  journeyId,
  pagePath,
}: PostAvailabilityCalendlyParams): string {
  const params = new URLSearchParams({ surface });
  if (journeyId) params.set("jid", journeyId);
  if (pagePath) params.set("page", pagePath);
  return `/go/consult?${params.toString()}`;
}
