/**
 * Internal diagnostics only — never sent to clients.
 * Used for logs when investigating false negatives (manual list vs Google overlap vs API errors).
 */
export type AvailabilityDiagnosticReason =
  | "AVAILABLE_NO_EVENTS"
  | "BLOCKED_BY_ALL_DAY_EVENT"
  | "BLOCKED_BY_OVERLAP"
  | "BLOCKED_BY_MANUAL_DATE"
  | "INVALID_DATE"
  | "CALENDAR_QUERY_ERROR"
  | "UNKNOWN";
