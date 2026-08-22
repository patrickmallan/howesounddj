import { checkRateLimit } from "@vercel/firewall";

export const RATE_LIMIT_IDS = {
  availability: "hsdj-availability-check",
  // Hobby projects support one programmatic Firewall rule. Contact shares the
  // per-IP bucket and adds Turnstile verification before any email is sent.
  contact: "hsdj-availability-check",
} as const;

export type ApiRateLimitResult = "allowed" | "limited" | "unavailable";

export async function checkApiRateLimit(
  request: Request,
  id: (typeof RATE_LIMIT_IDS)[keyof typeof RATE_LIMIT_IDS],
): Promise<ApiRateLimitResult> {
  if (process.env.NODE_ENV !== "production") return "allowed";
  try {
    const result = await checkRateLimit(id, { request });
    if (result.rateLimited) return "limited";
    if (result.error === "not-found") return "unavailable";
    return "allowed";
  } catch (error) {
    console.error("[rate-limit] check_failed", {
      id,
      message: error instanceof Error ? error.message : "unknown",
    });
    return "unavailable";
  }
}
