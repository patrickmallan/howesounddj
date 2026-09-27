"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
} from "@/components/book-consult-tracked-link";
import type { BookConsultSurface } from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import type { CheckAvailabilitySurface } from "@/components/check-availability-tracked-link";
import styles from "./cta-duo.module.css";

const duoChildLayout =
  `${styles.action} hsdj-physical-cta min-h-[76px] min-w-0 w-full justify-center text-center`;

function MiniCassette({ side }: { side: "A" | "B" }) {
  return (
    <span className={styles.cassette} aria-hidden="true">
      <i /><b /><i />
      <small>SIDE {side}</small>
    </span>
  );
}

type Props = {
  className?: string;
  tickerText?: string;
  credentials?: {
    googleLabel: string;
    reviewLabel: string;
    googleMapsUri: string;
    experienceLabel: string;
  };
  /** @default "page_cta" */
  bookSurface?: BookConsultSurface;
  /** @default "page_cta" */
  checkSurface?: CheckAvailabilitySurface;
};

/**
 * Standard paired CTAs: **Book a Consult** (Calendly Sound Check) + **Check Availability** (`/contact#availability`).
 * Side-by-side from `sm` up with equal flex width; stacked full-width on narrow screens.
 */
export default function CTADuo({
  className = "",
  tickerText = "Your date first. If it is open, let’s talk music. Press play when you’re ready.",
  credentials,
  bookSurface = "page_cta",
  checkSurface = "page_cta",
}: Props) {
  const machineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const machine = machineRef.current;
    if (!machine) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          machine.dataset.artReady = "true";
          machine.dataset.motionActive = "true";
          return;
        }
        delete machine.dataset.motionActive;
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(machine);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={machineRef} className={`${styles.machine} ${className}`.trim()}>
      <div className={styles.topline} aria-hidden="true">
        <span className={styles.power}><i /> Power</span>
        <b>Howe Sound Wedding DJ</b>
        <span className={styles.signalLights}><i /><i /><i /><i /><i /></span>
      </div>
      <div className={`hsdj-control-duo ${styles.bays}`}>
        <BookConsultTrackedLink surface={bookSurface} className={`${duoChildLayout} hsdj-physical-cta--play`}>
          <span className={styles.deckId}>Deck A</span>
          <MiniCassette side="A" />
          <Image
            src="/images/hsdj-redesign/controls/buttons/play-pause-round.png"
            alt=""
            width={112}
            height={112}
            className={`hsdj-physical-cta__hardware ${styles.hardware}`}
          />
          <span className={`hsdj-physical-cta__label ${styles.label}`}><small>Press play to</small>Book a consult</span>
        </BookConsultTrackedLink>
        <CheckAvailabilityTrackedLink
          href="/contact#availability"
          surface={checkSurface}
          className={`${bookConsultOutlineButtonClassName} ${duoChildLayout} hsdj-physical-cta--cue`}
        >
          <span className={styles.deckId}>Deck B</span>
          <MiniCassette side="B" />
          <Image
            src="/images/hsdj-redesign/controls/buttons/cue-round.png"
            alt=""
            width={112}
            height={112}
            className={`hsdj-physical-cta__hardware ${styles.hardware}`}
          />
          <span className={`hsdj-physical-cta__label ${styles.label}`}><small>Load your date</small>Check your date</span>
        </CheckAvailabilityTrackedLink>
      </div>
      <div className={styles.ticker} aria-label={`Stereo display: ${tickerText}`}>
        <div>
          <span>{tickerText}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          <span aria-hidden="true">{tickerText}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        </div>
      </div>
      {credentials ? (
        <div className={styles.credentials} aria-label="Howe Sound DJ credentials">
          <a href={credentials.googleMapsUri} target="_blank" rel="noreferrer">
            <i aria-hidden="true" />
            <b>{credentials.googleLabel}</b>
            <span>{credentials.reviewLabel}</span>
          </a>
          <span><i aria-hidden="true" /><b>{credentials.experienceLabel}</b><span>Music + live events</span></span>
        </div>
      ) : null}
    </div>
  );
}
