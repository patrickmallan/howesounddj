import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { JsonLd } from "@/components/json-ld";
import { getVenueBySlug, getAllVenueSlugs } from "@/config/venue-pages";
import { venueDetailBreadcrumbJsonLd, venueWeddingDjServiceJsonLd } from "@/lib/json-ld";
import { VENUE_HEADING_ART } from "@/config/venue-heading-art";
import { VenueFlowDiagram } from "@/components/venue-flow-diagram";
import "./venue-dossier.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllVenueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return {};
  const title = `Wedding DJ for ${venue.name} · ${venue.locationLabel}`;
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

  return (
    <main className="hsdj-interior hsdj-venue-detail-page hsdj-venue-dossier min-h-screen text-white">
      <JsonLd data={venueDetailBreadcrumbJsonLd(venue.name, venue.slug)} />
      <JsonLd data={venueWeddingDjServiceJsonLd({
        slug: venue.slug,
        venueName: venue.name,
        locationLabel: venue.locationLabel,
        description: `Wedding DJ planning for ${venue.name} in ${venue.locationLabel}, including ceremony sound, reception music, and the flow of the day.`,
      })} />

      <section className="venue-dossier-hero" aria-labelledby="venue-dossier-title">
        <div className="venue-dossier-hero-copy">
          <nav aria-label="Breadcrumb"><Link href="/venues" prefetch={false}>← Back to the venue route</Link></nav>
          <p className="venue-dossier-overline">{venue.locationLabel} / {venue.venueType}</p>
          <h1 id="venue-dossier-title" className="venue-dossier-heading">
            <span className="sr-only">The room: {venue.name}.</span>
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
          <HeroSignalCopy tone="green">{venue.shortSummary}</HeroSignalCopy>
          <a href={venue.officialUrl} target="_blank" rel="noopener noreferrer">Visit the official venue site <span className="sr-only">(opens in a new tab)</span> ↗</a>
        </div>
        <VenueFlowDiagram slug={venue.slug} name={venue.name} />
      </section>

      <section className="venue-dossier-spread venue-dossier-setting" aria-labelledby="venue-dossier-setting-title">
        <div className="venue-dossier-spread-label"><span className="venue-dossier-knob" aria-hidden="true" /><p>The setting</p></div>
        <div className="venue-dossier-spread-copy">
          <h2 id="venue-dossier-setting-title">What this room brings to the day.</h2>
          {venue.whyFit.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="venue-dossier-spread venue-dossier-sound" aria-labelledby="venue-dossier-sound-title">
        <div className="venue-dossier-spread-label"><span className="venue-dossier-knob" aria-hidden="true" /><p>The sound</p></div>
        <div className="venue-dossier-spread-copy">
          <h2 id="venue-dossier-sound-title">Where music and timing meet.</h2>
          {venue.planningFocus.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="venue-dossier-spread venue-dossier-local" aria-labelledby="venue-dossier-local-title">
        <div className="venue-dossier-spread-label"><span className="venue-dossier-knob" aria-hidden="true" /><p>The local read</p></div>
        <div className="venue-dossier-spread-copy">
          <h2 id="venue-dossier-local-title">What I&apos;d keep in mind here.</h2>
          {venue.localExpertise.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {venue.slug === "sea-to-sky-gondola" ? <Link href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like" prefetch={false}>See the Gondola dance-floor story ↗</Link> : null}
          {venue.slug === "sunwolf" ? <Link href="/stories/what-a-sunwolf-riverside-wedding-reception-feels-like" prefetch={false}>See the Sunwolf reception story ↗</Link> : null}
        </div>
      </section>

      <section className="venue-dossier-outro" aria-labelledby="venue-dossier-outro-title">
        <p className="venue-dossier-overline">Your date, this room, your music</p>
        <h2 id="venue-dossier-outro-title">The next cue is yours.</h2>
        <p>Check your date. If I&apos;m available, we can talk about what you want this venue to feel like from the first guest to the last song.</p>
        <CheckAvailabilityTrackedLink href="/contact#availability" surface="venue_page_cta" className="venue-dossier-date-cue">
          <Image src="/images/hsdj-redesign/controls/buttons/cue-round.png" alt="" width={80} height={80} />
          <span>Check your date <span aria-hidden="true">↗</span></span>
        </CheckAvailabilityTrackedLink>
      </section>
    </main>
  );
}
