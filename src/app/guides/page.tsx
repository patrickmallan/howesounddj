import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GuidesTurntable } from "./guides-turntable";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { JsonLd } from "@/components/json-ld";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { guidesHubBreadcrumbJsonLd } from "@/lib/json-ld";
import "./guides-deck.css";

const description =
  "How to choose a wedding DJ and how to keep a Sea-to-Sky dance floor moving, from Howe Sound DJ in Squamish.";

const guideTitle = "Good parties are made on purpose.";

type HardwareLinkProps = {
  eyebrow?: string;
  href: string;
  label: string;
  mode?: "play" | "hot-cue";
};

function HardwareLink({ eyebrow, href, label, mode = "play" }: HardwareLinkProps) {
  if (mode === "hot-cue") {
    return (
      <Link className="guides-deck-cue-link" href={href} prefetch={false}>
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </Link>
    );
  }

  return (
    <Link className={`guides-deck-hardware-link guides-deck-hardware-link--${mode}`} href={href} prefetch={false} data-physical-control={mode}>
      <span className="guides-deck-hardware-face" aria-hidden="true">
        <Image src="/images/hsdj-redesign/controls/buttons/play-pause-round.png" alt="" width={130} height={130} sizes="72px" />
      </span>
      <span className="guides-deck-hardware-copy">
        {eyebrow && <small>{eyebrow}</small>}
        <strong>{label}</strong>
      </span>
      <span className="guides-deck-hardware-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Wedding Planning Guides",
  description,
  openGraph: { title: "Wedding Planning Guides | Howe Sound DJ", description, url: "/guides", type: "website", images: ["/og-cake-party-v2.jpg"] },
  twitter: { card: "summary_large_image", title: "Wedding Planning Guides | Howe Sound DJ", description, images: ["/og-cake-party-v2.jpg"] },
  alternates: { canonical: "/guides" },
};

export default function GuidesHubPage() {
  return (
    <main className="hsdj-interior hsdj-guides-page hsdj-guides-deck min-h-screen text-white">
      <JsonLd data={guidesHubBreadcrumbJsonLd()} />
      <div className="guides-deck-world" aria-hidden="true">
        <Image src="/images/hsdj-redesign/new-editorial/guides-mixer-collage-v1.webp" alt="" fill sizes="100vw" priority />
      </div>
      <section className="guides-deck-hero" aria-labelledby="guides-deck-title">
        <div className="guides-deck-hero-copy">
          <MeterMatrixHeading id="guides-deck-title" className="guides-deck-title" text={guideTitle} lines={["Good parties", "are made", "on purpose."]} />
          <HeroSignalCopy>Two questions behind a night people remember: who do you trust with the music, and how do you get everyone onto the floor?</HeroSignalCopy>
          <nav className="guides-deck-hero-routes" aria-label="Choose a planning question">
            <a href="#guide-one" data-physical-control="beat-jump">
              <span className="guides-deck-jump-face" aria-hidden="true"><Image src="/images/hsdj-redesign/controls/buttons/beat-jump-mode.png" alt="" width={94} height={26} sizes="94px" /></span>
              <strong>Build the dance floor</strong><span aria-hidden="true">↘</span>
            </a>
            <a href="#guide-two" data-physical-control="beat-jump">
              <span className="guides-deck-jump-face" aria-hidden="true"><Image src="/images/hsdj-redesign/controls/buttons/beat-jump-mode.png" alt="" width={94} height={26} sizes="94px" /></span>
              <strong>Choose your DJ</strong><span aria-hidden="true">↘</span>
            </a>
          </nav>
        </div>
      </section>

      <section id="guide-one" className="guides-deck-feature guides-deck-floor" aria-labelledby="guides-floor-title">
        <div className="guides-deck-floor-gallery">
          <div className="guides-deck-floor-photo guides-deck-floor-photo--main">
            <Image src="/images/brand-editorial/hsdj-packed-dance-floor-editorial.webp" alt="Wedding guests crowd the dance floor with their hands raised" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="guides-deck-floor-photo guides-deck-floor-photo--detail">
            <Image src="/images/hsdj-redesign/wedding-story/read-room-dancefloor-overhead-v1.webp" alt="An overhead view of guests dancing at a mountain wedding" fill sizes="(max-width: 900px) 55vw, 23vw" />
          </div>
        </div>
        <div className="guides-deck-feature-copy">
          <h2 id="guides-floor-title">How to keep a wedding dance floor packed.</h2>
          <p>Why the first song after dinner matters, why familiar music earns trust, and why a mountain wedding needs its own kind of pacing.</p>
          <HardwareLink eyebrow="Press play" href="/guides/how-to-keep-a-wedding-dance-floor-packed" label="Read the floor guide" />
        </div>
      </section>

      <section id="guide-two" className="guides-deck-feature guides-deck-choice" aria-labelledby="guides-choice-title">
        <div className="guides-deck-choice-art">
          <GuidesTurntable />
        </div>
        <div className="guides-deck-feature-copy">
          <h2 id="guides-choice-title">How to choose the DJ who gets your wedding.</h2>
          <p>Ceremony sound. Speeches. Requests. The songs you love and the ones you never want to hear. Here&apos;s what to ask before you book.</p>
          <HardwareLink eyebrow="Press play" href="/guides/how-to-choose-a-wedding-dj-in-squamish" label="Read the choosing guide" />
        </div>
      </section>

      <nav className="guides-deck-exit" aria-label="More ways to explore">
        <p>Want to picture a particular room?</p>
        <div className="guides-deck-exit-links">
          <HardwareLink href="/guides/sea-to-sky-wedding-dj-cost" label="Compare DJ quotes" mode="hot-cue" />
          <HardwareLink href="/venues" label="Follow the venue route" mode="hot-cue" />
          <HardwareLink href="/faq" label="Ask the practical questions" mode="hot-cue" />
        </div>
      </nav>
    </main>
  );
}
