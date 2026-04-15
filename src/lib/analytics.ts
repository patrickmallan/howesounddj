/**
 * GA4 custom events — only fire when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and gtag is loaded.
 * Event names are stable for reports and explorations.
 */

/**
 * Custom events fired from the contact inquiry form on `/contact` after availability passes.
 * Names are stable for GA4 reports and explorations.
 */
export const ANALYTICS_EVENTS = {
  contactFormSubmitAttempt: "contact_form_submit_attempt",
  contactFormSubmitSuccess: "contact_form_submit_success",
  contactFormSubmitError: "contact_form_submit_error",
} as const;

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}
