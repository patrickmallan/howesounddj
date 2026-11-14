import { HomepageHeadlineViewTracker } from "@/components/homepage-headline-view-tracker";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import styles from "./homepage-hero-headline.module.css";

const HEADLINE_LINES = ["Your Wedding", "A Mix of", "The Very Best"] as const;

export function HomepageHeroHeadline() {
  return (
    <div>
      <MeterMatrixHeading className={styles.heading} text={HEADLINE_LINES.join(" ")} lines={HEADLINE_LINES} />
      <p className={styles.tagline}>
        <span>The classics, the curveballs, and the songs your people lose it to.</span>
        <span>All in one very good night.</span>
      </p>
      <HomepageHeadlineViewTracker />
    </div>
  );
}
