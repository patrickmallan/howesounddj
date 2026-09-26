import type { Metadata } from "next";
import Link from "next/link";
import { preload } from "react-dom";
import CTADuo from "@/components/cta-duo";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { SectionReveal } from "@/components/motion";
import styles from "./packages-page.module.css";

const packagesTitle = "Squamish Wedding DJ Packages | Your Music, Your Night";
const packagesDesc =
  "Wedding and event DJ options for Squamish: ceremony audio, reception sound, lighting, music planning, and a dance floor built around your people.";

export const metadata: Metadata = {
  title: packagesTitle,
  description: packagesDesc,
  openGraph: {
    images: ["/og-share.jpg"],
    title: packagesTitle,
    description:
      "Straightforward Squamish wedding DJ options, from ceremony audio to the last song, with honest advice about what your day actually needs.",
    url: "/packages",
  },
  alternates: { canonical: "/packages" },
};

const weddingIncludes = [
  ["Ceremony", "Music in the right places, wireless microphones, and vows people can actually hear."],
  ["Cocktails + dinner", "Good music at a volume where the table beside you can still have a conversation."],
  ["Speeches", "The microphone is ready, I know who has it next, and nobody is tapping it asking if it is on."],
  ["Dance floor", "Your must-plays get us started. After that, I watch the room and build from what is working."],
];

const alwaysIncluded = [
  "Planning calls with me, not a handoff to whoever is available",
  "A proper read through your timeline before the wedding",
  "Your must-plays, absolutely-nots, requests, and musical curveballs",
  "Sound that fits the room instead of simply being the biggest system possible",
  "Set-up, soundcheck, pack-down, and the unglamorous work in between",
  "MC help when it is useful; no radio voice and no unnecessary talking",
];

const upgrades = [
  ["MORE LIGHT", "Extra dance-floor or room lighting when the venue needs a push."],
  ["MORE ROOMS", "A second or third sound zone for ceremonies, patios, or awkward layouts."],
  ["SILENT DISCO", "Headphones, channels, and the delightfully strange sight of a silent dance floor."],
  ["CUSTOM AUDIO", "An audio message or a more involved production idea for one very specific entrance."],
  ["PHOTO BOOTH", "If it belongs at your party, we can talk through the right setup."],
];

export default function PackagesPage() {
  preload("/images/hsdj-redesign/footer/footer-dj-mixer-collage-v2-optimized.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <main className={`${styles.page} hsdj-interior`}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>PACKAGES / SQUAMISH, BC</div>
          <MeterMatrixHeading
            text="Tell me what kind of day you are having."
            className={styles.heroHeading}
          />
          <div className={styles.heroNote}>
            <p>
              Most people do not arrive knowing which DJ package they need. You
              should not have to. Tell me the venue, the rough guest count,
              whether the ceremony is there too, and how late you want to go. I
              will tell you what makes sense. If you do not need something, it
              will not be in the quote.
            </p>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className={styles.journey}>
        <div className={`${styles.scene} ${styles.decisionScene}`}>
          <div className={styles.decisionCopy}>
            <div className={styles.kicker}>START WITH ONE QUESTION</div>
            <h2 className="hsdj-lightboard-heading">Wedding or something else?</h2>
            <p>That answer gets us most of the way there. Follow the signal.</p>
          </div>
          <div className={styles.routeSplit}>
            <a className={styles.weddingRoute} href="#complete-wedding">
              <strong>Complete Wedding</strong>
              <small>Ceremony through dance floor</small>
            </a>
            <a className={styles.eventRoute} href="#celebration">
              <strong>A Great Party</strong>
              <small>Music, sound, lights, built for the room</small>
            </a>
          </div>
        </div>

        <div className={`${styles.scene} ${styles.weddingScene}`} id="complete-wedding">
          <div className={styles.collageWindow} role="img" aria-label="A wedding day moving from a mountain ceremony through dinner and dancing" />
          <div className={styles.weddingCopy}>
            <div className={styles.kicker}>THE ONE MOST COUPLES NEED</div>
            <h2>Complete Wedding</h2>
            <p className={styles.bigCopy}>
              From the first guest arriving to the last song. One person keeping
              an eye on the music, the microphones, and where the day is going next.
            </p>
            <p>This is the sensible starting point. We trim it or add to it after I see the venue and timeline.</p>
          </div>
          <div className={styles.dayPath}>
            {weddingIncludes.map(([title, text]) => (
              <article className={styles.dayStop} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.scene} ${styles.celebrationScene}`} id="celebration">
          <div className={styles.celebrationPhoto} aria-hidden="true" />
          <div className={styles.ticket}>
            <div className={styles.ticketBody}>
              <div className={styles.kicker}>BIRTHDAYS / ANNIVERSARIES / WORK PARTIES</div>
              <h2>Not every party needs the full wedding setup.</h2>
              <p>
                If the job is good music, a room that sounds right, and somewhere
                to dance, Celebration keeps it simple. Usually three to five hours,
                proper sound, lights, and help with a few announcements if you need it.
              </p>
              <p className={styles.ticketFootnote}>You bring the reason. I bring the party part.</p>
            </div>
          </div>
        </div>

        <div className={`${styles.scene} ${styles.includedScene}`}>
          <div className={styles.includedTitle}>
            <div className={styles.kicker}>ON EVERY BOOKING</div>
            <h2>The stuff I would not leave out.</h2>
            <p>Package names change how much of the day I cover, not how much I care once I am there.</p>
          </div>
          <ol className={styles.setList}>
            {alwaysIncluded.map((item) => (
              <li key={item}>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${styles.scene} ${styles.upgradeScene}`}>
          <div className={styles.equipmentArt} aria-hidden="true" />
          <div className={styles.patchHeader}>
            <div><div className={styles.kicker}>ONLY IF IT HELPS</div><h2 className="hsdj-lightboard-heading">Need another layer?</h2></div>
            <p>These are additions, not automatic upgrades. We use the ones that solve a real problem or make the room more fun.</p>
          </div>
          <div className={styles.patchBay}>
            {upgrades.map(([title, text]) => (
              <article className={styles.patch} key={title}>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.scene} ${styles.afterScene}`}>
          <div className={styles.afterHeading}>
            <div className={styles.kicker}>THE NEXT TRACK</div>
            <h2>One date. One conversation. Your call.</h2>
            <p>No long form or sales maze. Here is how we get from an open date to a decision.</p>
          </div>
          <div className={styles.afterDeck}>
            <div className={styles.afterDeckTop}>
              <span>HOWE SOUND DJ</span>
              <span>THE NEXT FOUR MOVES</span>
            </div>
            <ol className={styles.afterPath}>
              <li><span className={styles.afterStepNumber} aria-hidden="true">01</span><div><strong>Check your date.</strong><p>The calendar answers right away. No venue or guest count needed.</p></div></li>
              <li><span className={styles.afterStepNumber} aria-hidden="true">02</span><div><strong>If it is open, book a consult.</strong><p>The available-date screen takes you straight to the consult times.</p></div></li>
              <li><span className={styles.afterStepNumber} aria-hidden="true">03</span><div><strong>Talk it through.</strong><p>We talk wedding, music, and what working together would look like.</p></div></li>
              <li><span className={styles.afterStepNumber} aria-hidden="true">04</span><div><strong>You decide.</strong><p>If you want me as your DJ, we move into the booking steps.</p></div></li>
            </ol>
            <div className={styles.afterDeckFoot}>
              Howe Sound Wedding DJ. Your Celebration, Our Passion.
            </div>
          </div>
          <div className={styles.signalEnd}>
            <div className={styles.signalEndCopy}>
              <div className={styles.kicker}>READY WHEN YOU ARE</div>
              <h3>Put your date on the deck.</h3>
              <p>Start with the instant calendar check. The rest is a conversation.</p>
              <p className={styles.faqLine}>Still collecting information? <Link href="/faq">The FAQ has the practical stuff.</Link></p>
            </div>
            <div className={styles.finalActions}>
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
