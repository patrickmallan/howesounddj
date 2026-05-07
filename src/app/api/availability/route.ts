/** Availability: Google Calendar when enabled; always merges `BOOKED_DATES` when Google returns a definitive result. */
import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { AvailabilityDiagnosticReason } from "@/lib/availability-reason";
import { BOOKED_DATES } from "@/data/booked-dates";
import {
  type GoogleCalendarDayDiagnostics,
  queryGoogleCalendarDayDiagnostics,
} from "@/lib/google-calendar";

export const runtime = "nodejs";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

/** Same destination as `/api/contact` (Patrick's inbox). */
function getMailConfig(): { to: string; from: string } | null {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!to || !from) return null;
  return { to, from };
}

/**
 * Fail-soft internal ping: logs on Resend error / exception; never throws.
 * Omits send when mail is not configured (same env as contact).
 */
async function sendAvailabilityCheckNotification(params: {
  date: string;
  available: boolean;
  timestampUtc: string;
}): Promise<void> {
  const resend = getResend();
  const mail = getMailConfig();
  if (!resend || !mail) return;

  const resultLabel = params.available ? "available" : "unavailable";
  const subject = `[Howe Sound DJ] Availability checked: ${params.date} ${resultLabel}`;
  const textBody = [
    `Date checked: ${params.date}`,
    `Result: ${resultLabel}`,
    `Timestamp (UTC): ${params.timestampUtc}`,
    "Source: Check Availability form",
    "",
    "Note: No contact info collected at this step.",
  ].join("\n");

  try {
    const sendResult = await resend.emails.send({
      from: mail.from,
      to: mail.to,
      subject,
      text: textBody,
    });

    if (sendResult.error) {
      console.error("[availability] notification_failed", {
        name: sendResult.error.name,
        statusCode: sendResult.error.statusCode,
        message: sendResult.error.message,
      });
    }
  } catch (err) {
    console.error("[availability] notification_failed", {
      message: err instanceof Error ? err.message : "unknown",
    });
  }
}

function isValidCalendarDate(s: string): boolean {
  if (!ISO_DATE.test(s)) return false;
  const d = new Date(s + "T12:00:00");
  if (Number.isNaN(d.getTime())) return false;
  const [y, m, day] = s.split("-").map(Number);
  return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day;
}

/** Same merge as response body; kept explicit for logs. */
function mergeBooked(manualBooked: boolean, googleBooked: boolean | null): boolean {
  return googleBooked === null ? manualBooked : Boolean(googleBooked) || manualBooked;
}

/**
 * Log-only final reason (never sent to client).
 * Precedence: INVALID_DATE (handled earlier) → CALENDAR_QUERY_ERROR → Google all-day/overlap →
 * BLOCKED_BY_MANUAL_DATE → AVAILABLE_NO_EVENTS → UNKNOWN fallback.
 */
function logAvailabilityReason(
  manualBooked: boolean,
  diag: GoogleCalendarDayDiagnostics,
  finalBooked: boolean
): AvailabilityDiagnosticReason {
  // 6. AVAILABLE_NO_EVENTS — slot open for visitors (merge yields not booked).
  if (!finalBooked) {
    return "AVAILABLE_NO_EVENTS";
  }

  const g = diag.booked;

  // 2. CALENDAR_QUERY_ERROR — Google API failure (merge still uses manual list when applicable).
  if (g === null && diag.googleReason === "CALENDAR_QUERY_ERROR") {
    return "CALENDAR_QUERY_ERROR";
  }

  // 3–4. Google definitive busy (precedence over manual-only when both apply).
  if (g === true) {
    if (diag.googleReason === "BLOCKED_BY_ALL_DAY_EVENT") {
      return "BLOCKED_BY_ALL_DAY_EVENT";
    }
    if (diag.googleReason === "BLOCKED_BY_OVERLAP") {
      return "BLOCKED_BY_OVERLAP";
    }
    return "UNKNOWN";
  }

  // 5. BLOCKED_BY_MANUAL_DATE — manual list hit while Google is free, skipped, or non-busy.
  if (manualBooked && (g === false || g === null)) {
    return "BLOCKED_BY_MANUAL_DATE";
  }

  // 7. UNKNOWN — inconsistent / unclassified final booked state.
  return "UNKNOWN";
}

function formatRawDateInput(body: unknown): string {
  if (typeof body !== "object" || body === null || !("date" in body)) {
    return "<missing_date_key>";
  }
  const v = (body as { date: unknown }).date;
  if (v === undefined) return "<undefined>";
  if (v === null) return "<null>";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body must be JSON." },
      { status: 400 }
    );
  }

  const rawUserInput = formatRawDateInput(body);

  const date =
    typeof body === "object" && body !== null && "date" in body
      ? String((body as { date: unknown }).date).trim()
      : "";

  if (!date) {
    console.info("[availability] diagnostic", {
      availability_reason: "INVALID_DATE" satisfies AvailabilityDiagnosticReason,
      raw_user_input: rawUserInput,
      normalized_date: "",
      detail: "empty_after_trim",
    });
    return NextResponse.json(
      { success: false, message: "Please choose a wedding date." },
      { status: 400 }
    );
  }

  if (!isValidCalendarDate(date)) {
    console.info("[availability] diagnostic", {
      availability_reason: "INVALID_DATE" satisfies AvailabilityDiagnosticReason,
      raw_user_input: rawUserInput,
      normalized_date: date,
      validation: {
        iso_match: ISO_DATE.test(date),
        note: "validated_with_Date_T12:00:00_UTC_component_match",
      },
    });
    return NextResponse.json(
      { success: false, message: "Please use a valid date." },
      { status: 400 }
    );
  }

  const manualBooked = BOOKED_DATES.includes(date);

  const googleDiag = await queryGoogleCalendarDayDiagnostics(date);
  const googleBooked = googleDiag.booked;

  const booked = mergeBooked(manualBooked, googleBooked);

  const available = !booked;
  const timestampUtc = new Date().toISOString();
  const availability_reason = logAvailabilityReason(manualBooked, googleDiag, booked);

  console.info("[availability] diagnostic", {
    availability_reason,
    raw_user_input: rawUserInput,
    normalized_date: date,
    timezone_for_calendar_day_bounds: googleDiag.timezone,
    manual_booked: manualBooked,
    google_calendar_id: googleDiag.calendarId,
    calendar_query_utc: {
      time_min_inclusive: googleDiag.timeMin,
      time_max_exclusive: googleDiag.timeMax,
    },
    matching_events: googleDiag.matchingEvents,
    google_booked_flag: googleBooked,
    google_integration_enabled: googleDiag.integrationEnabled,
    google_credentials_present: googleDiag.credentialsPresent,
    google_api_error: googleDiag.errorMessage,
    google_internal_reason: googleDiag.googleReason,
    merge_formula: "googleBooked === null ? manualBooked : Boolean(googleBooked) || manualBooked",
    final_booked: booked,
    final_available: available,
    timestamp_utc: timestampUtc,
    evidence: {
      utc_vs_local_note:
        "YYYY-MM-DD is interpreted as America/Vancouver calendar day for Google query window; route validation uses UTC date parts of synthetic instant (see isValidCalendarDate).",
      partial_overlap_rule:
        "Any non-cancelled event overlapping [timeMin, timeMax) marks the day booked (includes timed + all-day).",
      all_day_handling:
        "Events with start.date (no dateTime) classified as all_day in diagnostics; still block the day.",
      stale_cache: "none (live Calendar API each request).",
    },
  });

  await sendAvailabilityCheckNotification({ date, available, timestampUtc });

  if (booked) {
    return NextResponse.json({
      success: true,
      available: false,
      message:
        "That date appears to be unavailable. Try another date, or send a message if your plans are flexible.",
    });
  }

  return NextResponse.json({
    success: true,
    available: true,
    message:
      "That date is open on the calendar. Share a few details below, or book a consult first when you want a calm, straightforward conversation before you reply.",
  });
}
