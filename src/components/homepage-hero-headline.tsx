"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getHomepageVariant, type HeadlineVariant } from "@/lib/experiment";

const TAGLINE =
  "Squamish-based. Venue-ready. Drum & bass to disco. Your taste, mixed live.";

type Headlines = Readonly<Record<HeadlineVariant, string>>;

type Props = {
  headlines: Headlines;
};

export function HomepageHeroHeadline({ headlines }: Props) {
  const [variant, setVariant] = useState<HeadlineVariant>("A");

  useEffect(() => {
    const v = getHomepageVariant();
    // Start with the server-rendered A headline, then apply any stored experiment
    // variant after first paint. The primary message must never be visually hidden.
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- single sync from localStorage for A/B/C */
    setVariant(v);

    try {
      const dedupeKey = `hsdj_headline_view_${performance.timeOrigin}`;
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, "1");
    } catch {
      /* private mode / blocked storage, still track once below */
    }

    trackEvent(ANALYTICS_EVENTS.homepageHeadlineView, {
      variant: v,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, []);

  return (
    <div className="min-h-[8.5rem] sm:min-h-[9.5rem] lg:min-h-[11rem]">
      <h1
        className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl"
        suppressHydrationWarning
      >
        {headlines[variant]}
      </h1>
      <p
        className="mt-4 max-w-xl text-lg font-medium text-amber-200/90"
        suppressHydrationWarning
      >
        {TAGLINE}
      </p>
    </div>
  );
}
