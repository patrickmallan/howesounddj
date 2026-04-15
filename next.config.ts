import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16: `next/image` requires an explicit pattern for local `src` URLs that include a query string
    // (e.g. cache-busting `?v=` on files under `public/images/`).
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
