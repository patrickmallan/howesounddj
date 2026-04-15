import type { MetadataRoute } from "next";

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
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
  }));
}
