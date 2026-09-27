"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BookConsultTrackedLink } from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import styles from "./encore-cassette-deck.module.css";

function Speaker({ side }: { side: "left" | "right" }) {
  return <div className={`${styles.speaker} ${styles[side]}`} aria-hidden="true"><i /></div>;
}

function CassetteWindow({ side }: { side: "A" | "B" }) {
  return (
    <span className={styles.cassetteWindow} aria-hidden="true">
      <i className={styles.cassetteLabel}>HOWE SOUND / SIDE {side}</i>
      <i className={styles.reel}><i /></i>
      <i className={styles.tapePath} />
      <i className={styles.reel}><i /></i>
      <i className={styles.pressurePad} />
    </span>
  );
}

function TransportLights() {
  return (
    <span className={styles.transport} aria-hidden="true">
      <i>◀◀</i><i>■</i><i className={styles.play}>▶</i><i>●</i>
    </span>
  );
}

export function EncoreCassetteDeck() {
  const machine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = machine.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      element?.setAttribute("data-art-ready", "true");
      element?.setAttribute("data-motion-active", "true");
      return;
    }

    const artObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.setAttribute("data-art-ready", "true");
          artObserver.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    const motionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.setAttribute("data-motion-active", "true");
      else element.removeAttribute("data-motion-active");
    });

    artObserver.observe(element);
    motionObserver.observe(element);
    return () => {
      artObserver.disconnect();
      motionObserver.disconnect();
    };
  }, []);

  return (
    <div ref={machine} className={styles.machine}>
      <Speaker side="left" />
      <div className={styles.deckCore}>
        <div className={styles.topline}>
          <span className={styles.brandGroup}>
            <span className={styles.powerIndicator}><i /> POWER</span>
            <Image className={styles.brandMascot} src="/images/hsdj-redesign/cassette/hsdj-sasquatch-pointing-mark-v1.webp" alt="" width={1145} height={1374} aria-hidden="true" />
            <span className={styles.manufacturer}>HOWE SOUND <b>WEDDING DJ</b></span>
          </span>
          <span className={styles.ready}><i /> READY</span>
        </div>

        <div className={styles.display} aria-hidden="true">
          <span className={styles.sprayCyan}>SIDE A</span>
          <b className={styles.sprayBlue}>CONSULT</b>
          <i className={styles.sprayYellow}>00:45</i>
          <b className={styles.sprayRed}>DATE CHECK</b>
          <span className={styles.sprayCyan}>SIDE B</span>
        </div>

        <div className={styles.bays}>
          <BookConsultTrackedLink surface="page_cta" className={`${styles.deckAction} ${styles.consult}`}>
            <span className={styles.deckNumber}>DECK A</span>
            <CassetteWindow side="A" />
            <span className={styles.actionLabel}>
              <small>Press play to</small>
              <strong>Book a consult</strong>
              <span className={styles.ctaButton} aria-hidden="true"><i>▶</i><small>CLICK</small></span>
            </span>
            <TransportLights />
          </BookConsultTrackedLink>
          <CheckAvailabilityTrackedLink href="/contact#availability" surface="page_cta" className={`${styles.deckAction} ${styles.date}`}>
            <span className={styles.deckNumber}>DECK B</span>
            <CassetteWindow side="B" />
            <span className={styles.actionLabel}>
              <small>Load your date</small>
              <strong>Check your date</strong>
              <span className={styles.ctaButton} aria-hidden="true"><i>▶</i><small>CLICK</small></span>
            </span>
            <TransportLights />
          </CheckAvailabilityTrackedLink>
        </div>

        <div className={styles.lowerStrip}>
          <span className={styles.volume} aria-hidden="true"><Image src="/images/hsdj-redesign/controls/rotary/color-silver.png" alt="" width={92} height={92} /><small>OUTPUT</small></span>
          <p><b>45 MINUTES.</b> No pressure. Just a chance to meet, talk music, and see if we click.</p>
          <span className={styles.volume} aria-hidden="true"><Image src="/images/hsdj-redesign/controls/rotary/color-silver.png" alt="" width={92} height={92} /><small>LEVEL</small></span>
        </div>
      </div>
      <Speaker side="right" />
    </div>
  );
}
