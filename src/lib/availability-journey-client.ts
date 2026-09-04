"use client";

import { touchPostAvailabilityContext } from "@/lib/post-availability-context";

const ACQUISITION_KEY = "hsdj_acquisition_context";
export type AcquisitionContext = { entryPage: string; source: string; medium: string; campaign: string | null; deviceCategory: "mobile" | "tablet" | "desktop" | "unknown" };

function deviceCategory(): AcquisitionContext["deviceCategory"] {
  if (window.innerWidth <= 767) return "mobile";
  if (window.innerWidth <= 1024) return "tablet";
  return "desktop";
}

export function acquisitionContext(): AcquisitionContext {
  try { const stored = sessionStorage.getItem(ACQUISITION_KEY); if (stored) return JSON.parse(stored) as AcquisitionContext; } catch { /* fallback */ }
  const params = new URLSearchParams(location.search);
  const referrer = document.referrer;
  const organic = /google\.|bing\.|duckduckgo\.|search\.yahoo\./i.test(referrer);
  const context: AcquisitionContext = {
    entryPage: location.pathname,
    source: params.get("utm_source") ?? (organic ? "organic_search" : referrer ? new URL(referrer).hostname : "direct"),
    medium: params.get("utm_medium") ?? (organic ? "organic" : referrer ? "referral" : "none"),
    campaign: params.get("utm_campaign"),
    deviceCategory: deviceCategory(),
  };
  try { sessionStorage.setItem(ACQUISITION_KEY, JSON.stringify(context)); } catch { /* ignore */ }
  return context;
}

export function recordAvailabilityJourneyEvent(input: { journeyId: string; eventType: string; pagePath?: string; surface?: string; experimentVariant?: string }): void {
  touchPostAvailabilityContext();
  const body = JSON.stringify({ ...input, eventId: crypto.randomUUID(), occurredAt: new Date().toISOString() });
  if (navigator.sendBeacon) { navigator.sendBeacon("/api/availability-journey/event", new Blob([body], { type: "application/json" })); return; }
  void fetch("/api/availability-journey/event", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
}
