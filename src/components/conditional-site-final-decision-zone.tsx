"use client";

import { usePathname } from "next/navigation";
import { SiteFinalDecisionZone } from "@/components/site-chrome";

/**
 * Site-wide pre-footer CTA is omitted on routes that already end with a page-specific conversion section.
 */
const PATHS_WITHOUT_GLOBAL_FINALE = new Set([
  "/",
  "/weddings",
  "/packages",
  "/reviews",
  "/about",
  "/contact",
  "/faq",
  "/vancouver-wedding-dj",
  "/squamish-wedding-dj",
  "/whistler-wedding-dj",
  "/venues",
  "/guides",
  "/stories",
]);

export function ConditionalSiteFinalDecisionZone() {
  const pathname = usePathname() ?? "";
  if (PATHS_WITHOUT_GLOBAL_FINALE.has(pathname)) return null;
  if (pathname.startsWith("/venues/")) return null;
  if (pathname.startsWith("/guides/")) return null;
  if (pathname.startsWith("/stories/")) return null;
  return <SiteFinalDecisionZone />;
}
