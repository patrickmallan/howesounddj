import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookConsultTrackedLink, bookConsultOutlineButtonClassName } from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { SectionReveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { getVenueBySlug, getAllVenueSlugs } from "@/config/venue-pages";
import { venueDetailBreadcrumbJsonLd, venueWeddingDjServiceJsonLd } from "@/lib/json-ld";

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
    openGraph: {
      title: `${title} | Howe Sound DJ`,
      description: venue.metaDescription,
      url: `/venues/${venue.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Howe Sound DJ`,
      description: venue.metaDescription,
      images: ["/og-share.jpg"],
    },
    alternates: {
      canonical: `/venues/${venue.slug}`,
    },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const displayName = venue.name;

  const serviceDescription = `Wedding DJ support for ceremonies and receptions when you are planning around ${venue.name} (${venue.locationLabel}). Music, pacing, and planning communication focused on Sea-to-Sky weddings—without claiming venue exclusivity.`;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={venueDetailBreadcrumbJsonLd(displayName, venue.slug)} />
      <JsonLd
        data={venueWeddingDjServiceJsonLd({
          slug: venue.slug,
          venueName: venue.name,
          locationLabel: venue.locationLabel,
          description: serviceDescription,
        })}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <nav className="text-sm text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <span className="mx-2 text-white/25" aria-hidden>
              /
            </span>
            <Link href="/venues" className="transition hover:text-white/70">
              Venues
            </Link>
            <span className="mx-2 text-white/25" aria-hidden>
              /
            </span>
            <span className="text-white/65">{displayName}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{venue.locationLabel}</div>
            <p className="mt-2 text-sm text-white/45">{venue.venueType}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Wedding DJ planning for {displayName}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">{venue.shortSummary}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CheckAvailabilityTrackedLink
                surface="venue_hero"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              />
              <BookConsultTrackedLink surface="venue_hero" className={bookConsultOutlineButtonClassName}>
                Book a Consult
              </BookConsultTrackedLink>
              <a
                href={venue.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Official venue website<span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why this guide exists</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Fit, flow, and atmosphere—before the playlist talk</h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
            {venue.whyFit.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Planning & experience</div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">From ceremony support to a dance floor that feels earned</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
              {venue.planningFocus.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Local expertise</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Sea-to-Sky weddings, Squamish-rooted planning</h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
            {venue.localExpertise.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Also useful</div>
            <ul className="mt-4 list-none space-y-3 text-sm leading-7 text-white/70">
              <li>
                <Link href="/weddings" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Wedding DJ Services
                </Link>
              </li>
              <li>
                <Link href="/packages" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Wedding DJ Packages
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  All venue guides
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Check availability</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Start with your date—then talk fit and coverage</h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                The same contact flow powers every venue guide: pick your date, check the calendar, then continue when you are ready to share details.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <CheckAvailabilityTrackedLink
                  href="/contact#availability"
                  surface="venue_page_cta"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
                />
                <BookConsultTrackedLink surface="venue_page_cta" className={bookConsultOutlineButtonClassName}>
                  Book a Consult
                </BookConsultTrackedLink>
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Wedding DJ Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
