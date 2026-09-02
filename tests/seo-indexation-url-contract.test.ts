import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getAllVenueSlugs } from "@/config/venue-pages";
import { SITE_ORIGIN } from "@/config/site-brand";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

/** Canonical indexable static paths (homepage uses empty string). */
const INDEXABLE_STATIC_PATHS = [
  "",
  "/weddings",
  "/vancouver-wedding-dj",
  "/squamish-wedding-dj",
  "/about",
  "/packages",
  "/reviews",
  "/faq",
  "/contact",
  "/venues",
  "/guides",
  "/guides/how-to-keep-a-wedding-dance-floor-packed",
  "/guides/how-to-choose-a-wedding-dj-in-squamish",
  "/stories",
  "/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like",
  "/stories/what-a-sunwolf-riverside-wedding-reception-feels-like",
  "/stories/sea-to-sky-wedding-dance-floor-energy",
] as const;

/** Legacy Wix/sitelink sources : permanent redirects, not sitemap entries. */
const LEGACY_REDIRECT_SOURCES = [
  "/squamish-dj-services",
  "/a-little-about-me",
  "/wedding-dj-packages-in-squamish",
  "/whistler-wedding-dj-services",
  "/about-howe-sound-wedding-dj",
  "/dj-packages",
  "/whistler-dj-services",
  "/blog",
] as const;

describe("HSO SEO indexation URL contract", () => {
  it("uses a single canonical HTTPS www origin across metadata and brand config", () => {
    const layout = readSource("src/app/layout.tsx");
    const robots = readSource("src/app/robots.ts");
    const sitemap = readSource("src/app/sitemap.ts");

    expect(SITE_ORIGIN).toBe("https://www.howesounddj.com");
    expect(layout).toMatch(/metadataBase:\s*new URL\("https:\/\/www\.howesounddj\.com"\)/);
    expect(robots).toMatch(/sitemap:\s*"https:\/\/www\.howesounddj\.com\/sitemap\.xml"/);
    expect(sitemap).toMatch(/const base = "https:\/\/www\.howesounddj\.com"/);
  });

  it("lists every intended index URL in sitemap generation (static + venues)", () => {
    const sitemap = readSource("src/app/sitemap.ts");
    for (const path of INDEXABLE_STATIC_PATHS) {
      const needle = path === "" ? '""' : `"${path}"`;
      expect(sitemap, `missing sitemap path ${path || "/"}`).toContain(needle);
    }
    expect(sitemap).toContain("getAllVenueSlugs()");
    expect(getAllVenueSlugs().length).toBeGreaterThanOrEqual(10);
  });

  it("declares permanent legacy redirects to live index destinations only", () => {
    const nextConfig = readSource("next.config.ts");
    const indexDestinations = new Set([
      "/about",
      "/packages",
      "/squamish-wedding-dj",
      "/stories",
    ]);

    for (const source of LEGACY_REDIRECT_SOURCES) {
      expect(nextConfig, `missing redirect for ${source}`).toMatch(
        new RegExp(`source:\\s*"${source.replace(/\//g, "\\/")}"`),
      );
    }

    const destinationMatches = [
      ...nextConfig.matchAll(/destination:\s*"([^"]+)"/g),
    ].map((m) => m[1]);
    for (const dest of destinationMatches) {
      expect(indexDestinations.has(dest), `redirect destination ${dest}`).toBe(true);
    }
  });

  it("does not advertise legacy redirect URLs in primary navigation source", () => {
    const chrome = readSource("src/components/site-chrome.tsx");
    for (const legacy of LEGACY_REDIRECT_SOURCES) {
      expect(chrome).not.toContain(`href: "${legacy}"`);
      expect(chrome).not.toContain(`href="${legacy}"`);
    }
  });

  it("allows sitewide indexing in robots metadata", () => {
    const layout = readSource("src/app/layout.tsx");
    expect(layout).toMatch(/robots:\s*\{[\s\S]*index:\s*true[\s\S]*follow:\s*true/);
  });
});
