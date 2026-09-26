import type { MetadataRoute } from "next";
import { isIsolatedPreview } from "@/lib/is-isolated-preview";

export default function robots(): MetadataRoute.Robots {
  if (isIsolatedPreview()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.howesounddj.com/sitemap.xml",
  };
}
