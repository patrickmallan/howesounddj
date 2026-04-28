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

/** Default Calendly primary pill — always applied first on `BookConsultTrackedLink`; use for raw Calendly anchors too. */
const BOOK_CONSULT_PRIMARY_PILL_BASE =
  "inline-flex items-center justify-center min-h-[44px] rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_45px_rgba(250,204,21,0.2)] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/** Re-export for `<a href={CONSULT_CALENDLY_URL}>` (e.g. availability form) so Calendly matches the tracked link. */
export const bookConsultPrimaryButtonClassName = BOOK_CONSULT_PRIMARY_PILL_BASE;

/** Secondary CTA, matches outline pills used next to primary Check Availability across the site. */
export const bookConsultOutlineButtonClassName =
  `${CTA_PILL_FLEX_CENTER} min-h-[44px] rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5`;

type Props = {
  surface: BookConsultSurface;
  /** Appended after mandatory primary pill classes (width, sizing, grid cell stretch, etc.). */
  className?: string;
  children?: ReactNode;
};

export function BookConsultTrackedLink({ surface, className, children }: Props) {
  function handleClick() {
    trackEvent(ANALYTICS_EVENTS.bookConsultClick, {
      surface,
      intent: "direct_consult",
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  const merged = [BOOK_CONSULT_PRIMARY_PILL_BASE, "motion-interactive", className].filter(Boolean).join(" ");

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
