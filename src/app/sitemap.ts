import type { MetadataRoute } from "next";
import { getAllVenueSlugs } from "@/config/venue-pages";

const base = "https://www.howesounddj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "",
    "/weddings",
    "/vancouver-wedding-dj",
    "/about",
    "/packages",
    "/reviews",
    "/faq",
    "/contact",
    "/venues",
    ...getAllVenueSlugs().map((slug) => `/venues/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
  }));
}
