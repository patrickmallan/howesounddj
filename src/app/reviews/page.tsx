import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { FeaturedReviewDeck } from "@/components/featured-review-deck";
import { CANONICAL_REVIEWS, type CanonicalReview } from "@/config/reviews";
import { makeFeaturedDeckReviews } from "@/config/review-deck";
import styles from "./reviews-page.module.css";

const pageTitle = "Squamish & Sea-to-Sky Wedding DJ Reviews";
const pageDescription =
  "Read what couples said about planning with Patrick, the full wedding day, and the dance floor with Howe Sound DJ.";

const heroImageCommon = { alt: "", sizes: "100vw", quality: 84 } as const;
const {
  props: { srcSet: desktopHeroSrcSet },
} = getImageProps({
  ...heroImageCommon,
  src: "/images/hsdj-redesign/reviews/reviews-hero-love-notes-desktop-v1.webp",
  width: 1672,
  height: 941,
});
const {
  props: { srcSet: mobileHeroSrcSet, ...mobileHeroProps },
} = getImageProps({
  ...heroImageCommon,
  src: "/images/hsdj-redesign/reviews/reviews-hero-love-notes-mobile-v1.webp",
  width: 1024,
  height: 1536,
  fetchPriority: "high",
});

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  openGraph: { title: pageTitle, description: pageDescription, url: "/reviews", images: ["/og-share.jpg"] },
  alternates: { canonical: "/reviews" },
};

function review(id: string): CanonicalReview {
  const found = CANONICAL_REVIEWS.find((item) => item.id === id);
  if (!found) throw new Error(`Missing published review: ${id}`);
  return found;
}

const lead = review("stephen-henry");
const deckReviews = makeFeaturedDeckReviews(lead);
const cornerReview = review("lauren-steeles");
const people = [
  review("wedding-couple-anonymous"),
  review("matthew-bundala"),
  review("natasha-beaudry"),
];
const fullDay = [
  review("danya-karras"),
  review("cassandra-wilding"),
  review("melissa-schweyer"),
];
const floor = [
  review("molly-finn"),
  review("vanessa-pocock"),
  review("ellen-selby"),
  review("matias-fontecilla"),
];

function ReviewQuote({ item, className = "" }: { item: CanonicalReview; className?: string }) {
  return (
    <figure className={`${styles.quote} ${className}`.trim()}>
      <blockquote>“{item.quote}”</blockquote>
      <figcaption>
        <span className={styles.bylineKnob} aria-hidden="true" />
        <span>{item.reviewerName}</span>
        {item.venue ? <small>{item.venue}</small> : null}
      </figcaption>
    </figure>
  );
}

function wavePath(seed: number, scale: number) {
  const energy = [0.88, 0.57, 0.3, 0.74, 1, 0.46, 0.23, 0.67, 0.95, 0.88];
  const samples = Array.from({ length: 321 }, (_, index) => {
    const position = index % 320;
    const phrase = Math.floor(position / 32);
    const beat = position % 32;
    const contour = energy[phrase] + (energy[(phrase + 1) % energy.length] - energy[phrase]) * (beat / 32);
    const transient = (position * 37 + position * position * 7 + seed * 23) % 23;
    const kick = beat < 3 ? 12 - beat * 4 : 0;
    return Math.min(37, Math.round((5 + transient + kick) * contour * scale));
  });
  const upper = samples.map((height, index) => `L${index * 5} ${40 - height}`).join(" ");
  const lower = samples.map((height, index) => `L${index * 5} ${40 + height}`).reverse().join(" ");
  return `M0 40 ${upper} ${lower} Z`;
}

function WaveformBanner() {
  return (
    <div className={styles.waveBanner} aria-hidden="true">
      <div className={styles.waveBannerHeader}><span>HOWE SOUND DJ / DANCE FLOOR</span><span>THE ROOM IN MOTION</span></div>
      {[1, 2].map((deck) => (
        <div className={`${styles.waveDeck} ${deck === 1 ? styles.waveDeckA : styles.waveDeckB}`} key={deck}>
          <span className={styles.waveDeckLabel}>DECK {deck === 1 ? "A" : "B"}</span>
          <div className={styles.waveViewport}>
            <div className={styles.waveTrack}>
              {[0, 1].map((copy) => (
                <svg key={copy} viewBox="0 0 1600 80" preserveAspectRatio="none" focusable="false">
                  <defs>
                    <linearGradient id={`hsdj-wave-${deck}-${copy}`} gradientUnits="userSpaceOnUse" x1="0" x2="1600">
                      {(deck === 1
                        ? ["#f33a55", "#ff753e", "#ffbc3f", "#4bd7c6", "#f8425d", "#ff973d", "#54c9d8", "#ec4b70", "#e8c243", "#f33a55"]
                        : ["#25c8ed", "#4e88ff", "#9d70f6", "#53dec2", "#2bbbea", "#637dff", "#4de4c8", "#9d70f6", "#44a3ed", "#25c8ed"]
                      ).map((color, index) => <stop key={index} offset={`${(index / 9) * 100}%`} stopColor={color} />)}
                    </linearGradient>
                  </defs>
                  <path className={styles.waveBody} fill={`url(#hsdj-wave-${deck}-${copy})`} d={wavePath(deck * 7, 1)} />
                  <path className={styles.waveCore} d={wavePath(deck * 7 + 3, .31)} />
                  <path className={styles.waveThread} d="M0 40H1600" />
                </svg>
              ))}
            </div>
          </div>
          <span className={styles.waveDeckEnd}>{deck === 1 ? "A" : "B"} / HSDJ</span>
        </div>
      ))}
      <span className={styles.wavePlayhead} />
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="reviews-heading">
        <div className={styles.heroArt} aria-hidden="true">
          <picture>
            <source media="(min-width: 721px)" srcSet={desktopHeroSrcSet} />
            <source media="(max-width: 720px)" srcSet={mobileHeroSrcSet} />
            <img {...mobileHeroProps} alt="" />
          </picture>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>From the people who were there</p>
          <MeterMatrixHeading
            id="reviews-heading"
            text="They booked me. Here's what they said."
            className={styles.heroTitle}
          />
          <HeroSignalCopy className={styles.heroIntro}>Some talk about the planning. Others go straight to the dance floor.</HeroSignalCopy>
          <a className={styles.readLink} href="#first-review">Start reading <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroEdge} aria-hidden="true" />
      </section>

      <section id="first-review" className={styles.firstScene} aria-label="Featured client review">
        <div className={styles.firstSceneInner}>
          <div className={styles.deckTopline} aria-hidden="true">
            <span className={styles.deckBrand}>HOWE SOUND <b>DJ</b></span>
            <span className={styles.powerLight}>ON AIR</span>
          </div>
          <FeaturedReviewDeck reviews={deckReviews} />
        </div>
      </section>

      <section id="planning-reviews" className={styles.peopleScene} aria-labelledby="people-heading">
        <div className={styles.peopleIntro}>
          <div className={styles.sceneHeader}>
            <span className={styles.sceneLabel}>The people part</span>
            <h2 id="people-heading" className="hsdj-lightboard-heading">Before the first song.</h2>
          </div>
          <div className={styles.cornerReview}>
            <ReviewQuote item={cornerReview} />
          </div>
        </div>
        <div className={styles.peopleQuotes}>
          {people.map((item, index) => (
            <ReviewQuote item={item} key={item.id} className={index === 0 ? styles.peopleFeature : ""} />
          ))}
        </div>
      </section>

      <section id="whole-day-reviews" className={styles.dayScene} aria-labelledby="day-heading">
        <div className={styles.dayHeader}>
          <div>
            <span className={styles.sceneLabel}>All the way through</span>
            <h2 id="day-heading">From the ceremony onward.</h2>
          </div>
          <div className={styles.dayPhoto} aria-hidden="true">
            <Image
              src="/images/hsdj-redesign/wedding-story/night-stage-first-dance-v1.webp"
              alt=""
              fill
              sizes="(max-width: 720px) 80vw, 34vw"
            />
            <span>YOU ENJOY IT / I GOT THIS</span>
          </div>
        </div>
        <div className={styles.dayQuotes}>
          {fullDay.map((item) => <ReviewQuote item={item} key={item.id} />)}
        </div>
      </section>

      <section id="dance-floor-reviews" className={styles.floorScene} aria-labelledby="floor-heading">
        <div className={styles.floorLight} aria-hidden="true" />
        <WaveformBanner />
        <div className={styles.floorHeading}>
          <span className={styles.sceneLabel}>And when the floor opened</span>
          <h2 id="floor-heading" className="hsdj-lightboard-heading">They stayed out there.</h2>
        </div>
        <div className={styles.floorQuotes}>
          {floor.map((item, index) => (
            <ReviewQuote item={item} key={item.id} className={index === 0 ? styles.floorFeature : ""} />
          ))}
        </div>
      </section>

      <section className={styles.outro} aria-labelledby="reviews-outro-heading">
        <div className={styles.outroDeck}>
          <div className={styles.outroCopy}>
            <span className={styles.sceneLabel}>Your turn, when you&apos;re ready</span>
            <h2 id="reviews-outro-heading">Now let&apos;s talk about yours.</h2>
            <p>If you like what these couples had to say, see whether your date is open. Then we can talk music and the kind of night you want to make.</p>
          </div>
          <Link href="/contact#availability" className={styles.outroLink}>Check your date <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
