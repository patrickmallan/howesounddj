import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { organizationJsonLd } from "@/lib/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Squamish wedding DJ for Sea-to-Sky weddings. Personalized music, professional planning, and polished ceremony-to-reception support, across Whistler, Vancouver, and the corridor.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.howesounddj.com"),
  title: {
    default: "Howe Sound DJ | Squamish Wedding DJ",
    template: "%s | Howe Sound DJ",
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
    siteName: "Howe Sound DJ",
    title: "Howe Sound DJ | Squamish Wedding DJ",
    description: siteDescription,
    images: [
      {
        url: "/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Howe Sound Wedding DJ dance floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Howe Sound DJ | Squamish Wedding DJ",
    description: siteDescription,
    images: ["/og-share.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-neutral-950 text-white">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
