"use client";

import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

const trioChildLayout =
  "inline-flex min-h-[44px] min-w-0 w-full flex-1 items-center justify-center text-center md:flex-1 md:w-0";

/**
 * Contact hero + finale: Book a Consult (primary), Check Availability (outline), Send a Message (outline).
 * Stacked full-width on narrow viewports; one row from `md` when space allows.
 */
export function ContactPageCtaTrio() {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row md:flex-nowrap">
      <BookConsultTrackedLink surface="contact_page_primary" className={trioChildLayout} />
      <CheckAvailabilityTrackedLink
        href="/contact#availability"
        surface="page_cta"
        className={`${bookConsultOutlineButtonClassName} ${trioChildLayout}`}
      />
      <a
        href="#send-message"
        className={`${bookConsultOutlineButtonClassName} ${trioChildLayout}`}
      >
        Send a Message Instead
      </a>
    </div>
  );
}
