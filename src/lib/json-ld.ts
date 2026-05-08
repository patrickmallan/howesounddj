/** Canonical site origin, keep in sync with `metadataBase` in `src/app/layout.tsx`. */
export const SITE_ORIGIN = "https://www.howesounddj.com";

const ORG_DESCRIPTION =
  "Squamish wedding DJ for Sea-to-Sky weddings. Personalized music, professional planning, and polished ceremony-to-reception support, across Whistler, Vancouver, and the corridor.";

/**
 * Sitewide Organization (Squamish-rooted, service-area). No street address on site.
 * No sameAs, no verified social profile URLs in the codebase. No ratings or awards.
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

export function whistlerWeddingDjBreadcrumbJsonLd(): Record<string, unknown> {
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
        name: "Whistler Wedding DJ",
        item: `${SITE_ORIGIN}/whistler-wedding-dj`,
      },
    ],
  };
}

export function storiesHubBreadcrumbJsonLd(): Record<string, unknown> {
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
        name: "Featured weddings & stories",
        item: `${SITE_ORIGIN}/stories`,
      },
    ],
  };
}

export function storyArticleBreadcrumbJsonLd(storyTitle: string, slug: string): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/stories/${slug}`;
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
        name: "Featured weddings & stories",
        item: `${SITE_ORIGIN}/stories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: storyTitle,
        item: pageUrl,
      },
    ],
  };
}

/** Article under `/stories/` for editorial and proof-style pages. */
export function storyArticleJsonLd(args: {
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/stories/${args.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
  };
}

export function venuesHubBreadcrumbJsonLd(): Record<string, unknown> {
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
        name: "Wedding venues",
        item: `${SITE_ORIGIN}/venues`,
      },
    ],
  };
}

export function venueDetailBreadcrumbJsonLd(venueName: string, slug: string): Record<string, unknown> {
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
        name: "Wedding venues",
        item: `${SITE_ORIGIN}/venues`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: venueName,
        item: `${SITE_ORIGIN}/venues/${slug}`,
      },
    ],
  };
}

/**
 * Service-oriented schema for a venue guide page: describes DJ services in context of a place,
 * without implying venue ownership or proprietary partnership.
 */
export function venueWeddingDjServiceJsonLd(args: {
  slug: string;
  venueName: string;
  locationLabel: string;
  description: string;
}): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/venues/${args.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Wedding DJ services (ceremonies & receptions)`,
    description: args.description,
    url: pageUrl,
    serviceType: "Wedding DJ",
    provider: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: args.locationLabel,
    },
    audience: {
      "@type": "Audience",
      audienceType: `Couples planning weddings at or near ${args.venueName}`,
    },
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

export function guidesHubBreadcrumbJsonLd(): Record<string, unknown> {
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
        name: "Wedding planning guides",
        item: `${SITE_ORIGIN}/guides`,
      },
    ],
  };
}

export function guideArticleBreadcrumbJsonLd(articleTitle: string, slug: string): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/guides/${slug}`;
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
        name: "Wedding planning guides",
        item: `${SITE_ORIGIN}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: articleTitle,
        item: pageUrl,
      },
    ],
  };
}

/** Article schema for long-form planning guides; publisher references sitewide Organization. */
export function guideArticleJsonLd(args: {
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/guides/${args.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
  };
}
