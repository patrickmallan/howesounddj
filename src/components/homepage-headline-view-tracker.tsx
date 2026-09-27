"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { HOMEPAGE_VARIANT_STORAGE_KEY } from "@/lib/experiment";

export function HomepageHeadlineViewTracker() {
  useEffect(() => {
    try {
      // The former A/B/C options now share one approved headline. Keep the
      // analytics dimension stable without hydrating alternate visual systems.
      localStorage.setItem(HOMEPAGE_VARIANT_STORAGE_KEY, "A");
      const dedupeKey = `hsdj_headline_view_${performance.timeOrigin}`;
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, "1");
    } catch {
      // Private mode or blocked storage must not prevent the view event.
    }

    trackEvent(ANALYTICS_EVENTS.homepageHeadlineView, {
      variant: "A",
      page_path: window.location.pathname,
    });
  }, []);

  return null;
}
