import { HomepageHeadlineViewTracker } from "@/components/homepage-headline-view-tracker";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import styles from "./homepage-hero-headline.module.css";

const TAGLINE = "The classics, the curveballs, and the songs your people lose it to. All in one very good night.";
const HEADLINE_LINES = ["Your Wedding", "A Mix of", "The Very Best"] as const;

export function HomepageHeroHeadline() {
  return (
    <div>
      <MeterMatrixHeading className={styles.heading} text={HEADLINE_LINES.join(" ")} lines={HEADLINE_LINES} />
      <p
        className="mt-4 max-w-xl text-lg font-medium text-amber-200/90"
      >
        {TAGLINE}
      </p>
      <HomepageHeadlineViewTracker />
    </div>
  );
}
