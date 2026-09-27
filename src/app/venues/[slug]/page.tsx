import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { getVenueBySlug, getAllVenueSlugs } from "@/config/venue-pages";
import { venueDetailBreadcrumbJsonLd, venueWeddingDjServiceJsonLd } from "@/lib/json-ld";
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
    openGraph: { title: `${title} | Howe Sound DJ`, description: venue.metaDescription, url: `/venues/${venue.slug}`, type: "article", images: ["/og-share.jpg"] },
    twitter: { card: "summary_large_image", title: `${title} | Howe Sound DJ`, description: venue.metaDescription, images: ["/og-share.jpg"] },
    alternates: { canonical: `/venues/${venue.slug}` },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

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
          <nav aria-label="Breadcrumb"><Link href="/venues">← Back to the venue route</Link></nav>
          <p className="venue-dossier-overline">{venue.locationLabel} / {venue.venueType}</p>
          <MeterMatrixHeading id="venue-dossier-title" text={`The room: ${venue.name}.`} lines={["The room:", `${venue.name}.`]} />
          <HeroSignalCopy tone="green">{venue.shortSummary}</HeroSignalCopy>
          <a href={venue.officialUrl} target="_blank" rel="noopener noreferrer">Visit the official venue site <span className="sr-only">(opens in a new tab)</span> ↗</a>
        </div>
        <div className="venue-dossier-stage-plot" aria-hidden="true">
          <div className="venue-dossier-plot-room"><span>CEREMONY</span><span>SPEECHES</span><span>DANCE FLOOR</span></div>
          <div className="venue-dossier-plot-pulse" />
        </div>
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
          {venue.slug === "sea-to-sky-gondola" ? <Link href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like">See the Gondola dance-floor story ↗</Link> : null}
          {venue.slug === "sunwolf" ? <Link href="/stories/what-a-sunwolf-riverside-wedding-reception-feels-like">See the Sunwolf reception story ↗</Link> : null}
        </div>
      </section>

      <section className="venue-dossier-outro" aria-labelledby="venue-dossier-outro-title">
        <p className="venue-dossier-overline">Your date, this room, your music</p>
        <h2 id="venue-dossier-outro-title">The next cue is yours.</h2>
        <p>Check your date. If I&apos;m available, we can talk about what you want this venue to feel like from the first guest to the last song.</p>
        <Link href="/contact">Check your date <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
