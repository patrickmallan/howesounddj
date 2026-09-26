"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getHomepageVariant, type HeadlineVariant } from "@/lib/experiment";
import { FixtureLensHeading } from "@/components/fixture-lens-heading";
import styles from "./homepage-hero-headline.module.css";

const TAGLINE = "The classics, the curveballs, and the songs your people lose it to. All in one very good night.";
const APPROVED_HEADLINE = "Your wedding. A variety of the best.";
const LED_LINES = [1, 2, 3, 4] as const;

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
    <div>
      {headlines[variant] === APPROVED_HEADLINE ? (
        <link
          rel="preload"
          as="image"
          href="/images/hsdj-redesign/hero/home-headline-complete-mobile-optimized.webp"
          media="(max-width: 700px)"
        />
      ) : null}
      {headlines[variant] === APPROVED_HEADLINE ? (
        <link
          rel="preload"
          as="image"
          href="/images/hsdj-redesign/hero/home-headline-complete-optimized.webp"
          media="(min-width: 701px)"
        />
      ) : null}
      {headlines[variant] === APPROVED_HEADLINE ? (
        <h1 className={styles.heading}>
          <span className={styles.semanticText}>{headlines[variant]}</span>
          {LED_LINES.map((line, index) => (
            <span
              aria-hidden="true"
              className={styles.line}
              key={line}
              style={{
                animationDelay: `${index * 105}ms`,
                clipPath: `inset(${index * 25}% 0 ${75 - index * 25}% 0)`,
              }}
            />
          ))}
        </h1>
      ) : (
        <FixtureLensHeading
          text={headlines[variant]}
          lines={["Your", "wedding.", "A variety", "of the best."]}
          className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl"
        />
      )}
      <p
        className="mt-4 max-w-xl text-lg font-medium text-amber-200/90"
        suppressHydrationWarning
      >
        {TAGLINE}
      </p>
    </div>
  );
}
