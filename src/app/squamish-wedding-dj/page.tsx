import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { JsonLd } from "@/components/json-ld";
import { squamishWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";
import "./squamish-afterparty.css";

const description = "Squamish wedding DJ Patrick Mallan brings open-format music and local knowledge to weddings between the Coast Mountains and Howe Sound.";
const title = "Squamish Wedding DJ | Open-Format, Locally Rooted";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/squamish-wedding-dj", type: "website", images: ["/og-cake-party-v2.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-cake-party-v2.jpg"] },
  alternates: { canonical: "/squamish-wedding-dj" },
};

export default function SquamishWeddingDjPage() {
  return (
    <main className="hsdj-interior hsdj-squamish-afterparty min-h-screen text-white">
      <JsonLd data={squamishWeddingDjBreadcrumbJsonLd()} />

      <section className="sq-hero" aria-labelledby="sq-hero-title">
        <Image
          className="sq-hero-art"
          src="/images/hsdj-redesign/new-editorial/squamish-night-collage-v3-optimized.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          aria-hidden="true"
        />
        <div className="sq-hero-copy">
          <h1 id="sq-hero-title" className="sq-hero-title">
            <span className="sq-visually-hidden">Your Squamish wedding, without the standard wedding-DJ playlist.</span>
            <Image
              src="/images/squamish/squamish-hero-fixture-v1.svg"
              alt=""
              width={1098}
              height={356}
              unoptimized
              loading="eager"
              aria-hidden="true"
            />
          </h1>
          <HeroSignalCopy tone="pink">Wedding is the event format, not the genre. I build the music around what you love, then pay attention to what your people actually do when it plays.</HeroSignalCopy>
          <a className="sq-gear-link sq-gear-link--hero" href="#sq-place">
            <span>Feel this place</span>
            <span className="sq-gear-arrow" aria-hidden="true">↓</span>
          </a>
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
          <strong>The view&apos;s covered.<span>I&apos;m here for the music.</span></strong>
          <p className="sq-field-note">I make sure the vows and speeches are heard, build the music around what you actually love, and keep watching the room once the dancing starts.</p>
        </div>
      </section>

      <section className="sq-local" aria-labelledby="sq-local-title">
        <div className="sq-local-copy">
          <h2 id="sq-local-title">I get to call Squamish home.</h2>
          <div className="sq-local-notes">
            <p>That means I am not discovering the Sea-to-Sky corridor on your wedding day. I know the landscape is more than a backdrop: weather can turn, outdoor sound can travel, and the right room changes everything.</p>
            <p>I plan for the celebration you are actually having here. <strong>Practical local attention, then music that feels as alive as the place.</strong> No imported, one-size-fits-all wedding script.</p>
          </div>
          <Link href="/vancouver-wedding-dj" prefetch={false}>Planning from Vancouver? Follow that route <span aria-hidden="true">↗</span></Link>
        </div>
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
          <div className="sq-music-foot-copy">
            <p>Different sounds. One room moving together.</p>
            <span>Your must-plays start the map. I make the turns with the room.</span>
          </div>
          <Link className="sq-gear-link sq-gear-link--floor" href="/guides/how-to-keep-a-wedding-dance-floor-packed" prefetch={false}>
            <span>How I build a dance floor</span>
            <span className="sq-gear-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="sq-venue" aria-labelledby="sq-venue-title">
        <div className="sq-venue-art">
          <div className="sq-venue-shot sq-venue-shot--gondola">
            <Image src="/images/venues/sea-to-sky-gondola-portrait-v1.webp" alt="Wedding couple on a mountain suspension bridge" fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div className="sq-venue-shot">
            <Image src="/images/venues/howe-sound-brewing-portrait-v1.webp" alt="Warmly lit wedding reception room at a brewery" fill sizes="(max-width: 900px) 50vw, 22vw" />
          </div>
          <div className="sq-venue-shot">
            <Image src="/images/venues/cheekye-ranch-portrait-v1.webp" alt="Ranch wedding tent beneath the Squamish mountains" fill sizes="(max-width: 900px) 50vw, 22vw" />
          </div>
        </div>
        <div>
          <h2 id="sq-venue-title">The room changes the record.</h2>
          <p className="sq-venue-copy"><span>A brewery.</span><span>A ranch.</span><span>A mountaintop.</span><strong>Each asks something different of the sound.</strong> If you are choosing a setting, the venue route is where those differences belong.</p>
          <Link className="sq-gear-link sq-gear-link--venue" href="/venues" prefetch={false}>
            <span>Explore the Sea-to-Sky venue route</span>
            <span className="sq-gear-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="sq-outro" aria-labelledby="sq-outro-title">
        <h2 id="sq-outro-title">Got a date? Let&apos;s see where this goes.</h2>
        <p className="sq-outro-copy"><span>The calendar answers right away.</span><strong>If I am open, book a consult and tell me about the music, your people, and the kind of night you want.</strong></p>
        <Link className="sq-gear-link sq-gear-link--date" href="/contact" prefetch={false}>
          <Image src="/images/hsdj-redesign/controls/buttons/cue-round.png" alt="" width={160} height={160} aria-hidden="true" />
          <span>Check your date</span>
          <span className="sq-gear-arrow" aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
