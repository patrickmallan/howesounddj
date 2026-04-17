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
      {
        source: "/a-little-about-me",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/a-little-about-me/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/wedding-dj-packages-in-squamish",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/wedding-dj-packages-in-squamish/",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/whistler-wedding-dj-services",
        destination: "/weddings",
        permanent: true,
      },
      {
        source: "/whistler-wedding-dj-services/",
        destination: "/weddings",
        permanent: true,
      },
      {
        source: "/about-howe-sound-wedding-dj",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-howe-sound-wedding-dj/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/dj-packages",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/dj-packages/",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/whistler-dj-services",
        destination: "/weddings",
        permanent: true,
      },
      {
        source: "/whistler-dj-services/",
        destination: "/weddings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
