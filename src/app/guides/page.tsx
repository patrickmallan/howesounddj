import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { guidesHubBreadcrumbJsonLd } from "@/lib/json-ld";
import "./guides-deck.css";

const description =
  "How to choose a wedding DJ and how to keep a Sea-to-Sky dance floor moving, from Howe Sound DJ in Squamish.";

export const metadata: Metadata = {
  title: "Wedding Planning Guides",
  description,
  openGraph: { title: "Wedding Planning Guides | Howe Sound DJ", description, url: "/guides", type: "website", images: ["/og-share.jpg"] },
  twitter: { card: "summary_large_image", title: "Wedding Planning Guides | Howe Sound DJ", description, images: ["/og-share.jpg"] },
  alternates: { canonical: "/guides" },
};

export default function GuidesHubPage() {
  return (
    <main className="hsdj-interior hsdj-guides-page hsdj-guides-deck min-h-screen text-white">
      <JsonLd data={guidesHubBreadcrumbJsonLd()} />
      <div className="guides-deck-world" aria-hidden="true">
        <Image src="/images/hsdj-redesign/new-editorial/guides-setlist-artscape-v1.webp" alt="" fill sizes="(max-width: 900px) 100vw, 75vw" priority />
      </div>
      <section className="guides-deck-hero" aria-labelledby="guides-deck-title">
        <div className="guides-deck-hero-copy">
          <MeterMatrixHeading id="guides-deck-title" text="Good parties are made on purpose." lines={["Good parties", "are made", "on purpose."]} />
          <HeroSignalCopy>Two questions behind a night people remember: who do you trust with the music, and how do you get everyone onto the floor?</HeroSignalCopy>
          <nav className="guides-deck-hero-routes" aria-label="Choose a planning question">
            <a href="#guide-one">Build the dance floor <span aria-hidden="true">↘</span></a>
            <a href="#guide-two">Choose your DJ <span aria-hidden="true">↘</span></a>
          </nav>
        </div>
      </section>

      <section id="guide-one" className="guides-deck-feature guides-deck-floor" aria-labelledby="guides-floor-title">
        <div className="guides-deck-image">
          <Image
            src="/images/brand-editorial/hsdj-packed-dance-floor-editorial.webp"
            alt="Patrick DJing for a packed wedding dance floor"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
        <div className="guides-deck-feature-copy">
          <h2 id="guides-floor-title">How to keep a wedding dance floor packed.</h2>
          <p>Why the first song after dinner matters, why familiar music earns trust, and why a mountain wedding needs its own kind of pacing.</p>
          <Link href="/guides/how-to-keep-a-wedding-dance-floor-packed">Read the floor guide <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section id="guide-two" className="guides-deck-feature guides-deck-choice" aria-labelledby="guides-choice-title">
        <div className="guides-deck-choice-art">
          <div className="guides-deck-turntable" role="img" aria-label="A black vinyl record labelled Gala, Freed from Desire, spinning on a professional turntable">
            <Image className="guides-deck-turntable-base" src="/images/hsdj-redesign/new-editorial/guides-turntable-deck-v1.webp" alt="" fill sizes="(max-width: 900px) 90vw, 44vw" />
            <div className="guides-deck-record">
              <Image src="/images/hsdj-redesign/new-editorial/guides-vinyl-record-v1.webp" alt="" fill sizes="(max-width: 900px) 65vw, 32vw" />
              <span className="guides-deck-record-label"><strong>GALA</strong><small>FREED FROM DESIRE<br />33⅓ RPM · 12″</small></span>
            </div>
          </div>
          <p className="guides-deck-track-title">Gala / Freed from Desire</p>
        </div>
        <div className="guides-deck-feature-copy">
          <h2 id="guides-choice-title">How to choose the DJ who gets your wedding.</h2>
          <p>Ceremony sound. Speeches. Requests. The songs you love and the ones you never want to hear. Here&apos;s what to ask before you book.</p>
          <Link href="/guides/how-to-choose-a-wedding-dj-in-squamish">Read the choosing guide <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <nav className="guides-deck-exit" aria-label="More ways to explore">
        <p>Want to picture a particular room?</p>
        <Link href="/venues">Follow the venue route <span aria-hidden="true">↗</span></Link>
        <Link href="/faq">Or ask the practical questions <span aria-hidden="true">↗</span></Link>
      </nav>
    </main>
  );
}
