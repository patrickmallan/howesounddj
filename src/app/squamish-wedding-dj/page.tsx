import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
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
          <p>Wedding is the event format, not the genre. I build the music around what you love, then pay attention to what your people actually do when it plays.</p>
          <a href="#sq-place">Feel this place <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="sq-place" className="sq-place" aria-labelledby="sq-place-title">
        <div className="sq-place-intro">
          <h2 id="sq-place-title">This place gets under your skin.</h2>
          <p>Coast Mountains above you. Howe Sound close by. Forest, water, and a town that has its own energy beyond the view. Squamish makes a wedding feel like you brought your people somewhere worth being together.</p>
        </div>
        <div className="sq-place-art">
          <Image src="/images/hsdj-redesign/new-editorial/squamish-night-signal-v1.webp" alt="Editorial collage of a Squamish mountain ceremony, dinner lights, DJ equipment and a wedding dance floor" fill sizes="100vw" />
        </div>
        <div className="sq-place-after">
          <strong>Come for the setting.<br />Stay for the feeling.</strong>
          <p>Guests can make a whole trip of it. Then the day narrows to one room, your favourite people, and a party that could only be yours. That contrast is what I love about playing weddings here.</p>
        </div>
      </section>

      <section className="sq-local" aria-labelledby="sq-local-title">
        <div className="sq-local-copy">
          <h2 id="sq-local-title">I get to call Squamish home.</h2>
          <p>That means I am not discovering the Sea-to-Sky corridor on your wedding day. I know the landscape is more than a backdrop: weather can turn, outdoor sound can travel, and the right room changes everything. I plan for the celebration you are actually having here.</p>
          <p>What I bring is practical local attention, then music that feels as alive as the place. No imported, one-size-fits-all wedding script.</p>
          <Link href="/vancouver-wedding-dj">Planning from Vancouver? Follow that route <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="sq-local-type" aria-hidden="true"><span>SEA</span><span>TO</span><span>SKY</span></div>
      </section>

      <section className="sq-music" aria-labelledby="sq-music-title">
        <div className="sq-music-intro">
          <h2 id="sq-music-title">The mix can go anywhere. It still sounds like you.</h2>
          <p>Disco, hip-hop, country, drum &amp; bass, indie: none of them is a mandatory stop. They are different doors into the same room. Your taste starts the conversation; I watch the floor and know when to take it somewhere new.</p>
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
          <p>A brewery, a ranch, and a mountaintop ask different things of the sound. If you are choosing a setting, the venue route is where those differences belong.</p>
          <Link href="/venues">Explore the Sea-to-Sky venue route <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="sq-outro" aria-labelledby="sq-outro-title">
        <h2 id="sq-outro-title">Got a date? Let&apos;s see where this goes.</h2>
        <p>The calendar answers right away. If I am open, book a consult and tell me about the music, your people, and the kind of night you want.</p>
        <Link href="/contact">Check your date <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
