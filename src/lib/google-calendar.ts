/**
 * Google Calendar read-only integration. All config comes from `process.env` only.
 * `GOOGLE_PROJECT_ID` may be set for operator reference; JWT auth uses client email + private key + calendar ID.
 */
import { google } from "googleapis";

const READONLY_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

function isEnabled(): boolean {
  const v = process.env.GOOGLE_CALENDAR_ENABLED?.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function loadCredentials(): { clientEmail: string; privateKey: string; calendarId: string } | null {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  if (!clientEmail || !rawKey || !calendarId) return null;
  const privateKey = rawKey.replace(/\\n/g, "\n");
  if (!privateKey) return null;
  return { clientEmail, privateKey, calendarId };
}

/**
 * Dedicated **bookings-only** calendar (server-side). Requires a service account with access
 * to that calendar, and `GOOGLE_CALENDAR_ENABLED=true`.
 *
 * @param date `YYYY-MM-DD`
 * @returns `true` if at least one non-cancelled event overlaps that calendar day (all-day or timed);
 *          `false` if Google responds and shows no events;
 *          `null` if integration is off, misconfigured, or the API call failed (caller should rely on manual `BOOKED_DATES` only for that leg of the decision).
 */
export async function isDateBookedInGoogleCalendar(date: string): Promise<boolean | null> {
  if (!isEnabled()) return null;

  const creds = loadCredentials();
  if (!creds) return null;

  try {
    const auth = new google.auth.JWT({
      email: creds.clientEmail,
      key: creds.privateKey,
      scopes: [READONLY_SCOPE],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const timeMin = `${date}T00:00:00.000Z`;
    const timeMax = `${date}T23:59:59.999Z`;

    const res = await calendar.events.list({
      calendarId: creds.calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      maxResults: 50,
    });

    const items = res.data.items ?? [];
    const active = items.filter((ev) => ev.status !== "cancelled");
    return active.length > 0;
  } catch {
    return null;
  }
}
