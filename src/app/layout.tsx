import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { AvailabilityJourneyTracker } from "@/components/availability-journey-tracker";
import { JsonLd } from "@/components/json-ld";
import { ConditionalSiteFinalDecisionZone } from "@/components/conditional-site-final-decision-zone";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HomepageScrollFader } from "@/components/homepage-scroll-fader";
import { HeadingLetterFlashController } from "@/components/heading-letter-flash-controller";
import { SITE_PUBLIC_NAME, SITE_SHORT_NAME } from "@/config/site-brand";
import { organizationJsonLd } from "@/lib/json-ld";
import { isIsolatedPreview } from "@/lib/is-isolated-preview";
import "./globals.css";

const siteDescription =
  "Versatile Squamish wedding DJ for ceremony sound, dinner music, speeches, and dance floors that go well beyond the usual wedding playlist.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.howesounddj.com"),
  title: {
    default: "Howe Sound DJ | Squamish Wedding DJ",
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_PUBLIC_NAME,
    title: "Howe Sound DJ | Squamish Wedding DJ",
    description: siteDescription,
    images: [
      {
        url: "/og-cake-party-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Imagined wedding-cake party with a couple and DJ on top, dancing guests, and a laughing guest hanging from the bottom tier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Howe Sound DJ | Squamish Wedding DJ",
    description: siteDescription,
    images: ["/og-cake-party-v2.jpg"],
  },
  robots: {
    index: !isIsolatedPreview(),
    follow: !isIsolatedPreview(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className="h-full antialiased"
    >
      <head>
        <meta property="og:site_name" content={SITE_PUBLIC_NAME} />
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/hsdj-meter-matrix-v6.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-950 text-white">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <HomepageScrollFader />
        <HeadingLetterFlashController />
        <div id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
          {children}
        </div>
        <ConditionalSiteFinalDecisionZone />
        <SiteFooter />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <AvailabilityJourneyTracker />
      </body>
    </html>
  );
}
