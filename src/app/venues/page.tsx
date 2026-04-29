import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { VENUE_PAGES } from "@/config/venue-pages";
import { venuesHubBreadcrumbJsonLd } from "@/lib/json-ld";

const hubDesc =
  "Sea-to-Sky and Squamish wedding venue guides: planning-focused DJ context for mountain, farm, brewery, and corridor celebrations, without generic filler. Howe Sound DJ.";

export const metadata: Metadata = {
  title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning",
  description: hubDesc,
  openGraph: {
    title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning | Howe Sound DJ",
    description: hubDesc,
    url: "/venues",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Venues · Sea-to-Sky & Squamish DJ Planning | Howe Sound DJ",
    description: hubDesc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/venues" },
};

export default function VenuesHubPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={venuesHubBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Venues
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Sea-to-Sky & Squamish</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Wedding venue guides built for real planning decisions</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              These pages are not generic “SEO shells.” Each guide connects a named venue to the kinds of music, pacing, and sound-thinking questions that matter for Sea-to-Sky weddings, from
              mountaintop receptions to downtown Squamish gatherings, then routes you into the same availability and inquiry flow as the rest of the site.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              Howe Sound DJ is wedding-focused and Squamish-rooted. Venue guides use confident local language and planning intelligence, not invented operational claims about private venue
              relationships.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="venues_hub" checkSurface="venues_hub" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
                <Link
                  href="/weddings"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Wedding DJ Services
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Wedding DJ Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Browse by venue</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Corridor venues and Squamish favourites</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Open a guide for planning context tailored to the setting, then check your date first when you are ready. For questions that apply across venues, the{" "}
            <Link href="/faq" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              FAQ
            </Link>{" "}
            is the fastest path.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
          {VENUE_PAGES.map((v) => (
            <StaggerItem key={v.slug}>
              <article className="premium-surface flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/85">{v.locationLabel}</div>
                <div className="mt-1 text-xs text-white/45">{v.venueType}</div>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
                  <Link
                    href={`/venues/${v.slug}`}
                    className="rounded-md transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {v.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{v.shortSummary}</p>
                <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={`/venues/${v.slug}`}
                    className="text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                  >
                    Read the guide →
                  </Link>
                  <a
                    href={v.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 transition hover:text-white/65"
                  >
                    Official site<span className="sr-only"> (opens in new tab)</span>
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-white/[0.03]`}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Your next move: your date, your details, or both</h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Venue guides help you think in advance; the contact flow is where availability, your plans, and coverage come together, the same path used across the site.
              </p>
              <div className="mt-8 max-w-xl space-y-4">
                <CTADuo bookSurface="venues_hub" checkSurface="venues_hub" />
                <p className="text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; Just clarity
                </p>
                <div className="flex flex-wrap items-center gap-3 gap-y-3">
                  <Link
                    href="/faq"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    FAQ
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
