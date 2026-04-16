"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
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
  /** Defaults to `/contact`. Use `/contact#availability` or `#availability` where the UX requires it. */
  href?: string;
};

const DEFAULT_DESTINATION = "/contact";

/** When already on `/contact`, Next.js client navigation often does not scroll to the hash — handle explicitly. */
function hashIdForSamePageScroll(href: string, pathname: string): string | null {
  if (href.startsWith("#") && href.length > 1) {
    return href.slice(1);
  }
  const m = /^\/contact#(.+)$/.exec(href);
  if (m && pathname === "/contact") {
    return m[1];
  }
  return null;
}

export function CheckAvailabilityTrackedLink({ surface, className, children, href = "/contact" }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children ?? "Check Availability"}
    </Link>
  );
}
