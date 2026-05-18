/**
 * Session-scoped context after a couple learns their wedding date is available.
 * sessionStorage only; fails silently when unavailable.
 */

export const POST_AVAILABILITY_CONTEXT_KEY = "hsdj_post_availability_context";

/** Expire context after 30 minutes without a fresh availability result. */
const INACTIVITY_MS = 30 * 60 * 1000;

export type PostAvailabilityContext = {
  active: true;
  timestamp: number;
  selectedDate?: string;
  source: "availability_checker";
};

function readRaw(): PostAvailabilityContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(POST_AVAILABILITY_CONTEXT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PostAvailabilityContext;
    if (parsed?.active !== true || typeof parsed.timestamp !== "number") return null;
    if (parsed.source !== "availability_checker") return null;
    if (Date.now() - parsed.timestamp > INACTIVITY_MS) {
      window.sessionStorage.removeItem(POST_AVAILABILITY_CONTEXT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setPostAvailabilityContext(selectedDate?: string): void {
  if (typeof window === "undefined") return;
  const ctx: PostAvailabilityContext = {
    active: true,
    timestamp: Date.now(),
    source: "availability_checker",
  };
  if (selectedDate) ctx.selectedDate = selectedDate;
  try {
    window.sessionStorage.setItem(POST_AVAILABILITY_CONTEXT_KEY, JSON.stringify(ctx));
  } catch {
    // quota / private mode
  }
}

export function clearPostAvailabilityContext(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(POST_AVAILABILITY_CONTEXT_KEY);
  } catch {
    // ignore
  }
}

export function getPostAvailabilityContext(): PostAvailabilityContext | null {
  return readRaw();
}

export function isPostAvailabilityContextActive(): boolean {
  return getPostAvailabilityContext() !== null;
}
