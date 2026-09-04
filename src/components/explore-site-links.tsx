import Link from "next/link";
import { PAGE_GUTTER_X, SECTION_BAND_Y, SECTION_SHELL } from "@/lib/cta-section-spacing";

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
    description: "Local wedding DJ support for celebrations in Squamish.",
    emphasize: true,
  },
  { href: "/guides", label: "Wedding Planning Guides" },
  { href: "/stories", label: "Featured Wedding Stories" },
  { href: "/vancouver-wedding-dj", label: "Planning from Vancouver" },
  { href: "/venues", label: "Squamish Wedding Venues" },
];

const exploreCardBase =
  "premium-surface flex h-full w-full min-w-0 flex-col justify-center rounded-2xl px-5 py-5 text-left transition sm:min-h-[7rem] sm:px-6";

/** Homepage: authority discovery above the site footer (homepage omits global pre-footer CTA). */
export function HomepageExploreSection() {
  return (
    <section
      className="border-t border-white/10 bg-neutral-950"
      aria-labelledby="home-authority-discovery-heading"
    >
      <div data-testid="home-explore-inner" className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_Y}`}>
        <h2
          id="home-authority-discovery-heading"
          className="max-w-2xl text-base font-semibold leading-relaxed text-white sm:text-lg sm:leading-8"
        >
          Planning a Squamish wedding? Explore local venues, practical guides, and real celebration stories when you want more detail.
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
