"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";
import { webVitalEventPayload } from "@/lib/web-vitals-event";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

// Keep this callback outside the component so Next does not report duplicate metrics.
const reportWebVital: ReportWebVitalsCallback = (metric) => {
  const payload = webVitalEventPayload(metric, window.location.pathname);
  if (!payload) return;

  trackEvent("web_vital", payload, { deferUntilGtag: true, deferTimeoutMs: 15_000 });
};

/** Uses the site's existing optional GA4 connection; no new endpoint or account. */
export function WebVitalsReporter() {
  useReportWebVitals(reportWebVital);
  return null;
}
