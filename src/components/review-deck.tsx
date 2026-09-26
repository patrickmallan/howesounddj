"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useId, useState } from "react";
import styles from "./review-deck.module.css";

type ReviewTrack = {
  id: string;
  reviewerName: string;
  quote: string;
  compactExcerpt?: string;
  venue?: string;
};

type Props = {
  reviews: readonly ReviewTrack[];
};

const METER_SEGMENTS = 24;

export function ReviewDeck({ reviews }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [dragLevel, setDragLevel] = useState<number | null>(null);
  const guideId = useId();
  const reviewPairs = Array.from({ length: Math.ceil(reviews.length / 2) }, (_, index) => reviews.slice(index * 2, index * 2 + 2));
  const last = Math.max(0, reviewPairs.length - 1);
  const activePair = reviewPairs[active];
  const reviewLevel = last > 0 ? 8 + (active / last) * 84 : 74;
  const level = dragLevel ?? reviewLevel;
  const litSegments = Math.round((level / 100) * METER_SEGMENTS);

  useEffect(() => {
    if (paused || userSelected || dragLevel !== null || reviewPairs.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviewPairs.length), 5600);
    return () => window.clearInterval(timer);
  }, [dragLevel, paused, reviewPairs.length, userSelected]);

  if (!activePair?.length) return null;

  const selectFromFader = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const requestedLevel = Math.max(8, Math.min(92, 100 - ((event.clientY - bounds.top) / bounds.height) * 100));
    const normalized = Math.max(0, Math.min(1, (requestedLevel - 8) / 84));
    setDragLevel(requestedLevel);
    setActive(Math.round(normalized * last));
    setUserSelected(true);
  };

  const handleFaderKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((current) => (current + 1) % reviewPairs.length);
      setUserSelected(true);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((current) => (current - 1 + reviewPairs.length) % reviewPairs.length);
      setUserSelected(true);
    }
  };

  return (
    <div className={`${styles.deck} ${dragLevel === null ? "" : styles.isDragging}`.trim()} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <p className={styles.mobileGuide} id={guideId}><b>Slide the channel fader</b> to hear two more couples. <span>Pair {active + 1} of {reviewPairs.length} / {reviews.length} reviews</span></p>
      <div className={styles.reviewStage}>
        {activePair.map((review, index) => (
          <blockquote className={styles.reviewCard} key={review.id} style={{ "--channel": index === 0 ? "#ffe000" : "#45ef68" } as CSSProperties}>
            <span className={styles.channelLabel}>Channel {index === 0 ? "A" : "B"}</span>
            <p>“{review.compactExcerpt ?? review.quote}”</p>
            <cite>{review.reviewerName}{review.venue ? ` / ${review.venue}` : ""}</cite>
          </blockquote>
        ))}
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
          aria-describedby={guideId}
          aria-valuemin={1}
          aria-valuemax={reviewPairs.length}
          aria-valuenow={active + 1}
          aria-valuetext={`${activePair.map((review) => review.reviewerName).join(" and ")}, pair ${active + 1} of ${reviewPairs.length}`}
          tabIndex={0}
          onKeyDown={handleFaderKey}
          onPointerDown={(event) => {
            if (event.pointerType === "touch" && !(event.target instanceof Element && event.target.closest(`.${styles.faderCap}`))) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            selectFromFader(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) selectFromFader(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            else if (event.pointerType === "touch") selectFromFader(event);
            setDragLevel(null);
          }}
          onPointerCancel={() => setDragLevel(null)}
        >
          <div className={styles.verticalRail} aria-hidden="true" />
          <span className={styles.faderCap} aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </div>
      </div>

      <div className={styles.trackList} aria-label="Customer review pairs">
        {reviewPairs.map((pair, index) => (
          <button className={index === active ? styles.active : ""} key={pair.map((review) => review.id).join("-")} type="button" onClick={() => { setActive(index); setUserSelected(true); }} aria-pressed={index === active}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{pair.map((review) => review.reviewerName.split(" ")[0]).join(" + ")}</b>
          </button>
        ))}
      </div>
    </div>
  );
}
