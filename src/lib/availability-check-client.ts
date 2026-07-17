import {
  ANALYTICS_EVENTS,
  availabilityCheckEventParams,
  trackEvent,
} from "@/lib/analytics";
import {
  clearPostAvailabilityContext,
  setPostAvailabilityContext,
} from "@/lib/post-availability-context";
import { PublicAvailabilityResult } from "@/lib/public-availability-contract";

export type AvailabilityCheckOutcome =
  | { status: "available"; message: string; date: string }
  | { status: "unavailable"; message: string; date: string }
  | { status: "manual"; message: string; date: string }
  | { status: "error"; message: string; date: string };

const MANUAL_MESSAGE =
  "We couldn't confirm availability automatically. Please contact us directly.";

function analyticsStatus(
  status: AvailabilityCheckOutcome["status"],
): "available" | "unavailable" | "manual_confirmation_required" {
  if (status === "available") return "available";
  if (status === "unavailable") return "unavailable";
  return "manual_confirmation_required";
}

/**
 * POST `/api/availability` (same-origin proxy to HSDJ Operations).
 * Caller owns UI loading state; fires analytics once per invocation.
 */
export async function runAvailabilityCheck(
  selectedDate: string,
  analyticsSurface: string,
): Promise<AvailabilityCheckOutcome> {
  clearPostAvailabilityContext();
  trackEvent(
    ANALYTICS_EVENTS.availabilityCheckStart,
    availabilityCheckEventParams(selectedDate, undefined, analyticsSurface),
    { deferUntilGtag: true },
  );

  try {
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
      body: JSON.stringify({ date: selectedDate }),
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return trackAndReturnManual(selectedDate, analyticsSurface);
    }

    if (typeof data !== "object" || data === null) {
      return trackAndReturnManual(selectedDate, analyticsSurface);
    }

    const body = data as {
      result?: string;
      message?: string;
      date?: string;
      available?: boolean;
    };

    if (body.date && body.date !== selectedDate) {
      return trackAndReturnManual(selectedDate, analyticsSurface);
    }

    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim()
        : MANUAL_MESSAGE;

    if (body.result === PublicAvailabilityResult.AVAILABLE && body.date === selectedDate) {
      setPostAvailabilityContext(selectedDate);
      trackEvent(
        ANALYTICS_EVENTS.availabilityCheckResult,
        availabilityCheckEventParams(selectedDate, "available", analyticsSurface),
        { deferUntilGtag: true },
      );
      return { status: "available", message, date: selectedDate };
    }

    if (body.result === PublicAvailabilityResult.UNAVAILABLE && body.date === selectedDate) {
      clearPostAvailabilityContext();
      trackEvent(
        ANALYTICS_EVENTS.availabilityCheckResult,
        availabilityCheckEventParams(selectedDate, "unavailable", analyticsSurface),
        { deferUntilGtag: true },
      );
      return { status: "unavailable", message, date: selectedDate };
    }

    return trackAndReturnManual(selectedDate, analyticsSurface, message);
  } catch {
    return trackAndReturnManual(selectedDate, analyticsSurface);
  }
}

function trackAndReturnManual(
  selectedDate: string,
  analyticsSurface: string,
  message = MANUAL_MESSAGE,
): AvailabilityCheckOutcome {
  clearPostAvailabilityContext();
  trackEvent(
    ANALYTICS_EVENTS.availabilityCheckResult,
    availabilityCheckEventParams(
      selectedDate,
      analyticsStatus("manual"),
      analyticsSurface,
    ),
    { deferUntilGtag: true },
  );
  return { status: "manual", message, date: selectedDate };
}
