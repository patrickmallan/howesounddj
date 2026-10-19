"use client";

import type { MouseEvent, ReactNode } from "react";
import { ANALYTICS_EVENTS, consultClickEventParams, trackEvent } from "@/lib/analytics";
import { CTA_PILL_FLEX_CENTER } from "@/lib/cta-alignment";
import { PUBLIC_SOUND_CHECK_CTA_LABEL } from "@/lib/consult-calendly";
import { isJourneyPagePath } from "@/lib/availability-journey-event";

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
  /** Primary Sound Check CTAs on `/contact` (hero and consult-first panel). */
  | "contact_page_primary";

/** Default Calendly primary pill, always applied first on `BookConsultTrackedLink`; use for raw Calendly anchors too. */
const BOOK_CONSULT_PRIMARY_PILL_BASE =
  "inline-flex items-center justify-center min-h-[44px] rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_45px_rgba(250,204,21,0.2)] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/** Shared presentation for the scheduling handoff link. */
export const bookConsultPrimaryButtonClassName = BOOK_CONSULT_PRIMARY_PILL_BASE;

/** Secondary CTA, matches outline pills used next to primary Check Availability across the site. */
export const bookConsultOutlineButtonClassName =
  `${CTA_PILL_FLEX_CENTER} min-h-[44px] rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5`;

type Props = {
  surface: BookConsultSurface;
  /** Use the shared compact hardware treatment instead of the default pill. */
  visualStyle?: "pill" | "controller";
  /** Appended after the selected base style (width, sizing, grid cell stretch, etc.). */
  className?: string;
  children?: ReactNode;
};

export function BookConsultTrackedLink({ surface, visualStyle = "pill", className, children }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const pagePath = window.location.pathname;
    if (isJourneyPagePath(pagePath)) {
      event.currentTarget.href = `/go/consult?${new URLSearchParams({ surface, page: pagePath })}`;
    }
    trackEvent(
      ANALYTICS_EVENTS.bookConsultClick,
      consultClickEventParams({
        surface,
        intent: "direct_consult",
      })
    );
  }

  const merged = [visualStyle === "pill" ? BOOK_CONSULT_PRIMARY_PILL_BASE : "", "motion-interactive", className].filter(Boolean).join(" ");

  return (
    <a
      href={`/go/consult?${new URLSearchParams({ surface })}`}
      target="_blank"
      rel="noopener noreferrer"
      className={merged}
      onClick={handleClick}
    >
      {children ?? PUBLIC_SOUND_CHECK_CTA_LABEL}
    </a>
  );
}
