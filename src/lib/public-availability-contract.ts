export const PUBLIC_AVAILABILITY_AUTHORITY = "HSDJ Operations Availability API";

export const PublicAvailabilityResult = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  MANUAL_CONFIRMATION_REQUIRED: "MANUAL_CONFIRMATION_REQUIRED",
} as const;

export type PublicAvailabilityResult =
  (typeof PublicAvailabilityResult)[keyof typeof PublicAvailabilityResult];

export const PUBLIC_AVAILABILITY_COPY: Record<PublicAvailabilityResult, string> = {
  AVAILABLE:
    "Your date currently appears available. Submit an inquiry to continue.",
  UNAVAILABLE:
    "That date is currently unavailable. Please check another date or contact us.",
  MANUAL_CONFIRMATION_REQUIRED:
    "We couldn't confirm availability automatically. Please contact us directly.",
};

export interface NormalizedPublicAvailability {
  requestedDate: string;
  result: PublicAvailabilityResult;
  publicMessage: string;
  checkedAt: string;
  authority: string;
  sourceEndpoint: string;
  diagnosticReason?: string;
}

export interface OperationsAvailabilityPayload {
  result?: string;
  message?: string;
  date?: string;
}

export const CALENDAR_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const AVAILABILITY_REQUEST_TIMEOUT_MS = 10_000;
