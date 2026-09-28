import {
  SITE_ALTERNATE_NAMES,
  SITE_ORIGIN,
  SITE_PUBLIC_NAME,
  SITE_SHORT_NAME,
} from "@/config/site-brand";

/** @deprecated Import `SITE_ORIGIN` from `@/config/site-brand` for new code. */
export { SITE_ORIGIN };

const ORG_DESCRIPTION =
  "Versatile Squamish wedding DJ working across genres, with local venue knowledge and ceremony-to-reception support.";

/**
 * Sitewide Organization (Squamish-rooted, service-area). No street address on site.
 * No sameAs, no verified social profile URLs in the codebase. No ratings or awards.
 */
/** Canonical homepage WebSite entity for Google site-name preference. Emit on `/` only. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: SITE_PUBLIC_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_PUBLIC_NAME,
    alternateName: [SITE_SHORT_NAME],
    url: SITE_ORIGIN,
    description: ORG_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/images/logo/hsdj-business-card-sasquatch-event-dj-v1.png`,
    },
    areaServed: [
      { "@type": "City", "name": "Squamish", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    ],
  };
}

/** About-page entity tying Patrick to the organization without inventing profiles or awards. */
export function aboutPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_ORIGIN}/about#webpage`,
    url: `${SITE_ORIGIN}/about`,
    name: "Meet Patrick | Howe Sound Wedding DJ",
    description: "Meet Patrick Mallan, the Squamish-based wedding DJ who plans, mixes and performs every Howe Sound DJ wedding.",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_ORIGIN}/#patrick-mallan`,
      name: "Patrick Mallan",
      jobTitle: "Wedding DJ",
      worksFor: { "@id": `${SITE_ORIGIN}/#organization` },
      homeLocation: { "@type": "Place", name: "Squamish, British Columbia" },
    },
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
        name: "Planning a Squamish Wedding from Vancouver",
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

export function squamishWeddingDjBreadcrumbJsonLd(): Record<string, unknown> {
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
        name: "Squamish Wedding DJ",
        item: `${SITE_ORIGIN}/squamish-wedding-dj`,
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

/** Search-readable version of the venue directory rendered on `/venues`. */
export function venuesHubItemListJsonLd(
  venues: ReadonlyArray<{ slug: string; name: string; shortSummary: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_ORIGIN}/venues#venue-list`,
    name: "Squamish and Sea-to-Sky wedding venues",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: venues.length,
    itemListElement: venues.map((venue, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/venues/${venue.slug}`,
        url: `${SITE_ORIGIN}/venues/${venue.slug}`,
        name: venue.name,
        description: venue.shortSummary,
      },
    })),
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
