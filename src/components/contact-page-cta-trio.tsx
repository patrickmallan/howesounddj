"use client";

import {
  BookConsultTrackedLink,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ControllerButtonFace } from "@/components/controller-button-face";

const trioChildLayout = "hsdj-controller-button min-w-0 w-full flex-1 md:w-0";

/**
 * Contact “Start here” + bottom finale: Book a Consult (primary), Check Availability (outline), Send a Message (outline).
 * Stacked full-width on narrow viewports; one row from `md` when space allows.
 */
export function ContactPageCtaTrio() {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row md:flex-nowrap">
      <BookConsultTrackedLink surface="contact_page_primary" visualStyle="controller" className={`${trioChildLayout} hsdj-controller-button--play`}>
        <ControllerButtonFace eyebrow="Press play to" label="Book a consult" control="play" />
      </BookConsultTrackedLink>
      <CheckAvailabilityTrackedLink
        href="/contact#availability"
        surface="page_cta"
        className={`${trioChildLayout} hsdj-controller-button--cue`}
      >
        <ControllerButtonFace eyebrow="Load your date" label="Check your date" control="cue" />
      </CheckAvailabilityTrackedLink>
      <a
        href="#send-message"
        className={`${trioChildLayout} hsdj-controller-button--message`}
      >
        <ControllerButtonFace eyebrow="Drop me a line" label="Send a message" control="message" />
      </a>
    </div>
  );
}
