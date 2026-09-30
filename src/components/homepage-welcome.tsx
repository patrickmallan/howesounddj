import Image from "next/image";
import { LivingVUMeter } from "./living-vu-meter";
import styles from "./homepage-welcome.module.css";

export function HomepageWelcome() {
  return (
    <section className={styles.welcome} aria-labelledby="welcome-heading">
      <div className={styles.backdrop} aria-hidden="true"><Image src="/images/hsdj-redesign/new-editorial/welcome-wedding-poster-backdrop-v1.webp" alt="" fill sizes="100vw" /></div>
      <div className={styles.inner}>
        <div className={styles.album}>
          <LivingVUMeter className={styles.mobileMeter} />
          <figure className={styles.sleeve}>
            <Image src="/images/hsdj-redesign/new-editorial/welcome-pink-cake-party-scenes-v5.webp" alt="Imagined wedding artwork: a couple and DJ atop a pink wedding cake, guests dancing and playing games below, and a laughing guest dangling from the lowest ledge" width={1254} height={1254} sizes="(max-width: 700px) calc(100vw - 96px), (max-width: 1000px) 660px, 660px" />
          </figure>
        </div>
        <div className={styles.notes}>
          <h2 id="welcome-heading"><span className={styles.welcomeLine}>Welcome to</span><span className={styles.gildedTitle}>Howe Sound<br />Wedding DJ</span></h2>
          <p>Your musical taste comes first. Because if I can get you on the dance floor, then I can get everyone on the dance floor.</p>
          <p><strong>I’ve got one of the best gigs on the planet.</strong> Celebrating with couples in <strong>Squamish</strong>, surrounded by mountains, water, and their favourite people.</p>
          <p>Have a look around. Get a feel for the music, the places, and the celebrations. <strong>I’d love to meet you.</strong></p>
        </div>
      </div>
    </section>
  );
}
