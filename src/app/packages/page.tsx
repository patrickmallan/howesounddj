import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
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
  { cue: "01", title: "Ceremony", text: "The right song lands. Every guest hears the vows.", payoff: "Clear from the first word" },
  { cue: "02", title: "Cocktails + dinner", text: "Good music, warm room, conversation still possible.", payoff: "Present, never pushy" },
  { cue: "03", title: "Speeches", text: "The mic is ready and the next person knows when to stand.", payoff: "No tapping. No scramble." },
  { cue: "04", title: "Dance floor", text: "Your must-plays start the map. The room tells me where to go next.", payoff: "Built live, not on autopilot" },
];

const alwaysIncluded = [
  { title: "You plan with your DJ", text: "Every call is with me, so the person behind the booth already knows your people and the plan." },
  { title: "Your timeline gets a soundcheck", text: "I look for microphone moves, room changes, and handoffs before they become wedding-day problems." },
  { title: "Your music has guardrails", text: "Must-plays, hard noes, requests, and curveballs all have a place before I read the room." },
  { title: "The sound fits the room", text: "The right system for the venue beats bringing the biggest pile of speakers every time." },
  { title: "The quiet work is covered", text: "Setup, testing, pack-down, and the unglamorous details happen without becoming your job." },
  { title: "The mic stays human", text: "I help with announcements when useful. No radio voice and no talking just to hear myself talk." },
];

const upgrades = [
  { code: "LUX", title: "More light", text: "Give a dark room or dance floor the lift it actually needs." },
  { code: "3+ ZONES", title: "More rooms", text: "Clean sound across a ceremony, patio, or awkward venue layout." },
  { code: "3-CH", title: "Silent disco", text: "Headphones, multiple channels, and one delightfully strange dance floor." },
  { code: "CUE", title: "Custom audio", text: "Build one entrance or moment around an audio idea that is yours." },
  { code: "FLASH", title: "Photo booth", text: "If it adds to the party, we will choose a setup that belongs there." },
];

export default function PackagesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>PACKAGES / SQUAMISH, BC</div>
          <h1 className={styles.heroHeading}>
            <span>Tell me what kind of</span>{" "}
            <span>day you are having.</span>
          </h1>
          <div className={styles.heroNote}>
            <div className={styles.heroNoteTop}>
              <span>NO PACKAGE HOMEWORK</span>
            </div>
            <h2>You tell me the shape of the day.</h2>
            <p className={styles.heroNoteIntro}>Most people do not arrive knowing which DJ package they need. You should not have to.</p>
            <div className={styles.heroInputs}>
              <details><summary><span>01</span>Venue</summary><p>The rooms and layout tell us what sound actually belongs there.</p></details>
              <details><summary><span>02</span>Guest count</summary><p>Enough sound for your people, without turning gear into a spectacle.</p></details>
              <details><summary><span>03</span>Ceremony too?</summary><p>This decides whether the vows need their own sound and microphone plan.</p></details>
              <details><summary><span>04</span>How late?</summary><p>Coverage should match your party, not an arbitrary package limit.</p></details>
            </div>
            <p className={styles.heroPromise}>Give me those four things. I will tell you what makes sense. If you do not need something, it will not be in the quote.</p>
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
          <div className={styles.collageWindow} role="img" aria-label="A wedding day moving from a mountain ceremony through dinner and dancing">
            <Image src="/images/hsdj-redesign/packages/packages-ceremony-clue-v2.webp" alt="" fill loading="lazy" sizes="(max-width: 820px) 100vw, 70vw" />
          </div>
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
            <div className={styles.dayPathTop}>
              <span>COMPLETE WEDDING COVERAGE, START TO FINISH</span>
              <span className={styles.daySignal} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
            </div>
            {weddingIncludes.map(({ cue, title, text, payoff }) => (
              <article className={styles.dayStop} key={title}>
                <span className={styles.dayStopNumber} aria-hidden="true">{cue}</span>
                <div className={styles.dayStopCopy}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <small>{payoff}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.scene} ${styles.celebrationScene}`} id="celebration">
          <div className={styles.celebrationPhoto} aria-hidden="true">
            <Image src="/images/hsdj-redesign/packages/packages-dinner-clue-v2.webp" alt="" fill loading="lazy" sizes="(max-width: 820px) 100vw, 65vw" />
          </div>
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
            <h2>What you can count on.</h2>
            <p>Coverage can change. The standard of care does not. These are the six things I protect on every booking.</p>
            <div className={styles.includedMeters} aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
            </div>
          </div>
          <ol className={styles.setList}>
            {alwaysIncluded.map(({ title, text }) => (
              <li key={title}>
                <span className={styles.setLoopButton} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${styles.scene} ${styles.upgradeScene}`}>
          <div className={styles.equipmentArt} aria-hidden="true">
            <Image src="/images/hsdj-redesign/packages/packages-dance-gear-clue-v2.webp" alt="" fill loading="lazy" sizes="(max-width: 820px) 100vw, 65vw" />
          </div>
          <div className={styles.patchHeader}>
            <div><div className={styles.kicker}>ONLY IF IT HELPS</div><h2 className="hsdj-lightboard-heading">Need another layer?</h2></div>
            <p>These are additions, not automatic upgrades. We use the ones that solve a real problem or make the room more fun.</p>
          </div>
          <div className={styles.patchBay}>
            {upgrades.map(({ code, title, text }) => (
              <article className={styles.patch} key={title}>
                <div className={styles.patchControl} aria-hidden="true">
                  <span className={styles.patchCode}>{code}</span>
                  <span className={styles.patchDial}><i /></span>
                </div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.scene} ${styles.afterScene}`}>
          <div className={styles.afterBackground} aria-hidden="true">
            <Image src="/images/hsdj-redesign/packages/packages-signal-journey-v1.webp" alt="" fill loading="lazy" sizes="100vw" />
          </div>
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
