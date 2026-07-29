const LONG_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** `YYYY-MM-DD` to human-readable date (UTC noon anchor avoids DST drift). */
export function formatWeddingDateLong(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return LONG_DATE_FORMATTER.format(new Date(Date.UTC(y, m - 1, d, 12, 0, 0)));
}

/** Non-identifying month bucket for analytics (`YYYY-MM`). */
export function weddingDateMonthBucket(isoDate: string): string {
  return isoDate.slice(0, 7);
}
