import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeferredArt } from "@/components/deferred-art";
import { EncoreCassetteDeck } from "@/components/encore-cassette-deck";
import { HardwareListMarker } from "@/components/hardware-list-marker";
import { HomepageHeroHeadline } from "@/components/homepage-hero-headline";
import { JsonLd } from "@/components/json-ld";
import { LivingVUMeter } from "@/components/living-vu-meter";
import { NightMixFader } from "@/components/night-mix-fader";
import { ReviewDeck } from "@/components/review-deck";
import { ReviewBackdropArt } from "@/components/review-backdrop-art";
import { ResponsiveAmbientDanceMontage } from "@/components/responsive-ambient-dance-montage";
import { HOMEPAGE_TITLE, SITE_ORIGIN } from "@/config/site-brand";
import { CANONICAL_REVIEWS, HOMEPAGE_FEATURED_REVIEW_IDS } from "@/config/reviews";
import { websiteJsonLd } from "@/lib/json-ld";
import styles from "./homepage-set.module.css";

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_TITLE },
  description: "Squamish wedding DJ Patrick Mallan handles ceremony sound, planning, speeches, dinner music, and a reception built around your music and your people.",
  openGraph: { title: HOMEPAGE_TITLE, description: "A Squamish wedding DJ for the whole day, and the kind of dance floor people stay on.", url: `${SITE_ORIGIN}/`, images: ["/og-share.jpg"] },
  twitter: { card: "summary_large_image", title: HOMEPAGE_TITLE, description: "A Squamish wedding DJ for the whole day, and the kind of dance floor people stay on.", images: ["/og-share.jpg"] },
  alternates: { canonical: `${SITE_ORIGIN}/` },
};

const soundCheck = [
  ["Ceremony", "You say the words. I’ll make sure every seat hears them."],
  ["Cocktails + dinner", "Good music, easy volume. Nobody has to shout."],
  ["Speeches", "You bring the stories. I’ll keep the mic behaving."],
  ["Dance floor", "When your people are ready, I’m ready too."],
] as const;

export default async function HoweSoundDJHomepage() {
  const reviews = HOMEPAGE_FEATURED_REVIEW_IDS.map((id) => {
    const review = CANONICAL_REVIEWS.find((item) => item.id === id);
    if (!review) throw new Error(`Missing homepage review: ${id}`);
    return review;
  });

  return (
    <main data-site-home className={styles.home}>
      <JsonLd data={websiteJsonLd()} />

      <section className={`${styles.chapter} ${styles.arrival}`} aria-labelledby="home-arrival-heading">
        <div className={styles.arrivalArt} aria-hidden="true"><Image src="/images/hsdj-redesign/hero/sea-to-sky-lifted-kiss-hero-v1.webp" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" /></div>
        <LivingVUMeter className={styles.arrivalVu} />
        <div data-testid="home-hero-inner" className={styles.arrivalCopy}>
          <p className={styles.machineLabel}>Squamish wedding DJ / local by design</p>
          <div id="home-arrival-heading" className={styles.heroHeadline}><HomepageHeroHeadline /></div>
        </div>
      </section>

      <section className={styles.welcome} aria-labelledby="welcome-heading">
        <div className={styles.welcomeInner}>
          <p className={styles.welcomeLabel}><span>Welcome to</span> Howe Sound Wedding DJ</p>
          <h2 id="welcome-heading" className="hsdj-meter--paper">Beautiful place.<br /> Your people.<br /> My kind of night.</h2>
          <div className={styles.welcomeCopy}>
            <p className={styles.welcomeLead}>I believe I’ve got one of the <em>best gigs on the planet.</em></p>
            <p>Celebrating with couples in <strong>Squamish</strong>, surrounded by mountains, water, and <em>their favourite people.</em></p>
            <p className={styles.welcomeInvite}>Have a look around. Get a feel for the music, the places, and the celebrations. <span>I’d love to meet you.</span></p>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.build}`} id="night" aria-labelledby="build-heading">
        <DeferredArt className={styles.buildDeck} desktopSrc="/images/hsdj-redesign/wedding-story/night-section-art-v1-optimized.webp" mobileSrc="/images/hsdj-redesign/wedding-story/night-section-art-mobile-v1-optimized.webp" />
        <header className={styles.buildHeading}><p>From ceremony to dance floor</p><h2 id="build-heading" className="hsdj-meter--paper"><span>The music changes</span>{" "}<strong>throughout the day.</strong></h2></header>
        <div className={styles.nightFader}><NightMixFader /></div>
      </section>

      <section id="reviews" data-testid="home-venues-band" className={`${styles.chapter} ${styles.remembers}`} aria-labelledby="remembers-heading">
        <DeferredArt className={styles.remembersDeck} desktopSrc="/images/hsdj-redesign/afterparty/wedding-night-collage-optimized.webp" />
        <ReviewBackdropArt />
        <header className={styles.remembersHeading}><h2 id="remembers-heading" className="hsdj-meter--after-dark">What couples said after the last song.</h2></header>
        <p className={styles.reviewInstruction}>Turn it up.<br /><b>These people were actually there.</b></p>
        <div className={styles.reviewDeck}><ReviewDeck reviews={reviews} /></div>
        <div className={styles.rememberLinks}><Link href="/reviews" prefetch={false}>Read all reviews →</Link><Link href="/venues" prefetch={false}>See Squamish venues →</Link></div>
      </section>

      <section id="services" data-testid="home-services-section" className={`${styles.chapter} ${styles.soundCheck}`} aria-labelledby="sound-check-heading">
        <DeferredArt className={styles.soundDeck} desktopSrc="/images/hsdj-redesign/afterparty/wedding-night-collage-optimized.webp" />
        <div className={styles.soundPaper}>
          <div className={styles.soundCopy}>
            <p className={styles.tapeLabel}>The work should disappear</p>
            <h2 id="sound-check-heading" className="hsdj-meter--cold"><span>Nobody should</span><span>notice the</span><span>microphone.</span></h2>
            <p>They should hear every vow, every speech and every entrance without wondering how any of it works. I handle the sound, cues and handoffs so those moments can simply happen.</p>
          </div>
          <div className={styles.soundPortrait}><Image src="/images/hsdj-redesign/wedding-story/ceremony-mic-failure-crowd-v1.webp" alt="Wedding guests turning around after a microphone problem during a forest ceremony" fill sizes="(max-width: 700px) 70vw, 34vw" /></div>
          <div className={styles.soundControls} role="list">
            <p className={styles.soundControlsLabel}><strong>Sound, sorted.</strong><span>One less thing to worry about.</span></p>
            {soundCheck.map(([title, text]) => <div className={styles.soundControl} role="listitem" key={title}><HardwareListMarker /><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="room" className={`${styles.chapter} ${styles.readRoom}`} aria-labelledby="read-room-heading">
        <DeferredArt className={styles.readRoomDeck} desktopSrc="/images/hsdj-redesign/wedding-story/read-room-dancefloor-overhead-v1.webp" />
        <div className={styles.roomCopy}><p className={styles.tapeLabel}>A set that pays attention</p><h2 id="read-room-heading" className="hsdj-meter--paper"><span>Your music</span><span>starts it.</span><span>I read</span><span>the room.</span></h2><div className={styles.roomManifesto}><span>Must plays</span><span>No-go tracks</span><span>Requests</span><p>Tell me what you love, what never gets played, and what makes your people move. That gives me the starting point. From there, I watch what lands and decide where to go next.</p></div></div>
        <div className={styles.roomPhotos}>
          <figure><Image src="/images/hsdj-redesign/wedding-story/ceremony-mountains.jpg" alt="A couple exchanging vows outdoors with mountains beyond the ceremony" fill quality={90} sizes="(max-width: 700px) 92vw, 31vw" /></figure>
          <figure><Image src="/images/hsdj-redesign/wedding-story/cocktail-toast.jpg" alt="A bride raising a glass with friends at the reception" fill quality={90} sizes="(max-width: 700px) 92vw, 34vw" /></figure>
          <figure><Image src="/images/hsdj-redesign/wedding-story/reception-dance.jpg" alt="Newlyweds sharing a first dance beneath string lights" fill quality={92} sizes="(max-width: 700px) 92vw, 31vw" /></figure>
        </div>
        <p className={styles.roomStamp}>Wedding is the event.<br /><b>The music is yours.</b></p>
      </section>

      <section id="playback" className={`${styles.chapter} ${styles.playback}`} aria-labelledby="playback-heading">
        <h2 id="playback-heading" className="sr-only">Howe Sound DJ dance-floor atmosphere</h2>
        <div data-testid="home-video-proof-inner" className={styles.playbackVideo}>
          <ResponsiveAmbientDanceMontage
            viewport="desktop"
            fingerprintClassName={styles.playbackFingerprint}
            logoClassName={styles.playbackVideoLogo}
          />
        </div>
      </section>

      <section id="about" data-testid="home-about-grid" className={`${styles.chapter} ${styles.operator}`} aria-labelledby="operator-heading">
        <DeferredArt className={styles.operatorDeck} desktopSrc="/images/hsdj-redesign/afterparty/dancefloor-wave-collage-optimized.webp" />
        <div className={styles.operatorPaper}>
          <div className={styles.operatorPhoto}><Image src="/images/about/patrick-dj-action.webp" alt="Patrick DJing with one arm raised" fill sizes="(max-width: 700px) 100vw, 46vw" /></div>
          <div className={styles.operatorCopy}><p className={styles.tapeLabel}>Patrick / Howe Sound DJ</p><h2 id="operator-heading" className="hsdj-meter--cold">The DJ you plan with is the DJ who shows up.</h2><p>I&apos;m Patrick. I&apos;ll be on the emails, at the setup, behind the ceremony microphones, and at the decks when the floor opens. No handoff to somebody you&apos;ve never met.</p><p>I come prepared. Then I pay attention to you, the timeline, and what the room is doing.</p><Link href="/about" prefetch={false}>Full story on About →</Link></div>
        </div>
      </section>

      <section id="faq" data-footer-art-bleed data-testid="home-faq-section" className={`${styles.chapter} ${styles.encore}`} aria-labelledby="encore-heading">
        <div className={styles.encoreCopy}><p className={styles.tapeLabel}>Ready when you are</p><h2 id="encore-heading" className="hsdj-meter--signal">Got a date? Let&apos;s make sure I do too.</h2><p>Check your wedding date below. If I&apos;m free, book a consult and tell me what you&apos;re planning. We&apos;ll have a relaxed chat and see if I&apos;m the right DJ for it.</p></div>
        <div data-testid="home-finale-section"><EncoreCassetteDeck /></div>
      </section>
    </main>
  );
}
