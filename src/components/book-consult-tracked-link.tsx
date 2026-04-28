"use client";

import type { ReactNode } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";

export type BookConsultSurface =
  | "hero"
  | "inline"
  | "page_cta"
  | "venues_hub"
  | "venue_hero"
  | "venue_page_cta"
  | "footer"
  | "explore_card"
  | "contact_page"
  /** Primary Book a Consult CTAs on `/contact` (hero and consult-first panel). */
  | "contact_page_primary";

/** Primary CTA, amber pill aligned with Check Availability styling across the site. */
export const bookConsultPrimaryButtonClassName =
  `${CTA_PILL_FLEX_CENTER} min-h-[44px] rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]`;

/** Secondary CTA, matches outline pills used next to primary Check Availability across the site. */
export const bookConsultOutlineButtonClassName =
  `${CTA_PILL_FLEX_CENTER} min-h-[44px] rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5`;

type Props = {
  surface: BookConsultSurface;
  className?: string;
  children?: ReactNode;
  /** See `CheckAvailabilityTrackedLink`, use `card` for homepage Explore tiles. */
  visualLayout?: "pill" | "card";
};

export function BookConsultTrackedLink({ surface, className, children, visualLayout = "pill" }: Props) {
  function handleClick() {
    trackEvent(ANALYTICS_EVENTS.bookConsultClick, {
      surface,
      intent: "direct_consult",
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  const alignClass = visualLayout === "card" ? "text-left" : CTA_PILL_FLEX_CENTER;
  const merged = [alignClass, "motion-interactive", className].filter(Boolean).join(" ");

  return (
    <a
      href={CONSULT_CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={merged}
      onClick={handleClick}
    >
      {children ?? "Book a Consult"}
    </a>
  );
}
