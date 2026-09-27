import { HomepageHeadlineViewTracker } from "@/components/homepage-headline-view-tracker";
import styles from "./homepage-hero-headline.module.css";

const TAGLINE = "The classics, the curveballs, and the songs your people lose it to. All in one very good night.";
const APPROVED_HEADLINE = "Your wedding. A variety of the best.";
const LED_LINES = [1, 2, 3, 4] as const;

export function HomepageHeroHeadline() {
  return (
    <div>
      <link rel="preload" as="image" href="/images/hsdj-redesign/hero/home-headline-complete-mobile-optimized.webp" media="(max-width: 700px)" />
      <link rel="preload" as="image" href="/images/hsdj-redesign/hero/home-headline-complete-optimized.webp" media="(min-width: 701px)" />
      <h1 className={styles.heading}>
        <span className={styles.semanticText}>{APPROVED_HEADLINE}</span>
        {LED_LINES.map((line, index) => (
          <span
            aria-hidden="true"
            className={styles.line}
            key={line}
            style={{
              animationDelay: `${index * 105}ms`,
              clipPath: `inset(${index * 25}% 0 ${75 - index * 25}% 0)`,
            }}
          />
        ))}
      </h1>
      <p
        className="mt-4 max-w-xl text-lg font-medium text-amber-200/90"
      >
        {TAGLINE}
      </p>
      <HomepageHeadlineViewTracker />
    </div>
  );
}
