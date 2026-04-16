/**
 * Curated venues and businesses where Howe Sound DJ has worked — used for homepage trust
 * and /venues landing pages. External URLs should be verified periodically.
 *
 * Full page content lives in `venue-pages.ts`; `VENUES` preserves the legacy card shape for the homepage grid.
 */
import { VENUE_PAGES } from "@/config/venue-pages";

export type { VenuePage, VenueArea } from "@/config/venue-pages";
export { VENUE_PAGES, getVenueBySlug, getAllVenueSlugs } from "@/config/venue-pages";

export type VenueEntry = {
  name: string;
  description: string;
  href: string;
  /** Internal guide URL — `/venues/[slug]` */
  slug: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const VENUES: readonly VenueEntry[] = VENUE_PAGES.map((v) => ({
  name: v.name,
  description: v.cardDescription,
  href: v.officialUrl,
  slug: v.slug,
}));
