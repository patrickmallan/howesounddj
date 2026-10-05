import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeferredArt } from "@/components/deferred-art";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import styles from "./weddings-overview.module.css";

const weddingsTitle = "Squamish Wedding DJ | Music for the Whole Day";
const weddingsDesc =
  "What Howe Sound DJ handles across a Squamish wedding: ceremony cues, microphones, dinner music, requests, and dance-floor music built around your crowd.";

export const metadata: Metadata = {
  title: weddingsTitle,
  description: weddingsDesc,
  openGraph: { title: weddingsTitle, description: weddingsDesc, url: "/weddings", images: ["/og-cake-party-v2.jpg"] },
  alternates: { canonical: "/weddings" },
};

const stages = [
  {
    name: "Ceremony",
    title: <><span>The exact version</span><span>you chose. Obviously.</span></>,
    body: "Processional songs, microphones, and timing are confirmed before anyone starts walking.",
    image: "/images/hsdj-redesign/weddings-overview/ceremony-crowd-art-v2-960.webp",
    className: styles.ceremony,
  },
  {
    name: "Speeches",
    title: <span>No tapping the mic and hoping.</span>,
    body: "The mic is checked, the speaker knows where to stand, and the photographer gets a heads-up.",
    image: "/images/hsdj-redesign/weddings-overview/speeches-signal-art-v1-960.webp",
    className: styles.speeches,
  },
  {
    name: "Dinner",
    title: <span>Dinner music can still be good.</span>,
    body: "Good records at a level where everyone can still talk. No sleepy background playlist required.",
    image: "/images/hsdj-redesign/weddings-overview/dinner-joy-art-v2-960.webp",
    className: styles.dinner,
  },
  {
    name: "Dance floor",
    title: <><span>Now let&apos;s see what</span><span>your people dance to.</span></>,
    body: "Requests come in, plans change, and I pay attention to what keeps people on the floor.",
    image: "/images/hsdj-redesign/weddings-overview/celebration-joy-art-v2-960.webp",
    className: styles.danceFloor,
  },
];

export default function WeddingsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="weddings-title">
        <div className={styles.heroInner}>
          <div className={styles.heroEditorial}>
            <div className={styles.heroTitleFrame}>
              <MeterMatrixHeading
                id="weddings-title"
                text="You don't need to build the whole playlist."
                lines={["You don't need", "to build the", "whole playlist."]}
                className={styles.heroTitle}
              />
            </div>
            <div className={styles.heroRule} aria-hidden="true"><span /><span /><span /></div>
            <p className={styles.heroCopy}>Tell me the songs you love, the ones you can&apos;t stand, and the tracks already tied to your day. I&apos;ll build from there, take requests seriously, and read the room as the night goes.</p>
          </div>
          <figure className={styles.heroVisual}>
            <Image src="/images/hsdj-redesign/weddings-overview/couple-playlist-planning-v4.webp" alt="A couple at home picking a few favourite wedding playlist ideas together on a laptop" fill priority sizes="(max-width: 680px) 100vw, 40vw" className={styles.coverImage} />
          </figure>
        </div>
      </section>

      <section className={styles.journey} aria-labelledby="wedding-day-heading">
        <div className={styles.journeyInner}>
          <h2 id="wedding-day-heading" className={styles.sectionLabel}>I&apos;m there long before the dance floor.</h2>
          <svg className={styles.signalPath} viewBox="0 0 1200 1040" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.desktopSignal} d="M62 28H250V142H570V86H1030V452H520V560H170V922H1060V1035" />
            <path className={styles.mobileSignal} d="M13 0V1040" />
          </svg>

          <div className={styles.stageGrid}>
            {stages.map((stage) => (
              <article key={stage.name} className={`${styles.stage} ${stage.className}`}>
                <DeferredArt className={styles.stageArtwork} desktopSrc={stage.image} sizes="(max-width: 760px) 92vw, 48vw" />
                <div className={styles.stageInk} aria-hidden="true" />
                <div className={styles.stageCopy}>
                  <p className={styles.stageLabel}>{stage.name}</p>
                  <h3>{stage.title}</h3>
                  <p className={styles.stageBody}>{stage.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.truths} aria-labelledby="truths-heading">
        <div className={styles.truthsInner}>
          <h2 id="truths-heading" className={styles.sectionLabel}>Wedding tidbits</h2>
          <p className={styles.truthsIntro}>The good stuff usually starts when you stop following a wedding template.</p>
          <div className={styles.truthComposition}>
            <article className={styles.playlistNote}>
              <p>Five hours of Spotify isn&apos;t too much.</p>
              <span>Most songs won&apos;t play front to back. A long playlist tells me where your taste lives.</span>
            </article>
            <article className={styles.curveballRecord}>
              <p>The random rock request might be the one.</p>
              <span className={styles.recordBody}>I&apos;ve seen one left-field song pull a whole table onto the floor.</span>
            </article>
            <article className={styles.dinnerStrip}>
              <p>Dinner music should not put everybody to sleep.</p>
            </article>
            <article className={styles.traditionCard}>
              <p>You can skip the bouquet toss.</p>
              <span>It&apos;s your wedding. If a tradition doesn&apos;t sound like you, leave it out. The party will be fine.</span>
            </article>
            <article className={styles.ideaSampler}>
              <p>Let&apos;s make something happen.</p>
              <span>I&apos;m always up for a planned bit of harmless chaos. Try one of these, or let&apos;s invent our own.</span>
              <div className={styles.samplerPads} aria-label="Celebration ideas">
                <span>Limbo</span><span>Conga line</span><span>Dance battle</span><span>Line dance</span><span>Dinner wave</span><span>Kissing game</span>
              </div>
            </article>
            <article className={styles.timelineFader}>
              <span className={styles.faderTrack} aria-hidden="true" />
              <div><p>Don&apos;t cut the chorus for the cake.</p><span>If the whole room is singing, we can give it another minute. The timeline should work for the party.</span></div>
            </article>
            <article className={styles.entranceTicket}>
              <p>Your grand entrance, your song.</p>
              <span>The wedding party can have theirs. You get your own moment when you walk in.</span>
            </article>
            <article className={styles.danceEditScreen}>
              <p>You don&apos;t have to dance for four minutes.</p>
              <span>I can shorten your first dance and parent dances to the length you want, with a proper ending.</span>
            </article>
            <article className={styles.allInCard}>
              <p>No nickel-and-diming.</p>
              <span>MCing, song edits, an extra speaker and extra time are all part of the service. No extra fees.</span>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.packageHandoff} aria-labelledby="packages-heading">
        <div>
          <p id="packages-heading">Want the details?</p>
          <Link href="/packages" prefetch={false}>See packages <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
