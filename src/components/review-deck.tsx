"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useState } from "react";
import styles from "./review-deck.module.css";

type ReviewTrack = {
  id: string;
  reviewerName: string;
  quote: string;
  venue?: string;
};

type Props = {
  reviews: readonly ReviewTrack[];
};

const METER_SEGMENTS = 24;

export function ReviewDeck({ reviews }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragLevel, setDragLevel] = useState<number | null>(null);
  const last = Math.max(0, reviews.length - 1);
  const review = reviews[active];
  const reviewLevel = last > 0 ? 8 + (active / last) * 84 : 74;
  const level = dragLevel ?? reviewLevel;
  const litSegments = Math.round((level / 100) * METER_SEGMENTS);
  const quoteSizeClass = review.quote.length > 230
    ? styles.longQuote
    : review.quote.length > 150
      ? styles.mediumQuote
      : "";

  useEffect(() => {
    if (paused || dragLevel !== null || reviews.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviews.length), 5600);
    return () => window.clearInterval(timer);
  }, [dragLevel, paused, reviews.length]);

  if (!review) return null;

  const selectFromFader = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const requestedLevel = Math.max(8, Math.min(92, 100 - ((event.clientY - bounds.top) / bounds.height) * 100));
    const normalized = Math.max(0, Math.min(1, (requestedLevel - 8) / 84));
    setDragLevel(requestedLevel);
    setActive(Math.round(normalized * last));
  };

  const handleFaderKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((current) => (current + 1) % reviews.length);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((current) => (current - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <div className={`${styles.deck} ${dragLevel === null ? "" : styles.isDragging}`.trim()} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className={styles.display}>
        <blockquote className={quoteSizeClass} key={review.id}>
          <p>“{review.quote}”</p>
          <cite>{review.reviewerName}{review.venue ? ` / ${review.venue}` : ""}</cite>
        </blockquote>
      </div>

      <div className={styles.channelStrip} style={{ "--review-level": `${level}%` } as CSSProperties}>
        <div className={styles.meter} aria-hidden="true">
          <span className={styles.meterScale}><i>+6</i><i>0</i><i>-6</i><i>-12</i><i>-24</i></span>
          <span className={styles.meterLeds}>
            {Array.from({ length: METER_SEGMENTS }, (_, index) => <i className={index < litSegments ? styles.lit : undefined} key={index} />)}
          </span>
          <b>LEVEL</b>
        </div>
        <div
          className={`${styles.upFader} ${dragLevel === null ? "" : styles.dragging}`.trim()}
          role="slider"
          aria-label="Choose a customer review"
          aria-valuemin={1}
          aria-valuemax={reviews.length}
          aria-valuenow={active + 1}
          aria-valuetext={`${review.reviewerName}, level ${level}`}
          tabIndex={0}
          onKeyDown={handleFaderKey}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            selectFromFader(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) selectFromFader(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            setDragLevel(null);
          }}
          onPointerCancel={() => setDragLevel(null)}
        >
          <div className={styles.verticalRail} aria-hidden="true" />
          <span className={styles.faderCap} aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </div>

      <div className={`${styles.trackList} ${reviews.length <= 3 ? styles.compactTracks : ""}`.trim()} aria-label="Customer review tracks">
        {reviews.map((item, index) => (
          <button className={index === active ? styles.active : ""} key={item.id} type="button" onClick={() => setActive(index)} aria-pressed={index === active}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.reviewerName}</b>
          </button>
        ))}
      </div>
    </div>
  );
}
