/**
 * GA4 custom events, only fire when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and gtag is loaded.
 * Event names are stable for reports and explorations.
 */

/**
 * Custom events fired from the contact inquiry form on `/contact` after availability passes.
 * Names are stable for GA4 reports and explorations.
 */
export const ANALYTICS_EVENTS = {
  homepageHeadlineView: "homepage_headline_view",
  bookConsultClick: "book_consult_click",
  contactFormSubmitAttempt: "contact_form_submit_attempt",
  contactFormSubmitSuccess: "contact_form_submit_success",
  /** Fires on successful POST to `/api/contact` (both inquiry forms). */
  contactFormSubmit: "contact_form_submit",
  contactFormSubmitError: "contact_form_submit_error",
  calendlyClick: "calendly_click",
  checkAvailabilityClick: "check_availability_click",
  /** Contact form: POST to `/api/availability` begins (valid `YYYY-MM-DD` only). */
  availabilityCheckStart: "availability_check_start",
  /** Contact form: calendar outcome resolved (`availability_status`: available | unavailable only). */
  availabilityCheckResult: "availability_check_result",
  contactFormStart: "contact_form_start",
} as const;

/** Shared fields for `availability_check_start` / `availability_check_result` (client-only callers). */
export function availabilityCheckEventParams(
  dateSelected: string,
  availabilityStatus?: "available" | "unavailable"
): Record<string, string | number | boolean | undefined> {
  const page_path = typeof window !== "undefined" ? window.location.pathname : "";
  const out: Record<string, string | number | boolean | undefined> = {
    date_selected: dateSelected,
    page_path,
    // TEMP: always set so GA4 DebugView shows live production availability hits; revert to env/hostname-only when validated.
    debug_mode: true,
  };
  if (availabilityStatus !== undefined) {
    out.availability_status = availabilityStatus;
  }
  return out;
}

type TrackEventOptions = {
  /**
   * Wait until `window.gtag` exists (e.g. gtag.js still loading after `next/script`).
   * Fires at most once; no-ops if GA env is unset or gtag never appears.
   */
  deferUntilGtag?: boolean;
};

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: TrackEventOptions
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;

  const send = () => {
    if (typeof window.gtag !== "function") return;
    if (process.env.NODE_ENV === "development") {
      if (
        eventName === ANALYTICS_EVENTS.availabilityCheckStart ||
        eventName === ANALYTICS_EVENTS.availabilityCheckResult
      ) {
        console.info("[ga availability]", eventName, params ?? {});
      }
    }
    try {
      window.gtag("event", eventName, params ?? {});
    } catch {
      // gtag present but threw — ignore
    }
  };

  if (options?.deferUntilGtag) {
    let attempts = 0;
    const maxAttempts = 80;
    const intervalMs = 50;
    const run = () => {
      if (typeof window.gtag === "function") {
        send();
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(run, intervalMs);
      }
    };
    run();
    return;
  }

  send();
}
