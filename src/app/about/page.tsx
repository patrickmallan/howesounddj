import type { Metadata } from "next";
import Image from "next/image";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { JsonLd } from "@/components/json-ld";
import { aboutPageJsonLd } from "@/lib/json-ld";
import { AboutHardwareLink } from "./about-hardware-link";
import { AboutHeroGroove } from "./about-hero-groove";
import { AboutMusicConsole } from "./about-music-console";
import "./about-backstage.css";

export const metadata: Metadata = {
  title: { absolute: "Meet Patrick | Squamish Wedding DJ | Howe Sound DJ" },
  description: "Meet Patrick Mallan: Squamish-based wedding DJ, audio-school graduate and the person who plans, mixes and shows up for your Sea-to-Sky wedding.",
  openGraph: {
    images: ["/og-cake-party-v2.jpg"],
    title: "Meet Patrick | Howe Sound Wedding DJ",
    description: "The person, music brain and real wedding nights behind Howe Sound DJ.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

const coupleNotes = [
  {
    quote: "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
    name: "Stephen Henry",
    className: "about-quote--yellow",
  },
  {
    quote: "Seamless, stress-free, and seriously fun. Patrick's the go-to for a reason.",
    name: "Lauren Steeles",
    className: "about-quote--pink",
  },
  {
    quote: "Patrick kept the party going all night long. If you're thinking about booking him run, don't walk! You will not regret it.",
    name: "Molly Finn",
    className: "about-quote--blue",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="hsdj-interior hsdj-about-page hsdj-backstage min-h-screen text-white">
      <JsonLd data={aboutPageJsonLd()} />
      <section className="about-hero" aria-labelledby="about-title">
        <Image className="about-hero-atmosphere" src="/images/about/patrick-live-light-trails-retouched-v1.webp" alt="" fill sizes="100vw" priority />
        <div className="about-hero-copy">
          <p className="about-eyebrow">Howe Sound Wedding DJ / Squamish, BC</p>
          <h1 id="about-title">Hi. I&apos;m <span>Patrick.</span></h1>
          <HeroSignalCopy className="about-hero-intro" tone="pink">I&apos;m the person you&apos;ll plan the music with and the one behind the decks on your wedding day. I love a reason to celebrate. What better reason than your wedding? You&apos;ll notice my attention to the finer details before I play a single song.</HeroSignalCopy>
          <div className="about-hero-actions">
            <AboutHardwareLink href="#about-story" label="Meet the human" eyebrow="Play the story" control="play" />
            <AboutHardwareLink href="/contact#availability" label="Check your date" eyebrow="Cue your wedding" control="cue" />
          </div>
        </div>
        <div className="about-hero-portrait">
          <AboutHeroGroove />
          <span className="about-portrait-tag">The Shoulder Shuffle</span>
        </div>
      </section>

      <section id="about-story" className="about-story" aria-labelledby="about-story-title">
        <Image className="about-collage-layer" src="/images/about/about-afterparty-analog-art-v1.webp" alt="" fill sizes="100vw" quality={72} />
        <div className="about-story-lead">
          <h2 id="about-story-title">A curator of the best music for your celebration is my passion.</h2>
          <p>I studied audio at the Ontario Institute of Audio Recording Technology. More than 15 years working in music and live events taught me something school couldn&apos;t: the room gets a vote.</p>
        </div>
        <ul className="about-story-track" aria-label="Patrick's background">
          <li className="about-story-stop"><span>Audio training means I notice what happens between the speakers and the back row, not just what leaves my mixer.</span></li>
          <li className="about-story-stop"><span>Private events, clubs and weddings put very different crowds in front of me. That range makes me a very versatile DJ capable of playing a wide range of genres to keep people engaged and dancing.</span></li>
          <li className="about-story-stop"><span>Squamish is home. Sea-to-Sky venues, changing weather and local timing are part of my plan before the first guest arrives.</span></li>
        </ul>
        <figure className="about-story-photo">
          <div className="about-story-photo-frame"><Image src="/images/about/patrick-dj-action.webp" alt="Patrick DJing with headphones on and one hand in the air" fill sizes="(max-width: 760px) 90vw, 38vw" /></div>
          <figcaption>Not a stock-photo DJ.</figcaption>
        </figure>
      </section>

      <AboutMusicConsole />

      <section className="about-proof" aria-labelledby="about-proof-title">
        <Image className="about-collage-layer" src="/images/about/about-afterparty-analog-art-v1.webp" alt="" fill sizes="100vw" quality={72} />
        <div className="about-proof-heading">
          <p className="about-eyebrow">I can talk about myself. They did it better.</p>
          <h2 id="about-proof-title">What it&apos;s like having me there.</h2>
        </div>
        <div className="about-quote-cloud">
          {coupleNotes.map((note) => (
            <blockquote className={`about-quote ${note.className}`} key={note.name}>
              <p>“{note.quote}”</p>
              <footer>{note.name}</footer>
            </blockquote>
          ))}
        </div>
        <AboutHardwareLink href="/reviews" label="Hear more from couples" eyebrow="Load the reviews" control="pad" />
      </section>

      <section className="about-close" aria-labelledby="about-close-title">
        <Image className="about-collage-layer" src="/images/about/about-afterparty-analog-art-v1.webp" alt="" fill sizes="100vw" quality={72} />
        <div className="about-close-photo"><Image src="/images/stories/patrick-with-bride-real-dj-v2.webp" alt="Patrick smiling with a bride behind the DJ booth at her wedding" fill sizes="(max-width: 760px) 88vw, (max-width: 1300px) 42vw, 670px" /></div>
        <div className="about-close-copy">
          <h2 id="about-close-title"><span>Let&apos;s see if</span><span>we click.</span></h2>
          <p>Tell me your date and where the party is. If I&apos;m free, we can talk about the songs you love, the ones you absolutely do not, and what kind of night your people are up for.</p>
          <AboutHardwareLink href="/contact#availability" label="Check your date" eyebrow="Cue your wedding" control="cue" />
        </div>
      </section>
    </main>
  );
}
