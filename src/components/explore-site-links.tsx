import Link from "next/link";

type ExploreLink = {
  href: string;
  label: string;
  /** Optional supporting line; keep sparse for premium density. */
  description?: string;
  /** Slightly stronger emphasis for geographic anchor card. */
  emphasize?: boolean;
};

const homepageAuthorityDiscoveryLinks: readonly ExploreLink[] = [
  {
    href: "/squamish-wedding-dj",
    label: "Squamish Wedding DJ",
    description: "Local wedding DJ support for Squamish and Sea-to-Sky celebrations.",
    emphasize: true,
  },
  { href: "/guides", label: "Wedding Planning Guides" },
  { href: "/stories", label: "Featured Wedding Stories" },
  { href: "/whistler-wedding-dj", label: "Whistler Wedding DJ" },
  { href: "/venues", label: "Sea-to-Sky Venues" },
];

const exploreCardBase =
  "premium-surface flex h-full w-full min-w-0 flex-col justify-start rounded-2xl px-5 py-4 text-left transition sm:min-h-[5.25rem] sm:px-6 sm:py-5";

/** Homepage: authority discovery above the site footer (homepage omits global pre-footer CTA). */
export function HomepageExploreSection() {
  return (
    <section
      className="border-t border-white/10 bg-neutral-950"
      aria-labelledby="home-authority-discovery-heading"
    >
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-12 lg:px-8">
        <h2
          id="home-authority-discovery-heading"
          className="max-w-2xl text-base font-semibold leading-relaxed text-white sm:text-lg sm:leading-8"
        >
          Going deeper on the corridor? Squamish context, venues, guides, and editorial notes, when you want them.
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homepageAuthorityDiscoveryLinks.map((item) => (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                className={`${exploreCardBase} text-base font-semibold text-white ${
                  item.emphasize
                    ? "border border-amber-300/35 bg-amber-300/[0.09] hover:border-amber-300/45 hover:bg-amber-300/[0.11]"
                    : "border border-amber-300/20 bg-amber-300/[0.06] hover:border-amber-300/35 hover:bg-amber-300/[0.09]"
                }`}
              >
                <span className="leading-snug">{item.label}</span>
                {item.description ? (
                  <span className="mt-2 block text-xs font-normal leading-snug text-white/50">{item.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
