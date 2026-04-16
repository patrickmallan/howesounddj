/** Homepage headline A/B/C experiment — client-only (localStorage). */

export const HOMEPAGE_VARIANT_STORAGE_KEY = "hsdj_home_variant";

export type HeadlineVariant = "A" | "B" | "C";

/**
 * Returns persisted variant or randomly assigns A/B/C (equal), then saves.
 * Server / SSR: always `"A"` (matches default HTML).
 */
export function getHomepageVariant(): HeadlineVariant {
  if (typeof window === "undefined") return "A";
  try {
    const existing = localStorage.getItem(HOMEPAGE_VARIANT_STORAGE_KEY);
    if (existing === "A" || existing === "B" || existing === "C") return existing;
    const r = Math.random();
    const v: HeadlineVariant = r < 1 / 3 ? "A" : r < 2 / 3 ? "B" : "C";
    localStorage.setItem(HOMEPAGE_VARIANT_STORAGE_KEY, v);
    return v;
  } catch {
    return "A";
  }
}

/**
 * Reads assigned variant without creating one — for analytics on /contact etc.
 * If the user never hit the homepage experiment, returns `undefined`.
 */
export function getStoredHeadlineVariant(): HeadlineVariant | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const existing = localStorage.getItem(HOMEPAGE_VARIANT_STORAGE_KEY);
    if (existing === "A" || existing === "B" || existing === "C") return existing;
    return undefined;
  } catch {
    return undefined;
  }
}

/** Merge into GA event params — omits key when no variant stored. */
export function headlineVariantPayload(): { headline_variant?: string } {
  const v = getStoredHeadlineVariant();
  return v ? { headline_variant: v } : {};
}
