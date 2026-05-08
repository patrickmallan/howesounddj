import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { guidesHubBreadcrumbJsonLd } from "@/lib/json-ld";

const hubDesc =
  "Practical Sea-to-Sky wedding planning guides from Howe Sound DJ, covering dance floor energy, reception flow, music planning, and how to create a wedding night that feels aligned.";

export const metadata: Metadata = {
  title: "Wedding Planning Guides",
  description: hubDesc,
  openGraph: {
    title: "Wedding Planning Guides | Howe Sound DJ",
    description: hubDesc,
    url: "/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Planning Guides | Howe Sound DJ",
    description: hubDesc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    slug: "how-to-keep-a-wedding-dance-floor-packed",
    title: "How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding",
    summary:
      "Why packed floors are not accidental, how mountain settings change the plan, and the Roomflow Method for emotional pacing, recognition, and guest trust.",
  },
] as const;

export default function GuidesHubPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={guidesHubBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Planning guides
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Sea-to-Sky weddings</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Wedding Planning Guides</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{hubDesc}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              These guides are written in Howe Sound DJ&apos;s voice: calm planning clarity, ceremony-to-dance-floor thinking, and respect for how mountain weddings actually feel on the day.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Guides</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Start here</h2>
        </div>
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <StaggerItem key={g.slug}>
              <article className="premium-surface flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold leading-snug text-white">
                  <Link
                    href={`/guides/${g.slug}`}
                    className="rounded-md transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{g.summary}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <Link
                    href={`/guides/${g.slug}`}
                    className="text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                  >
                    Read the guide →
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl text-sm leading-7 text-white/55">
            <p>
              Looking for venue-specific context? Browse{" "}
              <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                wedding venue guides
              </Link>{" "}
              or jump to{" "}
              <Link href="/weddings" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                wedding DJ services
              </Link>
              .
            </p>
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
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Bring the guide into your real timeline</h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                When the philosophy fits your day, the fastest way to make it concrete is a short consult or an availability check on your date.
              </p>
              <div className="mt-8 max-w-xl space-y-4">
                <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                <p className="text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; Just clarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
