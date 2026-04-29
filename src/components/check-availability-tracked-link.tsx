"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";
import { headlineVariantPayload } from "@/lib/experiment";

export type CheckAvailabilitySurface =
  | "header"
  | "footer"
  | "hero"
  | "inline"
  | "page_cta"
  | "venues_hub"
  | "venue_hero"
  | "venue_page_cta";

type Props = {
  surface: CheckAvailabilitySurface;
  className?: string;
  children?: ReactNode;
  /** Runs first on click (e.g. close mobile menu) before analytics and navigation. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Defaults to `/contact`. Use `/contact#availability` or `#availability` where the UX requires it. */
  href?: string;
  /**
   * `pill` (default): inline-flex centering for rounded CTAs.
   * `card`: full-width explore tiles, omit inline-flex; use `text-left` with caller `flex flex-col`.
   */
  visualLayout?: "pill" | "card";
};

const DEFAULT_DESTINATION = "/contact";

/** When already on `/contact`, Next.js client navigation often does not scroll to the hash, handle explicitly. */
function hashIdForSamePageScroll(href: string, pathname: string): string | null {
  if (href.startsWith("#") && href.length > 1) {
    return href.slice(1);
  }
  const m = /^\/contact#(.+)$/.exec(href);
  if (m && pathname === "/contact") {
    return m[1];
  }
  // Default `/contact` links (header/footer) on the contact page: same-route navigation is a no-op, scroll to availability.
  if (href === "/contact" && pathname === "/contact") {
    return "availability";
  }
  return null;
}

export function CheckAvailabilityTrackedLink({
  surface,
  className,
  children,
  href = "/contact",
  visualLayout = "pill",
  onClick,
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    trackEvent(ANALYTICS_EVENTS.checkAvailabilityClick, {
      surface,
      destination: DEFAULT_DESTINATION,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...headlineVariantPayload(),
    });

    if (typeof window === "undefined") return;
    const hashId = hashIdForSamePageScroll(href, window.location.pathname);
    if (!hashId) return;

    const el = document.getElementById(hashId);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}#${hashId}`);
  };

  const alignClass = visualLayout === "card" ? "text-left" : CTA_PILL_FLEX_CENTER;
  /** `className` last so callers can override layout/display (e.g. responsive `hidden`) without losing to `inline-flex` from `alignClass`. */
  const mergedClass = [alignClass, "motion-interactive", className].filter(Boolean).join(" ");

  return (
    <Link href={href} className={mergedClass} onClick={handleClick}>
      {children ?? "Check Availability"}
    </Link>
  );
}
