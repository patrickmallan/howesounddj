// Manual fallback: YYYY-MM-DD strings still treated as unavailable when Google Calendar
// is off, fails, or alongside Google when both are active (rollout safety).
// Primary source: dedicated bookings Google Calendar (see env GOOGLE_CALENDAR_*).

export const BOOKED_DATES = [
  "2026-04-04",
  "2026-05-16",
  "2026-06-12",
  "2026-06-13",
  "2026-06-20",
  "2026-06-24",
  "2026-07-04",
  "2026-07-29",
  "2026-08-08",
  "2026-08-13",
  "2026-08-24",
  "2026-08-29",
  "2026-09-05",
  "2026-09-06",
  "2026-09-12",
  "2026-09-16",
  "2026-09-19",
  "2026-12-31",
  "2027-05-29",
];
