"use client";

import { useState } from "react";
import { ReviewMotionRegion } from "./review-motion-region";
import type { DeckReview } from "@/config/review-deck";
import styles from "@/app/reviews/reviews-page.module.css";

const cueColors = ["#ffe044", "#24d2e9", "#ff7442", "#fc4a8e", "#5dd7a0", "#7d8bff", "#e88af7", "#ffaf4b"];

function MandalaRing({ id, count, inner, outer, width, colors, offset = 0 }: {
  id: string;
  count: number;
  inner: number;
  outer: number;
  width: number;
  colors: readonly string[];
  offset?: number;
}) {
  return (
    <>
      <defs>
        <g id={id}>
          <path
            d={`M250 ${250 - inner} L${250 - width} ${250 - outer + 22} L250 ${250 - outer} L${250 + width} ${250 - outer + 22} Z`}
            fill="currentColor"
            stroke="#080b11"
            strokeWidth="1.5"
          />
          <path
            d={`M250 ${250 - outer} L${250 - width} ${250 - outer + 22} L250 ${250 - inner} Z`}
            fill="#fff"
            opacity=".13"
          />
        </g>
      </defs>
      {Array.from({ length: count }, (_, index) => (
        <use
          key={index}
          href={`#${id}`}
          transform={`rotate(${(index * 360) / count + offset} 250 250)`}
          style={{ color: colors[index % colors.length] }}
        />
      ))}
    </>
  );
}

function VinylMandala() {
  return (
    <svg className={styles.recordMandala} viewBox="0 0 500 500" focusable="false" aria-hidden="true">
      <circle cx="250" cy="250" r="232" fill="#0a0d14" />
      <MandalaRing id="hsdj-vinyl-outer" count={24} inner={157} outer={243} width={22} offset={7.5} colors={["#f23bea", "#8e1cc0", "#df56ec", "#ae24c6"]} />
      <MandalaRing id="hsdj-vinyl-mid-outer" count={32} inner={145} outer={230} width={29} colors={["#8718a2", "#bc2dc4", "#631484", "#e047c4"]} />
      <MandalaRing id="hsdj-vinyl-mid" count={40} inner={116} outer={190} width={20} offset={4.5} colors={["#f236a4", "#ff6ac2", "#a917a0", "#e12f89"]} />
      <MandalaRing id="hsdj-vinyl-mid-inner" count={36} inner={80} outer={147} width={19} colors={["#ffe541", "#f4bb2e", "#ffef75", "#d48b1d"]} />
      <MandalaRing id="hsdj-vinyl-inner" count={48} inner={48} outer={103} width={12} offset={3.75} colors={["#53f5be", "#1bd2b5", "#2ab9ec", "#95f06c"]} />
      <circle cx="250" cy="250" r="50" fill="none" stroke="#123846" strokeWidth="7" />
      <circle cx="250" cy="250" r="43" fill="none" stroke="#40d7e9" strokeWidth="3" strokeDasharray="3 3" />
    </svg>
  );
}

function Waveform({ active }: { active: number }) {
  return (
    <div className={styles.waveformStack} aria-hidden="true">
      <div className={styles.waveform}>
        {Array.from({ length: 53 }, (_, index) => {
          const height = 17 + ((index * 23 + index * index * 7 + active * 29) % 76);
          return <i key={index} style={{ height: `${height}%` }} />;
        })}
        <span className={styles.waveformPlayhead} />
      </div>
      <div className={styles.waveTicks}><span>00:00</span><span>01:24</span><span>02:48</span><span>04:12</span></div>
    </div>
  );
}

export function FeaturedReviewDeck({ reviews }: { reviews: readonly DeckReview[] }) {
  const [active, setActive] = useState(0);
  const selected = reviews[active];
  const selectNext = () => setActive((current) => (current + 1) % reviews.length);

  return (
    <ReviewMotionRegion className={styles.deckBody}>
      <div className={styles.platterBay}>
        <div className={styles.platterRail}><span>HOWE SOUND DJ</span><span className={styles.deckSerial}>HSDJ • 001</span></div>
        <div className={styles.platterHousing}>
          <span className={styles.platterChassis} aria-hidden="true" />
          <button type="button" className={styles.recordButton} onClick={selectNext} aria-label={`Spin to the next review after ${selected.reviewerName}`} title="Spin to the next review">
            <span className={styles.recordArt} aria-hidden="true">
              <VinylMandala />
              <span className={styles.recordLabel}>
                <span>HOWE SOUND DJ</span>
                <strong>AFTER<br />HOURS</strong>
                <span>COUPLES ON THE RECORD</span>
              </span>
              <span className={styles.recordSpindle} />
            </span>
          </button>
          <span className={styles.tonearm} aria-hidden="true"><span /></span>
          <span className={styles.platterMarker} aria-hidden="true" />
        </div>
        <div className={styles.platterFoot}><span><span className={styles.cueDot} /> MOTOR ON</span><span>33⅓ RPM</span><span>SPIN FOR NEXT</span></div>
      </div>

      <div className={styles.screenBay}>
        <div className={styles.displayFrame}>
          <div className={styles.displayTopline} aria-hidden="true"><span>HSDJ</span></div>
          <Waveform active={active} />
          <div className={styles.firstCopy} key={selected.id} aria-live="polite">
            <span className={styles.quoteMark} aria-hidden="true">“</span>
            <figure className={`${styles.quote} ${styles.leadQuote}`}>
              <blockquote>{selected.quote}</blockquote>
              <figcaption><span className={styles.bylineKnob} aria-hidden="true" /><span>{selected.reviewerName}</span>{selected.venue ? <small>{selected.venue}</small> : null}</figcaption>
            </figure>
            {selected.sourceHref ? <a className={styles.reviewSource} href={selected.sourceHref} target="_blank" rel="noopener noreferrer">Read on Google<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a> : null}
          </div>
        </div>
        <div className={styles.cuePanel}>
          <div className={styles.screenControls} role="group" aria-label="Choose a couple's review">
            {reviews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.cueButton} ${active === index ? styles.cueButtonActive : ""}`}
                style={{ "--cue-color": cueColors[index] } as React.CSSProperties}
                onClick={() => setActive(index)}
                aria-label={`Cue ${index + 1}: review by ${item.reviewerName}`}
                aria-pressed={active === index}
              >
                <span className={styles.cueNumber}>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ReviewMotionRegion>
  );
}
