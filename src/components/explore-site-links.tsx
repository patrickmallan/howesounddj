import Link from "next/link";

/** Primary sitelink targets, consistent anchor text site-wide. */
export const explorePrimaryLinks = [
  { href: "/weddings", label: "Weddings" },
  { href: "/packages", label: "Packages" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
] as const;

const exploreAuthorityLinks = [
  { href: "/guides", label: "Wedding Planning Guides" },
  { href: "/whistler-wedding-dj", label: "Whistler Wedding DJ" },
  { href: "/stories", label: "Featured Wedding Stories" },
] as const;

/** Shared layout for homepage Explore tiles, left-aligned labels, full-width cells. */
const exploreCardBase =
  "premium-surface flex h-full min-h-[5.5rem] w-full min-w-0 flex-col justify-center rounded-2xl px-6 py-5 text-left text-base font-semibold transition";

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
            Services, packages, reviews, and Sea-to-Sky planning
          </p>
          <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Planning a Sea-to-Sky wedding? Explore venue guides, planning advice, and real dance-floor
            atmosphere.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploreAuthorityLinks.map((item) => (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                className={`${exploreCardBase} border border-amber-300/20 bg-amber-300/[0.06] text-white hover:border-amber-300/35 hover:bg-amber-300/[0.09]`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {explorePrimaryLinks.map((item) => (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                className={`${exploreCardBase} border border-white/10 bg-white/5 text-white hover:border-amber-300/25 hover:bg-white/[0.07]`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
