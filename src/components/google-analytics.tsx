"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type GoogleAnalyticsProps = {
  /** GA4 measurement ID (e.g. `G-XXXXXXXXXX`). Omit or empty to disable all analytics. */
  gaId: string | undefined;
};

function sendPagePath(gaId: string, pathname: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", gaId, { page_path: pathname });
}

/**
 * Loads gtag.js once and sends `page_path` on initial load and on client-side navigations.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 80;

    const trySend = () => {
      if (cancelled) return;
      if (typeof window.gtag === "function") {
        sendPagePath(gaId, pathname);
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
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
