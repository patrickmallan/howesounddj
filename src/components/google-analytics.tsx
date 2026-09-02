"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

type GoogleAnalyticsProps = {
  /** GA4 measurement ID (e.g. `G-XXXXXXXXXX`). Omit or empty to disable all analytics. */
  gaId: string | undefined;
};

/**
 * Loads gtag.js once and sends explicit `page_view` events on initial load and client navigations.
 * Bootstrap keeps `send_page_view: false` so config updates alone never silently drop page views.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 200;

    const trySend = () => {
      if (cancelled) return;
      if (typeof window.gtag === "function") {
        trackPageView(pathname);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(trySend, 50);
      }
    };

    trySend();
    return () => {
      cancelled = true;
    };
  }, [pathname, gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
