import {
  ANALYTICS_EVENTS,
  availabilityCheckEventParams,
  trackEvent,
} from "@/lib/analytics";
import {
  clearPostAvailabilityContext,
  setPostAvailabilityContext,
} from "@/lib/post-availability-context";

export type AvailabilityCheckOutcome =
  | { status: "available"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

const FALLBACK_MESSAGE = "That date could not be checked. Try again in a moment.";
const NETWORK_MESSAGE = "Something went wrong checking the date. Please try again.";

/**
 * POST `/api/availability` with shared analytics and post-availability context.
 * Caller owns UI loading state; this fires start/result events once per invocation.
 */
export async function runAvailabilityCheck(
  selectedDate: string,
  analyticsSurface: string
): Promise<AvailabilityCheckOutcome> {
  clearPostAvailabilityContext();
  trackEvent(
    ANALYTICS_EVENTS.availabilityCheckStart,
    availabilityCheckEventParams(selectedDate, undefined, analyticsSurface),
    { deferUntilGtag: true }
  );

  try {
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      trackUnavailable(selectedDate, analyticsSurface);
      return { status: "unavailable", message: FALLBACK_MESSAGE };
    }

    if (typeof data !== "object" || data === null) {
      trackUnavailable(selectedDate, analyticsSurface);
      return { status: "unavailable", message: FALLBACK_MESSAGE };
    }

    const body = data as { success?: boolean; available?: boolean; message?: string };

    if (!res.ok || body.success === false) {
      trackUnavailable(selectedDate, analyticsSurface);
      return {
        status: "unavailable",
        message: body.message ?? FALLBACK_MESSAGE,
      };
    }

    if (typeof body.available !== "boolean") {
      trackUnavailable(selectedDate, analyticsSurface);
      return { status: "unavailable", message: FALLBACK_MESSAGE };
    }

    if (body.available === false) {
      clearPostAvailabilityContext();
      trackEvent(
        ANALYTICS_EVENTS.availabilityCheckResult,
        availabilityCheckEventParams(selectedDate, "unavailable", analyticsSurface),
        { deferUntilGtag: true }
      );
      return {
        status: "unavailable",
        message: body.message ?? "That date is not available.",
      };
    }

    setPostAvailabilityContext(selectedDate);
    trackEvent(
      ANALYTICS_EVENTS.availabilityCheckResult,
      availabilityCheckEventParams(selectedDate, "available", analyticsSurface),
      { deferUntilGtag: true }
    );
    return {
      status: "available",
      message: body.message ?? "That date looks open.",
    };
  } catch {
    return { status: "error", message: NETWORK_MESSAGE };
  }
}

function trackUnavailable(selectedDate: string, analyticsSurface: string): void {
  clearPostAvailabilityContext();
  trackEvent(
    ANALYTICS_EVENTS.availabilityCheckResult,
    availabilityCheckEventParams(selectedDate, "unavailable", analyticsSurface),
    { deferUntilGtag: true }
  );
}
