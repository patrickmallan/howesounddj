import {
  ANALYTICS_EVENTS,
  availabilityCheckEventParams,
  trackEvent,
} from "@/lib/analytics";
import {
  clearPostAvailabilityContext,
  getPostAvailabilityContext,
  setPostAvailabilityContext,
} from "@/lib/post-availability-context";
import { availabilityCompletedParams } from "@/lib/post-availability-analytics";
import { PublicAvailabilityResult } from "@/lib/public-availability-contract";
import { acquisitionContext, recordAvailabilityJourneyEvent } from "@/lib/availability-journey-client";

export type AvailabilityCheckOutcome =
  | { status: "available"; message: string; date: string }
  | { status: "unavailable"; message: string; date: string }
  | { status: "manual"; message: string; date: string }
  | { status: "error"; message: string; date: string };

const MANUAL_MESSAGE =
  "We couldn't confirm availability automatically. Please contact us directly.";
const REQUEST_TIMEOUT_MS = 12_000;

function analyticsStatus(
  status: AvailabilityCheckOutcome["status"],
): "available" | "unavailable" | "manual_confirmation_required" {
  if (status === "available") return "available";
  if (status === "unavailable") return "unavailable";
  return "manual_confirmation_required";
}

function trackAvailabilityStarted(analyticsSurface: string): void {
  const params = availabilityCheckEventParams(undefined, analyticsSurface);
  trackEvent(ANALYTICS_EVENTS.availabilityCheckStart, params, { deferUntilGtag: true });
  trackEvent(ANALYTICS_EVENTS.availabilityCheckStarted, params, { deferUntilGtag: true });
}

function trackAvailabilityCompleted(
  selectedDate: string,
  analyticsSurface: string,
  status: AvailabilityCheckOutcome["status"],
  durationMs: number,
): void {
  const legacyStatus = analyticsStatus(status);
  const legacyParams = availabilityCheckEventParams(
    legacyStatus,
    analyticsSurface,
  );
  trackEvent(ANALYTICS_EVENTS.availabilityCheckResult, legacyParams, { deferUntilGtag: true });

  const result =
    status === "error" ? "error" : (legacyStatus as "available" | "unavailable" | "manual_confirmation_required");

  const completedParams = availabilityCompletedParams({
    surface: analyticsSurface,
    weddingDate: selectedDate,
    result,
    durationMs,
  });

  trackEvent(ANALYTICS_EVENTS.availabilityCheckCompleted, completedParams, {
    deferUntilGtag: true,
  });

  if (status === "manual" || status === "error") {
    trackEvent(
      ANALYTICS_EVENTS.availabilityCheckFailedOrManual,
      completedParams,
      { deferUntilGtag: true },
    );
  }
}

/**
 * POST `/api/availability` (same-origin proxy to HSDJ Operations).
 * Caller owns UI loading state; fires analytics once per invocation.
 */
export async function runAvailabilityCheck(
  selectedDate: string,
  analyticsSurface: string,
  signal?: AbortSignal,
): Promise<AvailabilityCheckOutcome | null> {
  if (signal?.aborted) return null;
  const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();

  const previousJourney = getPostAvailabilityContext();
  if (previousJourney?.journeyId) {
    recordAvailabilityJourneyEvent({ journeyId: previousJourney.journeyId, eventType: "CHECK_REPEATED", pagePath: typeof window !== "undefined" ? window.location.pathname : undefined, surface: analyticsSurface });
  }
  clearPostAvailabilityContext();
  trackAvailabilityStarted(analyticsSurface);

  const requestController = new AbortController();
  const abortForCaller = () => requestController.abort();
  signal?.addEventListener("abort", abortForCaller, { once: true });
  if (signal?.aborted) requestController.abort();
  const timeout = setTimeout(() => requestController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch("/api/availability", {
      method: "POST",
      signal: requestController.signal,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
      body: JSON.stringify({ date: selectedDate, acquisition: acquisitionContext() }),
    });
    if (signal?.aborted) return null;

    const durationMs =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt;

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      if (signal?.aborted) return null;
      trackAvailabilityCompleted(selectedDate, analyticsSurface, "error", durationMs);
      return { status: "error", message: MANUAL_MESSAGE, date: selectedDate };
    }
    if (signal?.aborted) return null;

    if (typeof data !== "object" || data === null) {
      trackAvailabilityCompleted(selectedDate, analyticsSurface, "error", durationMs);
      return { status: "error", message: MANUAL_MESSAGE, date: selectedDate };
    }

    const body = data as {
      result?: string;
      message?: string;
      date?: string;
      available?: boolean;
      journeyId?: string;
    };

    if (body.date && body.date !== selectedDate) {
      trackAvailabilityCompleted(selectedDate, analyticsSurface, "manual", durationMs);
      return { status: "manual", message: MANUAL_MESSAGE, date: selectedDate };
    }

    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim()
        : MANUAL_MESSAGE;

    if (body.result === PublicAvailabilityResult.AVAILABLE && body.date === selectedDate) {
      setPostAvailabilityContext(selectedDate, body.journeyId);
      trackAvailabilityCompleted(selectedDate, analyticsSurface, "available", durationMs);
      return { status: "available", message, date: selectedDate };
    }

    if (body.result === PublicAvailabilityResult.UNAVAILABLE && body.date === selectedDate) {
      clearPostAvailabilityContext();
      trackAvailabilityCompleted(selectedDate, analyticsSurface, "unavailable", durationMs);
      return { status: "unavailable", message, date: selectedDate };
    }

    trackAvailabilityCompleted(selectedDate, analyticsSurface, "manual", durationMs);
    return { status: "manual", message, date: selectedDate };
  } catch {
    if (signal?.aborted) return null;
    const durationMs =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt;
    trackAvailabilityCompleted(selectedDate, analyticsSurface, "error", durationMs);
    return { status: "error", message: MANUAL_MESSAGE, date: selectedDate };
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abortForCaller);
  }
}
