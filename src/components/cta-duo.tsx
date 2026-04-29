"use client";

import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
} from "@/components/book-consult-tracked-link";
import type { BookConsultSurface } from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import type { CheckAvailabilitySurface } from "@/components/check-availability-tracked-link";

const duoChildLayout =
  "min-h-[44px] min-w-0 w-full flex-1 justify-center text-center sm:flex-1 sm:w-0";

type Props = {
  className?: string;
  /** @default "page_cta" */
  bookSurface?: BookConsultSurface;
  /** @default "page_cta" */
  checkSurface?: CheckAvailabilitySurface;
};

/**
 * Standard paired CTAs: **Book a Consult** (Calendly) + **Check Availability** (`/contact#availability`).
 * Side-by-side from `sm` up with equal flex width; stacked full-width on narrow screens.
 */
export default function CTADuo({
  className = "",
  bookSurface = "page_cta",
  checkSurface = "page_cta",
}: Props) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:flex-row sm:flex-nowrap ${className}`.trim()}>
      <BookConsultTrackedLink surface={bookSurface} className={duoChildLayout} />
      <CheckAvailabilityTrackedLink
        href="/contact#availability"
        surface={checkSurface}
        className={`${bookConsultOutlineButtonClassName} ${duoChildLayout}`}
      />
    </div>
  );
}
