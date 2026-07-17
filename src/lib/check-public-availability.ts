import {
  AVAILABILITY_REQUEST_TIMEOUT_MS,
  CALENDAR_DATE_RE,
  NormalizedPublicAvailability,
  OperationsAvailabilityPayload,
  PUBLIC_AVAILABILITY_AUTHORITY,
  PUBLIC_AVAILABILITY_COPY,
  PublicAvailabilityResult,
} from "@/lib/public-availability-contract";

const LOCALHOST_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;

function isValidCalendarDate(date: string): boolean {
  if (!CALENDAR_DATE_RE.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const instant = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return (
    instant.getUTCFullYear() === y &&
    instant.getUTCMonth() + 1 === m &&
    instant.getUTCDate() === d
  );
}

function isSupportedFutureDate(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  const targetMs = Date.UTC(y, m - 1, d);
  const today = new Date();
  const todayMs = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const maxMs = todayMs + 366 * 5 * 24 * 60 * 60 * 1000;
  return targetMs >= todayMs - 24 * 60 * 60 * 1000 && targetMs <= maxMs;
}

export function getOperationsAvailabilityApiUrl(): string {
  const configured = process.env.HSDJ_OPERATIONS_AVAILABILITY_API_URL?.trim();
  const base =
    configured ??
    process.env.HSDJ_OPERATIONS_API_BASE_URL?.trim() ??
    "https://ops.howesounddj.com";

  const normalized = base.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production" && LOCALHOST_PATTERN.test(normalized)) {
    throw new Error("Production cannot use localhost Operations API URL.");
  }
  return `${normalized}/api/availability`;
}

function manualResult(
  requestedDate: string,
  diagnosticReason: string,
  sourceEndpoint: string,
): NormalizedPublicAvailability {
  return {
    requestedDate,
    result: PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED,
    publicMessage: PUBLIC_AVAILABILITY_COPY.MANUAL_CONFIRMATION_REQUIRED,
    checkedAt: new Date().toISOString(),
    authority: PUBLIC_AVAILABILITY_AUTHORITY,
    sourceEndpoint,
    diagnosticReason,
  };
}

function parseOperationsResult(value: string | undefined): PublicAvailabilityResult | null {
  if (value === PublicAvailabilityResult.AVAILABLE) return value;
  if (value === PublicAvailabilityResult.UNAVAILABLE) return value;
  if (value === PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED) return value;
  return null;
}

export function validateRequestedAvailabilityDate(date: string): string | null {
  const normalized = date.trim().slice(0, 10);
  if (!normalized) return "empty_date";
  if (!isValidCalendarDate(normalized)) return "invalid_calendar_date";
  if (!isSupportedFutureDate(normalized)) return "unsupported_date_range";
  return null;
}

export async function checkPublicAvailability(
  requestedDate: string,
  options?: {
    fetchImpl?: typeof fetch;
    apiUrl?: string;
    timeoutMs?: number;
  },
): Promise<NormalizedPublicAvailability> {
  const date = requestedDate.trim().slice(0, 10);
  const sourceEndpoint = options?.apiUrl ?? getOperationsAvailabilityApiUrl();
  const fetchImpl = options?.fetchImpl ?? fetch;
  const timeoutMs = options?.timeoutMs ?? AVAILABILITY_REQUEST_TIMEOUT_MS;

  const validationError = validateRequestedAvailabilityDate(date);
  if (validationError) {
    return manualResult(date, validationError, sourceEndpoint);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(`${sourceEndpoint}?date=${encodeURIComponent(date)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    let payload: OperationsAvailabilityPayload;
    try {
      payload = (await response.json()) as OperationsAvailabilityPayload;
    } catch {
      return manualResult(date, "invalid_json", sourceEndpoint);
    }

    if (!response.ok && response.status !== 503) {
      return manualResult(date, `http_${response.status}`, sourceEndpoint);
    }

    const parsedResult = parseOperationsResult(payload.result);
    if (!parsedResult) {
      return manualResult(date, "unknown_result", sourceEndpoint);
    }

    if (payload.date !== date) {
      return manualResult(date, "date_mismatch", sourceEndpoint);
    }

    const publicMessage =
      typeof payload.message === "string" && payload.message.trim()
        ? payload.message.trim()
        : PUBLIC_AVAILABILITY_COPY[parsedResult];

    return {
      requestedDate: date,
      result: parsedResult,
      publicMessage,
      checkedAt: new Date().toISOString(),
      authority: PUBLIC_AVAILABILITY_AUTHORITY,
      sourceEndpoint,
    };
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "AbortError"
        ? "timeout"
        : "network_error";
    return manualResult(date, reason, sourceEndpoint);
  } finally {
    clearTimeout(timeout);
  }
}

export function availabilityResultLabel(
  result: PublicAvailabilityResult,
): "available" | "unavailable" | "manual confirmation required" {
  switch (result) {
    case PublicAvailabilityResult.AVAILABLE:
      return "available";
    case PublicAvailabilityResult.UNAVAILABLE:
      return "unavailable";
    default:
      return "manual confirmation required";
  }
}

export function availabilityEmailSubject(result: NormalizedPublicAvailability): string {
  const label = availabilityResultLabel(result.result);
  if (result.result === PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED) {
    return `[Howe Sound DJ] Availability check requires confirmation: ${result.requestedDate}`;
  }
  return `[Howe Sound DJ] Availability checked: ${result.requestedDate} ${label}`;
}
