import type { Metadata } from "next";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { CANONICAL_REVIEWS } from "@/config/reviews";
import { vancouverWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";
import "./vancouver-route.css";

const title = "Vancouver Wedding DJ Search? Marrying in Squamish | Howe Sound DJ";
const description = "Live in Vancouver and getting married in Squamish? Plan the music from home with Patrick, a Squamish-based wedding DJ who is already local to your celebration.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, url: "/vancouver-wedding-dj", type: "website", images: ["/og-share.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-share.jpg"] },
  alternates: { canonical: "/vancouver-wedding-dj" },
};

const localReview = CANONICAL_REVIEWS.find((review) => review.id === "natasha-beaudry");

export default function VancouverWeddingDjPage() {
  return (
    <main className="hsdj-vancouver-route min-h-screen text-white">
      <JsonLd data={vancouverWeddingDjBreadcrumbJsonLd()} />
      <div className="vancouver-route-river" aria-hidden="true">
        <span className="vancouver-route-river-panel vancouver-route-river-panel-1" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-2" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-3" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-4" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-5" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-6" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-7" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-8" />
        <span className="vancouver-route-river-panel vancouver-route-river-panel-9" />
      </div>

      <section className="vancouver-route-hero" aria-labelledby="vancouver-route-title">
        <div className="vancouver-route-hero-copy">
          <MeterMatrixHeading
            id="vancouver-route-title"
            text="Vancouver plans. Squamish party."
            lines={["Vancouver", "plans. Squamish", "party."]}
          />
          <HeroSignalCopy tone="pink">Live in Vancouver and getting married in Squamish? We can plan the music from your side of the bridge. I&apos;m Patrick, a Squamish-based wedding DJ. When the day arrives, I&apos;m already local.</HeroSignalCopy>
          <div className="vancouver-route-hero-actions">
            <Link href="/contact">Check your Squamish date <span aria-hidden="true">↗</span></Link>
            <a href="#planning-from-vancouver">See how we plan <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section id="planning-from-vancouver" className="vancouver-route-plan" aria-labelledby="vancouver-route-plan-title">
        <div className="vancouver-route-mix-art" aria-hidden="true">
          <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" focusable="false">
            <path className="vancouver-route-mix-art-shadow" d="M-90 60 C120 40 160 390 380 330 S670 5 850 180 S1110 650 1530 430" />
            <path className="vancouver-route-mix-art-pink" d="M-90 60 C120 40 160 390 380 330 S670 5 850 180 S1110 650 1530 430" />
            <path className="vancouver-route-mix-art-shadow" d="M-80 500 C170 610 230 80 490 160 S820 620 1010 450 S1320 140 1530 250" />
            <path className="vancouver-route-mix-art-cyan" d="M-80 500 C170 610 230 80 490 160 S820 620 1010 450 S1320 140 1530 250" />
          </svg>
        </div>
        <div className="vancouver-route-plan-copy">
          <h2 id="vancouver-route-plan-title">Make the music decisions from home.</h2>
          <p>Start with a conversation. Tell me what you love, what you absolutely do not want to hear, and which moments need a particular song. We can work through those choices and the timing while you&apos;re in Vancouver.</p>
        </div>
        <p className="vancouver-route-plan-aside">One less drive up the Sea-to-Sky just to talk songs.</p>
      </section>

      <section className="vancouver-route-local" aria-labelledby="vancouver-route-local-title">
        <div className="vancouver-route-local-light" aria-hidden="true" />
        <div className="vancouver-route-local-copy">
          <h2 id="vancouver-route-local-title">The wedding is here. So am I.</h2>
          <p>When we talk about the ceremony space, speeches, and where the dancing will happen, we&apos;re planning for your Squamish venue. I live in the town where you&apos;re getting married. That&apos;s the useful part of hiring local.</p>
          <p>Still choosing the room? <Link href="/venues">Explore Squamish wedding venues</Link> before we talk through its sound and layout.</p>
        </div>
      </section>

      {localReview && (
        <section className="vancouver-route-proof" aria-labelledby="vancouver-route-proof-title">
          <h2 id="vancouver-route-proof-title">A couple said it better.</h2>
          <blockquote>
            <p>“{localReview.quote}”</p>
            <footer>{localReview.attribution}</footer>
          </blockquote>
          <Link href="/reviews">Read more from couples <span aria-hidden="true">↗</span></Link>
        </section>
      )}

      <section className="vancouver-route-finish" aria-labelledby="vancouver-route-finish-title">
        <div className="vancouver-route-finish-copy">
          <h2 id="vancouver-route-finish-title">Getting married in Squamish?</h2>
          <p>Check your date. If I&apos;m available, you can book a consult and tell me where you&apos;re celebrating, who&apos;s coming, and what you want to hear.</p>
          <p className="vancouver-route-finish-qualifier">For Vancouver couples celebrating in Squamish.</p>
          <Link className="vancouver-route-finish-action" href="/contact">Check your Squamish date <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
