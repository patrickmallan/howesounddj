import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ControllerButtonFace } from "@/components/controller-button-face";
import { JsonLd } from "@/components/json-ld";
import { getVenueBySlug, getAllVenueSlugs } from "@/config/venue-pages";
import { venueDetailBreadcrumbJsonLd, venueWeddingDjServiceJsonLd } from "@/lib/json-ld";
import { VENUE_HEADING_ART } from "@/config/venue-heading-art";
import { VENUE_EDITORIAL } from "@/config/venue-editorial";
import "./venue-dossier.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllVenueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return {};
  const title = venue.slug === "capilano-university-squamish-campus"
    ? `Event DJ planning for ${venue.name} · ${venue.locationLabel}`
    : `Wedding DJ for ${venue.name} · ${venue.locationLabel}`;
  return {
    title,
    description: venue.metaDescription,
    openGraph: { title: `${title} | Howe Sound DJ`, description: venue.metaDescription, url: `/venues/${venue.slug}`, type: "article", images: ["/og-cake-party-v2.jpg"] },
    twitter: { card: "summary_large_image", title: `${title} | Howe Sound DJ`, description: venue.metaDescription, images: ["/og-cake-party-v2.jpg"] },
    alternates: { canonical: `/venues/${venue.slug}` },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();
  const headingArt = VENUE_HEADING_ART[venue.slug as keyof typeof VENUE_HEADING_ART];
  const editorial = VENUE_EDITORIAL[venue.slug];
  if (!editorial) notFound();

  return (
    <main className="hsdj-venue-dossier min-h-screen text-white" data-tone={editorial.tone} data-layout={editorial.layout}>
      <JsonLd data={venueDetailBreadcrumbJsonLd(venue.name, venue.slug)} />
      {venue.slug !== "capilano-university-squamish-campus" ? <JsonLd data={venueWeddingDjServiceJsonLd({
        slug: venue.slug,
        venueName: venue.name,
        locationLabel: venue.locationLabel,
        description: `Wedding DJ planning for ${venue.name} in ${venue.locationLabel}, including ceremony sound, reception music, and the flow of the day.`,
      })} /> : null}

      <section className="venue-dossier-hero" aria-labelledby="venue-dossier-title">
        <div className="venue-dossier-hero-art" aria-hidden="true">
          <Image src={editorial.portrait} alt="" fill sizes="(max-width: 760px) 100vw, 65vw" priority />
        </div>
        <div className="venue-dossier-hero-copy">
          <nav aria-label="Breadcrumb"><Link href="/venues" prefetch={false}>← All venues</Link></nav>
          <p className="venue-dossier-overline">{venue.locationLabel} / {venue.venueType}</p>
          <h1 id="venue-dossier-title" className="venue-dossier-heading">
            <span className="sr-only">{venue.name}</span>
            <Image
              src={headingArt.src}
              alt=""
              aria-hidden="true"
              width={headingArt.width}
              height={headingArt.height}
              unoptimized
              loading="eager"
              fetchPriority="high"
            />
          </h1>
          <p className="venue-dossier-hero-intro">{editorial.intro}</p>
          {editorial.bookingNote ? <p className="venue-dossier-booking-note">{editorial.bookingNote}</p> : null}
          <a className="venue-dossier-source-link" href={editorial.sources[0].url} target="_blank" rel="noopener noreferrer">See the venue&apos;s details ↗</a>
        </div>
        <p className="venue-dossier-art-caption">Venue-inspired editorial artwork · not venue photography</p>
      </section>

      <section className="venue-dossier-details" aria-labelledby="venue-dossier-details-title">
        <div className="venue-dossier-section-lead">
          <p className="venue-dossier-section-number">01 / The place</p>
          <h2 id="venue-dossier-details-title">{editorial.headline}</h2>
          <p>These are the details that would shape my plan for this venue, not just the view in the photos.</p>
        </div>
        <ol className="venue-dossier-facts">
          {editorial.facts.map((fact, index) => <li key={fact.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{fact.label}</h3><p>{fact.detail}</p></div>
          </li>)}
        </ol>
        <p className="venue-dossier-research-note">Venue information checked against {editorial.sources.map((source, index) => <span key={source.url}>{index > 0 ? " and " : ""}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></span>)}. Confirm current packages, access and rules directly with the venue.</p>
      </section>

      <section className="venue-dossier-plan" aria-labelledby="venue-dossier-plan-title">
        <div className="venue-dossier-plan-heading">
          <p className="venue-dossier-section-number">02 / Behind the decks</p>
          <h2 id="venue-dossier-plan-title">{editorial.djHeadline}</h2>
          <p>Here&apos;s where I&apos;d start the conversation about sound and the night itself.</p>
        </div>
        <ol className="venue-dossier-cues">
          {editorial.djNotes.map((note, index) => <li key={note.cue}>
            <span className="venue-dossier-cue-index">0{index + 1}</span>
            <h3>{note.cue}</h3>
            <p>{note.detail}</p>
          </li>)}
        </ol>
        <div className="venue-dossier-story-link">
          {venue.slug === "sea-to-sky-gondola" ? <Link href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like" prefetch={false}>See the Gondola dance-floor story ↗</Link> : null}
          {venue.slug === "sunwolf" ? <Link href="/stories/what-a-sunwolf-riverside-wedding-reception-feels-like" prefetch={false}>See the Sunwolf reception story ↗</Link> : null}
        </div>
      </section>

      <section className="venue-dossier-outro" aria-labelledby="venue-dossier-outro-title">
        <p className="venue-dossier-overline">{venue.name} / your people / your music</p>
        <h2 id="venue-dossier-outro-title">Now let&apos;s talk about your date.</h2>
        <p>Tell me what you&apos;ve booked or what you&apos;re still figuring out. If I&apos;m free, we can work through how the music fits this particular place.</p>
        <CheckAvailabilityTrackedLink href="/contact#availability" surface="venue_page_cta" className="hsdj-controller-button hsdj-controller-button--cue venue-dossier-date-cue">
          <ControllerButtonFace eyebrow="Load your date" label="Check your date" control="cue" />
        </CheckAvailabilityTrackedLink>
      </section>
    </main>
  );
}
