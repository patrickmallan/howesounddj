import Image from "next/image";
import { LivingVUMeter } from "./living-vu-meter";
import styles from "./homepage-welcome.module.css";

export function HomepageWelcome() {
  return (
    <section className={styles.welcome} aria-labelledby="welcome-heading">
      <div className={styles.inner}>
        <div className={styles.album}>
          <LivingVUMeter className={styles.mobileMeter} />
          <div className={styles.vinyl} aria-hidden="true"><Image src="/images/hsdj-redesign/new-editorial/guides-vinyl-record-v1.webp" alt="" fill sizes="(max-width: 700px) 70vw, 40vw" /></div>
          <div className={styles.sleeve}>
            <div className={styles.photo}><Image src="/images/hsdj-redesign/new-editorial/welcome-castle-wedding-daydream-v1.webp" alt="Imagined wedding artwork: newlyweds and black-tie guests dancing beneath crystal chandeliers in a grand castle ballroom" fill sizes="(max-width: 700px) 75vw, 35vw" /></div>
            <span className={styles.sleeveLabel}>WEDDING DAYDREAM / AI ARTWORK</span>
            <h2 id="welcome-heading" className="hsdj-meter--paper">Beautiful place.<br /> Your people.<br /> My kind of night.</h2>
          </div>
        </div>
        <div className={styles.notes}>
          <p className={styles.label}>Welcome to <strong>Howe Sound<br />Wedding DJ</strong></p>
          <p className={styles.lead}>I believe I’ve got one of the <em>best gigs on the planet.</em></p>
          <p>Celebrating with couples in <strong>Squamish</strong>, surrounded by mountains, water, and their favourite people.</p>
          <p className={styles.invite}>Have a look around. Get a feel for the music, the places, and the celebrations. <span>I’d love to meet you.</span></p>
        </div>
      </div>
    </section>
  );
}
