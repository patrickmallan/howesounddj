/**
 * Post-availability emotional conversion copy (visitor-facing SSOT).
 *
 * V3.1 : Human Connection copy refinement (Patrick executive review 2026-07-30).
 * Authority: docs/branding/HSDJ_AVAILABILITY_SUCCESS_V3_COPY_CONTRACT.md
 */

export const POST_AVAILABILITY_COPY_VARIANT = "human_connection_v3" as const;

export const POST_AVAILABILITY_PRIMARY_CTA_LABEL =
  "Book a Consult" as const;

export const POST_AVAILABILITY_COMPACT_CTA_LABEL = "Choose a Time" as const;

export const POST_AVAILABILITY_CTA_SUPPORT =
  "Your next best step is to book a chat with Patrick." as const;

export const POST_AVAILABILITY_FULL_CTA_SUPPORT = "Pick a time that works." as const;

export const POST_AVAILABILITY_INQUIRY_FALLBACK_LABEL = "Prefer email first?" as const;

export const POST_AVAILABILITY_EDIT_DATE_LABEL = "Edit date" as const;

/** Shared headline lead line (compact + full). */
export const POST_AVAILABILITY_SUCCESS_HEADLINE_LEAD =
  "This is the answer you were hoping for." as const;

/** Shared headline confirmation line (compact + full). */
export const POST_AVAILABILITY_SUCCESS_HEADLINE_CONFIRMATION =
  "Your wedding date is available." as const;

/** Full contact surface only : one planning-session explanation. */
export const POST_AVAILABILITY_FULL_PLANNING_SESSION =
  "Book a 45-minute consult and tell me what you're planning. We'll talk about the wedding, the music, and what working together would look like." as const;

export function postAvailabilityConfirmedDateLabel(formattedDate: string): string {
  return `${formattedDate} is available`;
}

export const POST_AVAILABILITY_LOADING = {
  buttonLabel: "Checking Patrick's calendar…",
  statusMessage: "Checking Patrick's calendar for your wedding date.",
} as const;

export const POST_AVAILABILITY_UNAVAILABLE_COPY = {
  headline: "That date is not open right now",
  body: "It happens with popular Sea-to-Sky weekends. Try another date, or send a message if your plans are flexible.",
  tryAnotherDateLabel: "Try Another Date",
  sendMessageLabel: "Send a Message",
} as const;

export const POST_AVAILABILITY_MANUAL_COPY = {
  headline: "I need to check this one myself",
  body: "Send me the date and venue and I'll get back to you.",
  contactLabel: "Send me the details",
  tryAnotherDateLabel: "Try Another Date",
} as const;

/** Screen-reader factual status templates (not primary visual copy). */
export const POST_AVAILABILITY_SR_STATUS = {
  available: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} currently appears available.`,
  unavailable: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} is currently unavailable.`,
  manual: (formattedDate: string) =>
    `Availability check complete. ${formattedDate} could not be confirmed automatically.`,
} as const;
