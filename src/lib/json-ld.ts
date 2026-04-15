/** Canonical site origin — keep in sync with `metadataBase` in `src/app/layout.tsx`. */
export const SITE_ORIGIN = "https://www.howesounddj.com";

const ORG_DESCRIPTION =
  "Squamish wedding DJ for Sea-to-Sky weddings. Personalized music, professional planning, and polished ceremony-to-reception support, across Whistler, Vancouver, and the corridor.";

/**
 * Sitewide Organization (Squamish-rooted, service-area). No street address on site.
 * No sameAs — no verified social profile URLs in the codebase. No ratings or awards.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "Howe Sound DJ",
    url: SITE_ORIGIN,
    description: ORG_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/og-default.svg`,
    },
    areaServed: [
      { "@type": "City", "name": "Squamish", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
      { "@type": "City", "name": "Whistler", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
      { "@type": "City", "name": "Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
      { "@type": "Place", "name": "Sea-to-Sky Corridor", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    ],
  };
}

export function vancouverWeddingDjBreadcrumbJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vancouver Wedding DJ · Sea-to-Sky",
        item: `${SITE_ORIGIN}/vancouver-wedding-dj`,
      },
    ],
  };
}

export function faqPageJsonLd(
  items: ReadonlyArray<{ q: string; a: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
