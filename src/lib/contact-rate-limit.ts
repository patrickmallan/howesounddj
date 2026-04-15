/**
 * Simple in-memory rate limit for POST /api/contact (per server instance).
 */

const WINDOW_MS = 60_000;
const MAX = 12;
const hits = new Map<string, number[]>();

export function checkContactRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const list = hits.get(ip) ?? [];
  const recent = list.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return { ok: recent.length <= MAX };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
