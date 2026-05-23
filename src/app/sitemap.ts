import type { MetadataRoute } from "next";
import { getAllVenueSlugs } from "@/config/venue-pages";

const base = "https://www.howesounddj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "",
    "/weddings",
    "/vancouver-wedding-dj",
    "/squamish-wedding-dj",
    "/whistler-wedding-dj",
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
    ...getAllVenueSlugs().map((slug) => `/venues/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
  }));
}
