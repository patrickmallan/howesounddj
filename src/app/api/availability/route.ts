/** Availability: Google Calendar when enabled; always merges `BOOKED_DATES` when Google returns a definitive result. */
import { NextResponse } from "next/server";
import { BOOKED_DATES } from "@/data/booked-dates";
import { isDateBookedInGoogleCalendar } from "@/lib/google-calendar";

export const runtime = "nodejs";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

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

  if (booked) {
    return NextResponse.json({
      success: true,
      available: false,
      message:
        "That date is already held for another celebration. You can still connect — book a consult to talk options, or send a note if your plans are flexible.",
    });
  }

  return NextResponse.json({
    success: true,
    available: true,
    message:
      "That date is open on the calendar. Share a few details below, or book a consult when you are ready for a proper conversation.",
  });
}
