import Link from "next/link";

/** Primary sitelink targets, consistent anchor text site-wide. */
export const explorePrimaryLinks = [
  { href: "/weddings", label: "Wedding DJ Services" },
  { href: "/packages", label: "Wedding DJ Packages" },
  { href: "/reviews", label: "Wedding DJ Reviews" },
  { href: "/about", label: "About Howe Sound DJ" },
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
            Wedding DJ services, packages, reviews, and planning
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <li className="min-w-0">
            <Link
              href="/vancouver-wedding-dj"
              className={`${exploreCardBase} border border-white/10 bg-white/5 text-white hover:border-amber-300/25 hover:bg-white/[0.07]`}
            >
              Whistler &amp; Vancouver Weddings
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
