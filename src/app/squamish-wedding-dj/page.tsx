import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { squamishWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";
import "./squamish-afterparty.css";

const description = "Squamish wedding DJ Patrick Mallan brings open-format music and local knowledge to weddings between the Coast Mountains and Howe Sound.";
const title = "Squamish Wedding DJ | Open-Format, Locally Rooted";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/squamish-wedding-dj", type: "website", images: ["/og-share.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-share.jpg"] },
  alternates: { canonical: "/squamish-wedding-dj" },
};

export default function SquamishWeddingDjPage() {
  preload("/images/hsdj-redesign/new-editorial/squamish-night-collage-v3-optimized.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <main className="hsdj-interior hsdj-squamish-afterparty min-h-screen text-white">
      <JsonLd data={squamishWeddingDjBreadcrumbJsonLd()} />

      <section className="sq-hero" aria-labelledby="sq-hero-title">
        <div className="sq-hero-copy">
          <MeterMatrixHeading id="sq-hero-title" text="Your Squamish wedding, without the standard wedding-DJ playlist." />
          <HeroSignalCopy tone="pink">Wedding is the event format, not the genre. I build the music around what you love, then pay attention to what your people actually do when it plays.</HeroSignalCopy>
          <a href="#sq-place">Feel this place <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="sq-place" className="sq-place" aria-labelledby="sq-place-title">
        <div className="sq-place-intro">
          <h2 id="sq-place-title">This place gets under your skin.</h2>
          <p className="sq-place-copy">
            <span>Coast Mountains above you.</span>
            <span>Howe Sound close by.</span>
            <span>Forest, water, and a town with energy beyond the view.</span>
            <strong>Squamish makes a wedding feel like you brought your people somewhere worth being together.</strong>
          </p>
        </div>
        <div className="sq-place-art">
          <Image src="/images/hsdj-redesign/new-editorial/squamish-night-signal-v1.webp" alt="Editorial collage of a Squamish mountain ceremony, dinner lights, DJ equipment and a wedding dance floor" fill sizes="100vw" />
        </div>
        <div className="sq-place-after">
          <strong>Come for the setting.<br />Stay for the feeling.</strong>
          <p className="sq-field-note">Guests can make a whole trip of it. Then the day narrows to one room, your favourite people, and a party that could only be yours. <strong>That contrast is what I love about playing weddings here.</strong></p>
        </div>
      </section>

      <section className="sq-local" aria-labelledby="sq-local-title">
        <div className="sq-local-copy">
          <h2 id="sq-local-title">I get to call Squamish home.</h2>
          <div className="sq-local-notes">
            <p>That means I am not discovering the Sea-to-Sky corridor on your wedding day. I know the landscape is more than a backdrop: weather can turn, outdoor sound can travel, and the right room changes everything.</p>
            <p>I plan for the celebration you are actually having here. <strong>Practical local attention, then music that feels as alive as the place.</strong> No imported, one-size-fits-all wedding script.</p>
          </div>
          <Link href="/vancouver-wedding-dj">Planning from Vancouver? Follow that route <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="sq-local-type" aria-hidden="true"><span>SEA</span><span>TO</span><span>SKY</span></div>
      </section>

      <section className="sq-music" aria-labelledby="sq-music-title">
        <div className="sq-music-intro">
          <h2 id="sq-music-title">The mix can go anywhere. It still sounds like you.</h2>
          <p className="sq-music-copy">
            <strong><span>Disco</span><span>Hip-hop</span><span>Country</span><span>Drum &amp; bass</span><span>Indie</span></strong>
            <span>None is a mandatory stop. They are different doors into the same room.</span>
            <span>Your taste starts the conversation; I watch the floor and know when to take it somewhere new.</span>
          </p>
        </div>
        <div className="sq-music-art">
          <Image src="/images/hsdj-redesign/new-editorial/squamish-genre-mural-v1.webp" alt="Editorial music collage moving through disco, hip-hop, country, drum and bass, and indie visual styles at a Squamish wedding" fill sizes="100vw" />
          <span className="sq-music-playhead" aria-hidden="true" />
        </div>
        <div className="sq-music-foot">
          <p>Different sounds. One room moving together.</p>
          <Link href="/guides/how-to-keep-a-wedding-dance-floor-packed">How I build a dance floor <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="sq-venue" aria-labelledby="sq-venue-title">
        <div className="sq-venue-arrow" aria-hidden="true">↘</div>
        <div>
          <h2 id="sq-venue-title">The room changes the record.</h2>
          <p className="sq-venue-copy"><span>A brewery.</span><span>A ranch.</span><span>A mountaintop.</span><strong>Each asks something different of the sound.</strong> If you are choosing a setting, the venue route is where those differences belong.</p>
          <Link href="/venues">Explore the Sea-to-Sky venue route <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="sq-outro" aria-labelledby="sq-outro-title">
        <h2 id="sq-outro-title">Got a date? Let&apos;s see where this goes.</h2>
        <p className="sq-outro-copy"><span>The calendar answers right away.</span><strong>If I am open, book a consult and tell me about the music, your people, and the kind of night you want.</strong></p>
        <Link href="/contact">Check your date <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
