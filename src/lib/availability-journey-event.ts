const CLIENT_EVENT_TYPES = new Set([
  "PAGE_VIEWED",
  "CHECK_REPEATED",
  "SUCCESS_VIEWED",
  "CONSULT_CTA_DISPLAYED",
  "PROOF_VIEWED",
  "INQUIRY_FALLBACK_CLICKED",
  "DATE_CHANGED",
  "INQUIRY_SUBMITTED",
]);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TOKEN = /^[a-z0-9_-]{1,64}$/i;

export function isJourneyId(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

export function isJourneySurface(value: unknown): value is string {
  return typeof value === "string" && TOKEN.test(value);
}

export type ClientJourneyEvent = {
  journeyId: string;
  eventId: string;
  eventType: string;
  occurredAt: string;
  pagePath?: string;
  surface?: string;
  experimentVariant?: string;
};

export function parseClientJourneyEvent(value: unknown): ClientJourneyEvent | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const allowed = new Set(["journeyId", "eventId", "eventType", "occurredAt", "pagePath", "surface", "experimentVariant"]);
  if (Object.keys(input).some((key) => !allowed.has(key))) return null;
  if (!isJourneyId(input.journeyId)) return null;
  if (!isJourneyId(input.eventId)) return null;
  if (typeof input.eventType !== "string" || !CLIENT_EVENT_TYPES.has(input.eventType)) return null;
  if (typeof input.occurredAt !== "string" || input.occurredAt.length > 32) return null;
  const occurredAt = Date.parse(input.occurredAt);
  if (!Number.isFinite(occurredAt) || Math.abs(Date.now() - occurredAt) > 86_400_000) return null;
  if (input.pagePath !== undefined && (
    typeof input.pagePath !== "string" ||
    input.pagePath.length > 160 ||
    !/^\/[a-z0-9/_-]*$/i.test(input.pagePath)
  )) return null;
  if (input.surface !== undefined && !isJourneySurface(input.surface)) return null;
  if (input.experimentVariant !== undefined && (typeof input.experimentVariant !== "string" || !TOKEN.test(input.experimentVariant))) return null;
  return input as ClientJourneyEvent;
}
