import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { SectionReveal } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
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

  const serviceDescription = `Wedding DJ support for ceremonies and receptions when you are planning around ${venue.name} (${venue.locationLabel}). Music, pacing, and planning communication focused on Sea-to-Sky weddings, without claiming venue exclusivity.`;

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
            <div className="mt-8 max-w-xl space-y-4">
              <div>
                <BookConsultTrackedLink surface="venue_hero" />
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; Just clarity
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
                <CheckAvailabilityTrackedLink surface="venue_hero" className={bookConsultOutlineButtonClassName} />
                <a
                  href={venue.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Official venue website<span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why this guide exists</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Flow, atmosphere, and pacing before the playlist talk</h2>
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

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent`}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Check your date, plan the conversation, or do both in whatever order suits you</h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                The same contact flow powers every venue guide: calendar check when you want it first, alignment on availability and planning when you&apos;re ready, and your details whenever you prefer to send them.
              </p>
              <div className="mt-8 max-w-xl space-y-4">
                <div>
                  <BookConsultTrackedLink surface="venue_page_cta" />
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    15 minutes &bull; No pressure &bull; Just clarity
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 gap-y-3">
                  <CheckAvailabilityTrackedLink
                    href="/contact#availability"
                    surface="venue_page_cta"
                    className={bookConsultOutlineButtonClassName}
                  />
                  <Link
                    href="/reviews"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    Wedding DJ Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
