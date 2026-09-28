import { HomepageHeadlineViewTracker } from "@/components/homepage-headline-view-tracker";
import styles from "./homepage-hero-headline.module.css";

const TAGLINE = "The classics, the curveballs, and the songs your people lose it to. All in one very good night.";
const HEADLINE_LINES = ["Your Wedding", "A Variety of", "The Very Best"] as const;

export function HomepageHeroHeadline() {
  return (
    <div>
      <link rel="preload" as="image" href="/images/hsdj-redesign/hero/home-headline-three-lines-mobile-v1.webp" media="(max-width: 700px)" />
      <link rel="preload" as="image" href="/images/hsdj-redesign/hero/home-headline-three-lines-v1.webp" media="(min-width: 701px)" />
      <h1 className={styles.heading}>
        <span className={styles.semanticText}>{HEADLINE_LINES.join(" ")}</span>
        {HEADLINE_LINES.map((line, index) => (
          <span
            aria-hidden="true"
            className={styles.line}
            key={line}
            style={{
              animationDelay: `${index * 105}ms`,
              clipPath: `inset(${index * 100 / 3}% 0 ${(2 - index) * 100 / 3}% 0)`,
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
