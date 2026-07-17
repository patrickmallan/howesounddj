/**
 * GA4 custom events, only fire when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and gtag is loaded.
 * Event names are stable for reports and explorations.
 */

import { isPostAvailabilityContextActive } from "@/lib/post-availability-context";

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
  /** Contact form: calendar outcome resolved (`availability_status`: available | unavailable | manual_confirmation_required). */
  availabilityCheckResult: "availability_check_result",
  contactFormStart: "contact_form_start",
  /** Trust-surface navigation while post-availability session context is active. */
  postAvailabilityTrustClick: "post_availability_trust_click",
} as const;

export type FunnelContext =
  | "homepage"
  | "post_availability"
  | "header_availability_panel"
  | "reviews"
  | "about"
  | "packages"
  | "venues"
  | "stories"
  | "guides"
  | "direct";

/** GA4 DebugView: development only, or when `NEXT_PUBLIC_GA_DEBUG=true`. */
export function gaDebugModeParam(): Record<string, boolean> | Record<string, never> {
  const enabled =
    process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_GA_DEBUG === "true";
  return enabled ? { debug_mode: true } : {};
}

function funnelContextFromPath(path: string): FunnelContext | null {
  if (path === "/") return "homepage";
  if (path === "/reviews" || path.startsWith("/reviews/")) return "reviews";
  if (path === "/about" || path.startsWith("/about/")) return "about";
  if (path === "/packages" || path.startsWith("/packages/")) return "packages";
  if (path === "/venues" || path.startsWith("/venues/")) return "venues";
  if (path === "/stories" || path.startsWith("/stories/")) return "stories";
  if (path === "/guides" || path.startsWith("/guides/")) return "guides";
  return null;
}

/** Page- or session-aware consult attribution (`funnel_context`). */
export function resolveFunnelContext(pathname?: string): FunnelContext {
  const path =
    pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");
  const fromPage = funnelContextFromPath(path);
  if (fromPage) return fromPage;
  if (isPostAvailabilityContextActive() && (path === "/contact" || path.startsWith("/contact/"))) {
    return "post_availability";
  }
  return "direct";
}

export function consultClickEventParams(
  params: Record<string, string | number | boolean | undefined>
): Record<string, string | number | boolean | undefined> {
  const page_path = typeof window !== "undefined" ? window.location.pathname : undefined;
  const explicit = params.funnel_context;
  const funnel_context =
    typeof explicit === "string" ? (explicit as FunnelContext) : resolveFunnelContext();
  const rest = { ...params };
  delete rest.funnel_context;
  return {
    ...rest,
    funnel_context,
    page_path,
  };
}

/** Shared fields for `availability_check_start` / `availability_check_result` (client-only callers). */
export function availabilityCheckEventParams(
  dateSelected: string,
  availabilityStatus?: "available" | "unavailable" | "manual_confirmation_required",
  surface?: string
): Record<string, string | number | boolean | undefined> {
  const page_path = typeof window !== "undefined" ? window.location.pathname : "";
  const out: Record<string, string | number | boolean | undefined> = {
    date_selected: dateSelected,
    page_path,
    ...gaDebugModeParam(),
  };
  if (surface) out.surface = surface;
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
      // gtag present but threw, ignore
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
