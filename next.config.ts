import type { NextConfig } from "next";

/**
 * CSP is not set anywhere else in this repo (no middleware, vercel.json, or layout meta).
 * Inline scripts used by the app: JSON-LD (`JsonLd`), GA bootstrap (`google-analytics.tsx`),
 * and Next.js runtime chunks — `script-src` includes `'unsafe-inline'` for those (no nonce pipeline yet).
 * Turnstile contact forms load `https://challenges.cloudflare.com/turnstile/v0/api.js` + iframe.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://challenges.cloudflare.com",
    "'unsafe-inline'",
  ].join(" "),
  [
    "connect-src",
    "'self'",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://challenges.cloudflare.com",
  ].join(" "),
  [
    "img-src",
    "'self'",
    "data:",
    "blob:",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ].join(" "),
  "frame-src 'self' https://challenges.cloudflare.com",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
    ];
  },

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
