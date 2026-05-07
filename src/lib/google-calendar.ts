/**
 * Google Calendar read-only integration. All config comes from `process.env` only.
 * `GOOGLE_PROJECT_ID` may be set for operator reference; JWT auth uses client email + private key + calendar ID.
 */
import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";
import type { AvailabilityDiagnosticReason } from "@/lib/availability-reason";

const READONLY_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
const VANCOUVER_TZ = "America/Vancouver";

/** Server-side diagnostics only (logs). Same timezone used for `timeMin` / `timeMax` as wedding-day boundaries. */
export type GoogleCalendarDayDiagnostics = {
  booked: boolean | null;
  /** Why Google treated the day as busy (only meaningful when `booked === true`). */
  googleReason: AvailabilityDiagnosticReason;
  timezone: string;
  calendarId: string;
  timeMin: string;
  timeMax: string;
  integrationEnabled: boolean;
  credentialsPresent: boolean;
  matchingEvents: Array<{
    id?: string | null;
    summary?: string | null;
    status?: string | null;
    start?: { date?: string | null; dateTime?: string | null; timeZone?: string | null };
    end?: { date?: string | null; dateTime?: string | null; timeZone?: string | null };
    kind: "all_day" | "timed";
  }>;
  errorMessage?: string;
};

function eventIsAllDay(ev: calendar_v3.Schema$Event): boolean {
  return Boolean(ev.start?.date && !ev.start?.dateTime);
}

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

function dayKeyParts(y: number, m: number, d: number): number {
  return y * 10000 + m * 100 + d;
}

/** Wall-clock parts for `utcMs` in America/Vancouver (handles PST/PDT via ICU). */
function vancouverWallParts(utcMs: number): {
  y: number;
  m: number;
  d: number;
  h: number;
  mi: number;
  s: number;
} {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: VANCOUVER_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(new Date(utcMs)).map((p) => [p.type, p.value])
  ) as Record<string, string>;
  return {
    y: Number(parts.year),
    m: Number(parts.month),
    d: Number(parts.day),
    h: Number(parts.hour),
    mi: Number(parts.minute),
    s: Number(parts.second),
  };
}

function vancouverDayKeyAt(utcMs: number): number {
  const w = vancouverWallParts(utcMs);
  return dayKeyParts(w.y, w.m, w.d);
}

/**
 * UTC millisecond for the first `00:00:00` on the given calendar day in America/Vancouver.
 */
function findVancouverMidnightUtc(year: number, month: number, day: number): number {
  const target = dayKeyParts(year, month, day);

  let lo = Date.UTC(year, month - 1, day) - 2 * 86400000;
  let hi = Date.UTC(year, month - 1, day) + 2 * 86400000;

  while (vancouverDayKeyAt(lo) >= target) lo -= 86400000;
  while (vancouverDayKeyAt(hi) < target) hi += 86400000;

  while (lo < hi - 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (vancouverDayKeyAt(mid) < target) lo = mid;
    else hi = mid;
  }

  let t = hi;
  while (t > lo) {
    const w = vancouverWallParts(t);
    if (vancouverDayKeyAt(t) < target) break;
    if (w.y === year && w.m === month && w.d === day && w.h === 0 && w.mi === 0 && w.s === 0) {
      return t;
    }
    t -= 1;
  }

  t = hi;
  const limit = hi + 24 * 3600000;
  while (t < limit) {
    const w = vancouverWallParts(t);
    if (w.y === year && w.m === month && w.d === day && w.h === 0 && w.mi === 0 && w.s === 0) {
      return t;
    }
    t += 1;
  }

  throw new RangeError(`findVancouverMidnightUtc: could not resolve midnight for ${year}-${month}-${day}`);
}

/** Next calendar day (Gregorian) after `y-m-d` using UTC date arithmetic. */
function nextGregorianDay(y: number, m: number, d: number): [number, number, number] {
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  return [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()];
}

/**
 * America/Vancouver local calendar day as RFC3339 UTC bounds for Google Calendar `events.list`.
 * `timeMin` is inclusive (local midnight). `timeMax` is exclusive (first instant of the next Vancouver day),
 * which matches API semantics and covers the full local day through 23:59:59.999.
 *
 * @param date `YYYY-MM-DD` (that calendar day in America/Vancouver).
 */
export function getVancouverDayUtcBounds(date: string): { timeMin: string; timeMax: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new RangeError(`getVancouverDayUtcBounds: expected YYYY-MM-DD, got ${JSON.stringify(date)}`);
  }
  const [ys, ms, ds] = date.split("-");
  const year = Number(ys);
  const month = Number(ms);
  const day = Number(ds);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new RangeError(`getVancouverDayUtcBounds: invalid date parts for ${JSON.stringify(date)}`);
  }

  const startMs = findVancouverMidnightUtc(year, month, day);
  const [ny, nm, nd] = nextGregorianDay(year, month, day);
  const nextStartMs = findVancouverMidnightUtc(ny, nm, nd);

  return {
    timeMin: new Date(startMs).toISOString(),
    timeMax: new Date(nextStartMs).toISOString(),
  };
}

function logGoogleLookupFailure(date: string, err: unknown): void {
  const name = err instanceof Error ? err.name : "non_error_throw";
  const message = err instanceof Error ? err.message : String(err);
  let errorCode: string | number | undefined;
  let httpStatus: number | undefined;

  if (err && typeof err === "object") {
    const o = err as Record<string, unknown>;
    if ("code" in o && (typeof o.code === "string" || typeof o.code === "number")) {
      errorCode = o.code as string | number;
    }
    const resp = o.response as { status?: number } | undefined;
    if (resp && typeof resp.status === "number") {
      httpStatus = resp.status;
    }
  }

  console.error("[availability] google_lookup_failed", {
    error_name: name,
    error_message: message,
    error_code: errorCode,
    http_status: httpStatus,
    date_queried: date,
  });
}

/**
 * Dedicated **bookings-only** calendar (server-side). Requires a service account with access
 * to that calendar, and `GOOGLE_CALENDAR_ENABLED=true`.
 *
 * Returns structured diagnostics for operator logs; classification logic matches {@link isDateBookedInGoogleCalendar}.
 *
 * @param date `YYYY-MM-DD` interpreted as a **wall-calendar day in America/Vancouver** (see `getVancouverDayUtcBounds`).
 */
export async function queryGoogleCalendarDayDiagnostics(date: string): Promise<GoogleCalendarDayDiagnostics> {
  const emptyDiag = (
    partial: Partial<GoogleCalendarDayDiagnostics> & Pick<GoogleCalendarDayDiagnostics, "booked" | "googleReason">
  ): GoogleCalendarDayDiagnostics => ({
    timezone: VANCOUVER_TZ,
    calendarId: partial.calendarId ?? "",
    timeMin: partial.timeMin ?? "",
    timeMax: partial.timeMax ?? "",
    integrationEnabled: partial.integrationEnabled ?? isEnabled(),
    credentialsPresent: partial.credentialsPresent ?? Boolean(loadCredentials()),
    matchingEvents: partial.matchingEvents ?? [],
    errorMessage: partial.errorMessage,
    booked: partial.booked,
    googleReason: partial.googleReason,
  });

  if (!isEnabled()) {
    return emptyDiag({
      booked: null,
      googleReason: "UNKNOWN",
      calendarId: "(GOOGLE_CALENDAR_ENABLED=false)",
      integrationEnabled: false,
      credentialsPresent: Boolean(loadCredentials()),
    });
  }

  const creds = loadCredentials();
  if (!creds) {
    return emptyDiag({
      booked: null,
      googleReason: "UNKNOWN",
      calendarId: "(missing_GOOGLE_CALENDAR_ID_or_credentials)",
      credentialsPresent: false,
    });
  }

  try {
    const auth = new google.auth.JWT({
      email: creds.clientEmail,
      key: creds.privateKey,
      scopes: [READONLY_SCOPE],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const { timeMin, timeMax } = getVancouverDayUtcBounds(date);

    const res = await calendar.events.list({
      calendarId: creds.calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      maxResults: 50,
    });

    const items = res.data.items ?? [];
    const active = items.filter((ev) => ev.status !== "cancelled");

    const matchingEvents = active.map((ev) => ({
      id: ev.id,
      summary: ev.summary,
      status: ev.status,
      start: ev.start,
      end: ev.end,
      kind: eventIsAllDay(ev) ? ("all_day" as const) : ("timed" as const),
    }));

    if (active.length === 0) {
      return {
        booked: false,
        googleReason: "AVAILABLE_NO_EVENTS",
        timezone: VANCOUVER_TZ,
        calendarId: creds.calendarId,
        timeMin,
        timeMax,
        integrationEnabled: true,
        credentialsPresent: true,
        matchingEvents,
      };
    }

    const hasAllDay = active.some(eventIsAllDay);
    const googleReason: AvailabilityDiagnosticReason = hasAllDay
      ? "BLOCKED_BY_ALL_DAY_EVENT"
      : "BLOCKED_BY_OVERLAP";

    return {
      booked: true,
      googleReason,
      timezone: VANCOUVER_TZ,
      calendarId: creds.calendarId,
      timeMin,
      timeMax,
      integrationEnabled: true,
      credentialsPresent: true,
      matchingEvents,
    };
  } catch (err) {
    logGoogleLookupFailure(date, err);
    return emptyDiag({
      booked: null,
      googleReason: "CALENDAR_QUERY_ERROR",
      calendarId: creds.calendarId,
      errorMessage: err instanceof Error ? err.message : String(err),
      matchingEvents: [],
    });
  }
}

/**
 * @param date `YYYY-MM-DD`
 * @returns `true` if at least one non-cancelled event overlaps that Vancouver calendar day (all-day or timed);
 *          `false` if Google responds and shows no events;
 *          `null` if integration is off, misconfigured, or the API call failed (caller should rely on manual `BOOKED_DATES` only for that leg of the decision).
 */
export async function isDateBookedInGoogleCalendar(date: string): Promise<boolean | null> {
  const d = await queryGoogleCalendarDayDiagnostics(date);
  return d.booked;
}
