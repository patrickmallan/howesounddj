"use client";

import type { ReactNode } from "react";
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

export function CheckAvailabilityTrackedLink({ surface, className, children, href = "/contact" }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.checkAvailabilityClick, {
          surface,
          destination: DEFAULT_DESTINATION,
          page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
          ...headlineVariantPayload(),
        });
      }}
    >
      {children ?? "Check Availability"}
    </Link>
  );
}
