import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { ACTIVE_VENUE_PAGES } from "@/config/venue-pages";
import { venuesHubBreadcrumbJsonLd } from "@/lib/json-ld";
import "./venue-journey.css";

const description =
  "Explore Squamish wedding venues through the music, sound, and reception-flow questions each setting brings to the day.";

export const metadata: Metadata = {
  title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning",
  description,
  openGraph: {
    images: ["/og-share.jpg"],
    title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning | Howe Sound DJ",
    description,
    url: "/venues",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning | Howe Sound DJ",
    description,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/venues" },
};

export default function VenuesHubPage() {
  return (
    <main className="hsdj-interior hsdj-venues-page hsdj-venue-journey min-h-screen text-white">
      <JsonLd data={venuesHubBreadcrumbJsonLd()} />
      <section className="venue-journey-hero" aria-labelledby="venue-journey-title">
        <Image
          src="/images/hsdj-redesign/packages/packages-ceremony-clue-v2.webp"
          alt="Wedding guests looking toward a mountain ceremony"
          fill
          sizes="100vw"
          className="venue-journey-hero-image"
          priority
        />
        <div className="venue-journey-hero-content">
          <p className="venue-journey-kicker">Squamish / Sea-to-Sky / Your room</p>
          <MeterMatrixHeading
            id="venue-journey-title"
            text="Every room changes the music."
            lines={["Every room", "changes the", "music."]}
          />
          <HeroSignalCopy className="venue-journey-lede" tone="green">
            A gondola, a riverside lodge, a farm, a brewery. Same wedding, completely different energy.
            Pick the place you&apos;re picturing and follow the questions that setting brings to the party.
          </HeroSignalCopy>
          <a className="venue-journey-cue" href="#venue-route">Follow the venue route <span aria-hidden="true">↓</span></a>
        </div>
        <div className="venue-journey-side-note" aria-hidden="true">THE SETTING IS PART OF THE SET</div>
      </section>

      <section id="venue-route" className="venue-route-section" aria-labelledby="venue-route-title">
        <div className="venue-route-intro">
          <span className="venue-route-led" aria-hidden="true" />
          <div>
            <p className="venue-route-overline">The corridor, venue by venue</p>
            <h2 id="venue-route-title">Find your room. Hear the possibilities.</h2>
            <p>Each stop opens a guide to the sound, transitions, and guest flow worth thinking through there.</p>
          </div>
        </div>
        <ol className="venue-route-list">
          {ACTIVE_VENUE_PAGES.map((venue, index) => (
            <li key={venue.slug} className="venue-route-stop">
              <span className="venue-route-spindle" aria-hidden="true"><span /></span>
              <div className="venue-route-stop-content">
                <div className="venue-route-meta">
                  <span>{venue.locationLabel}</span>
                  <span>{venue.venueType}</span>
                </div>
                <h3><Link href={`/venues/${venue.slug}`}>{venue.name}</Link></h3>
                <p>{venue.shortSummary}</p>
                <div className="venue-route-actions">
                  <Link href={`/venues/${venue.slug}`}>Step into this venue <span aria-hidden="true">↗</span></Link>
                  <a href={venue.officialUrl} target="_blank" rel="noopener noreferrer">Official venue site <span className="sr-only">(opens in a new tab)</span></a>
                </div>
              </div>
              {index % 3 === 1 ? <span className="venue-route-scratch" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="venue-journey-outro">
        <p className="venue-route-overline">The place is picked. What about the music?</p>
        <h2>Let&apos;s see if your date is open.</h2>
        <p>Start with the date. If I&apos;m available, we can talk through what this particular room needs from the DJ.</p>
        <Link href="/contact">Check your date <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
