import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16: `next/image` requires an explicit pattern for local `src` URLs that include a query string
    // (e.g. cache-busting `?v=` on files under `public/images/`).
    localPatterns: [{ pathname: "/images/**" }],
  },

  /** Legacy URLs (e.g. old Google sitelinks) → closest live route. Permanent (308), no chains. */
  async redirects() {
    return [
      {
        source: "/squamish-dj-services",
        destination: "/weddings",
        permanent: true,
      },
      {
        source: "/squamish-dj-services/",
        destination: "/weddings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
