import Link from "next/link";

const homepageAuthorityDiscoveryLinks = [
  { href: "/guides", label: "Wedding Planning Guides" },
  { href: "/stories", label: "Featured Wedding Stories" },
  { href: "/whistler-wedding-dj", label: "Whistler Wedding DJ" },
  { href: "/venues", label: "Sea-to-Sky Venues" },
] as const;

const exploreCardBase =
  "premium-surface flex h-full min-h-[5.25rem] w-full min-w-0 flex-col justify-center rounded-2xl px-5 py-4 text-left text-base font-semibold transition sm:min-h-[5.5rem] sm:px-6 sm:py-5";

/** Homepage: authority discovery above the site footer (homepage omits global pre-footer CTA). */
export function HomepageExploreSection() {
  return (
    <section
      className="border-t border-white/10 bg-neutral-950"
      aria-labelledby="home-authority-discovery-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
        <h2
          id="home-authority-discovery-heading"
          className="max-w-2xl text-base font-semibold leading-relaxed text-white sm:text-lg sm:leading-8"
        >
          Planning a Sea-to-Sky wedding? Explore venue guides, planning advice, and real dance-floor atmosphere.
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homepageAuthorityDiscoveryLinks.map((item) => (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                className={`${exploreCardBase} border border-amber-300/20 bg-amber-300/[0.06] text-white hover:border-amber-300/35 hover:bg-amber-300/[0.09]`}
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
