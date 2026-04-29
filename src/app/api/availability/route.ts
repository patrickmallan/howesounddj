/** Availability: Google Calendar when enabled; always merges `BOOKED_DATES` when Google returns a definitive result. */
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BOOKED_DATES } from "@/data/booked-dates";
import { isDateBookedInGoogleCalendar } from "@/lib/google-calendar";

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

  const date =
    typeof body === "object" && body !== null && "date" in body
      ? String((body as { date: unknown }).date).trim()
      : "";

  if (!date) {
    return NextResponse.json(
      { success: false, message: "Please choose a wedding date." },
      { status: 400 }
    );
  }

  if (!isValidCalendarDate(date)) {
    return NextResponse.json(
      { success: false, message: "Please use a valid date." },
      { status: 400 }
    );
  }

  const manualBooked = BOOKED_DATES.includes(date);

  const googleBooked = await isDateBookedInGoogleCalendar(date);

  const booked =
    googleBooked === null ? manualBooked : Boolean(googleBooked) || manualBooked;

  const available = !booked;
  const timestampUtc = new Date().toISOString();
  console.info("[availability] checked", {
    date,
    available,
    timestamp: timestampUtc,
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
