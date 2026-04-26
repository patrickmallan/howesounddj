import Link from "next/link";
import { BookConsultTrackedLink } from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

/** Primary sitelink targets — consistent anchor text site-wide. */
export const explorePrimaryLinks = [
  { href: "/weddings", label: "Wedding DJ Services" },
  { href: "/packages", label: "Wedding DJ Packages" },
  { href: "/reviews", label: "Wedding DJ Reviews" },
  { href: "/about", label: "About Howe Sound DJ" },
] as const;

export const exploreSecondaryLinks = [
  { href: "/vancouver-wedding-dj", label: "Whistler & Vancouver Weddings" },
  { href: "/venues", label: "Venue guides" },
] as const;

/** Homepage: prominent cards directly below hero (sitelink structural signal). */
export function HomepageExploreSection() {
  return (
    <section
      className="border-b border-white/10 bg-neutral-950"
      aria-labelledby="home-explore-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h2
            id="home-explore-heading"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300"
          >
            Explore
          </h2>
          <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Wedding DJ services, packages, reviews, and planning
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {explorePrimaryLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="premium-surface flex h-full min-h-[5.5rem] flex-col justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-base font-semibold text-white transition hover:border-amber-300/25 hover:bg-white/[0.07]"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <CheckAvailabilityTrackedLink
              surface="inline"
              className="premium-surface flex h-full min-h-[5.5rem] flex-col justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 px-6 py-5 text-base font-semibold text-amber-100 transition hover:border-amber-300/40 hover:bg-amber-300/15"
            >
              Check Availability
            </CheckAvailabilityTrackedLink>
          </li>
          <li>
            <BookConsultTrackedLink
              surface="explore_card"
              className="premium-surface flex h-full min-h-[5.5rem] flex-col justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-base font-semibold text-white transition hover:border-amber-300/25 hover:bg-white/[0.07]"
            >
              Book a Consult
            </BookConsultTrackedLink>
          </li>
          <li>
            <Link
              href="/vancouver-wedding-dj"
              className="premium-surface flex h-full min-h-[5.5rem] flex-col justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-base font-semibold text-white transition hover:border-amber-300/25 hover:bg-white/[0.07]"
            >
              Whistler &amp; Vancouver Weddings
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Site-wide strip above footer — reinforces internal link importance on every page. */
export function ExploreSiteLinksStrip() {
  return (
    <div className="border-t border-white/10 bg-neutral-950/95">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80">
          Explore
        </p>
        <nav
          className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-white/75"
          aria-label="Key pages"
        >
          {explorePrimaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-amber-200/95"
            >
              {item.label}
            </Link>
          ))}
          <CheckAvailabilityTrackedLink
            surface="footer"
            className="transition hover:text-amber-200/95"
          >
            Check Availability
          </CheckAvailabilityTrackedLink>
          <BookConsultTrackedLink surface="footer" className="transition hover:text-amber-200/95">
            Book a Consult
          </BookConsultTrackedLink>
          {exploreSecondaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-amber-200/95"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
