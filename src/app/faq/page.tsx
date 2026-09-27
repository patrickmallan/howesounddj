import type { Metadata } from "next";
import Image from "next/image";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { SectionReveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/json-ld";
import "./faq-mixer.css";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Wedding DJ FAQ for Howe Sound DJ: music and playlists, planning and consultation, ceremony and reception support, travel, venues, and optional enhancements.",
  openGraph: {
    images: ["/og-share.jpg"],
    title: "FAQ | Howe Sound DJ",
    description:
      "Straight answers on personalized music, timelines, MC support, Sea-to-Sky coverage, and what makes the experience different.",
    url: "/faq",
  },
  alternates: { canonical: "/faq" },
};

type FaqItem = {
  q: string;
  a: string;
};

type FaqGroup = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-mixer-questions">
      {items.map((item, index) => (
        <details key={item.q} className="faq-mixer-question">
          <summary>
            <span className="faq-mixer-question-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="faq-mixer-question-text">{item.q}</span>
            <span className="faq-mixer-question-toggle" aria-hidden="true" />
          </summary>
          <div className="faq-mixer-answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FaqPage() {
  const groups: FaqGroup[] = [
    {
      id: "music",
      eyebrow: "The music",
      title: "Your taste. Your crowd. No wedding playlist on autopilot.",
      intro:
        "The wedding is the occasion. The music should sound like you and your people.",
      items: [
        {
          q: "Can we request songs and create a do-not-play list?",
          a: "Absolutely. Send me the songs you love, the ones you cannot stand, and a long playlist if you have one. I will not play every track. It helps me hear where your taste lives, and I will read the room from there."
        },
        {
          q: "Is this going to feel like every other wedding playlist?",
          a: "No. We start with your music, not a stock wedding set. I plan the moments that matter, take requests seriously, and make the calls as the night unfolds."
        },
        {
          q: "What kind of music can you actually cover?",
          a: "Classics, disco, 2000s, Latin, global sounds, drum and bass, country, house, hip-hop and plenty more. We can roam or stay deep in the sound you love."
        },
        {
          q: "Can our reception feel like a nightclub instead of a typical wedding?",
          a: "Yes. We can keep the ceremony and speeches polished, then give the dance floor a proper club-night arc. Tell me what kind of room you want after dark."
        }
      ]
    },
    {
      id: "planning",
      eyebrow: "Before the day",
      title: "Before anyone walks in",
      intro:
        "The good parts feel effortless because we have already talked through the moving parts.",
      items: [
        {
          q: "How does planning work before the wedding?",
          a: "We talk music, must-plays, do-not-plays, timing and the people making announcements. Calls and a venue walkthrough are there when they help. I want the plan to be clear before the day starts."
        },
        {
          q: "Can you help with the flow of the evening?",
          a: "Yes. I keep an eye on the handoffs between ceremony, cocktails, dinner, speeches and dancing, then adjust when real life moves the timeline around."
        },
        {
          q: "What happens in the first consultation?",
          a: "Once your date is confirmed open, we talk about the wedding, your music and what working together would look like. No hard sell. After that, you decide."
        }
      ]
    },
    {
      id: "ceremony",
      eyebrow: "Vows to last song",
        title: "From the vows to the last song",
      intro:
        "The microphones, the meal and the dance floor all belong to the same day. I treat them that way.",
      items: [
        {
          q: "Do you provide ceremony audio and microphones?",
          a: "Yes. We will sort the processional tracks, speaker placement and microphones for the officiant, vows and announcements. The setup depends on the space and what your ceremony needs."
        },
        {
          q: "Do you cover cocktail hour and dinner, not only the dance floor?",
          a: "Yes. A full wedding can run from the ceremony through cocktails, dinner, speeches and the last dance. The music changes with the room instead of starting from scratch at the reception."
        },
        {
          q: "Do you MC as well?",
          a: "Yes. I can handle introductions and announcements when they are useful, without a radio voice or unnecessary chatter. MCing is part of the service, not an extra fee."
        }
      ]
    },
    {
      id: "travel",
      eyebrow: "The place",
        title: "Here in Squamish",
      intro:
        "I live here. I know the roads, the rooms and how quickly a mountain-day timeline can change.",
      items: [
        {
          q: "Where do you DJ weddings?",
          a: "I focus on weddings held in Squamish. You can plan from anywhere; what matters is where the celebration takes place. Travel is quoted separately when it applies."
        },
        {
          q: "Do you know our venue already?",
          a: "I know many Squamish spaces. If yours is new to me, I will learn the room and its practical details before the wedding. A walkthrough can help when the layout is tricky."
        },
        {
          q: "How is sound handled on the day?",
          a: "I place and check the speakers and microphones for your room. Vows need to be clear, dinner should allow conversation, and the dance floor can have its own energy later."
        }
      ]
    },
    {
      id: "enhancements",
      eyebrow: "Make it yours",
        title: "The little things that make it yours",
      intro:
        "Grand entrances, shorter first dances, a sudden conga line. Tell me the idea; we will see how to make it work.",
      items: [
        {
          q: "Can we use our own entrance song or shorten a dance?",
          a: "Of course. Your entrance does not have to use the wedding party's song. I can also make shorter cuts of your first dance or parent dances, with a proper ending instead of an abrupt fade."
        },
        {
          q: "Do MCing, song edits, another speaker or extra hours mean extra fees?",
          a: "No. Those are part of how I look after your celebration. We will agree on what the day needs, and I will not nickel-and-dime you for those pieces."
        },
        {
          q: "What about bigger production ideas?",
          a: "We can talk through extra lighting, a photo booth, silent disco or a custom audio moment. I will only suggest what fits the room and your plans, and make the scope clear in the quote."
        }
      ]
    }
  ];

  const faqStructuredData = groups.flatMap((g) => g.items);

  return (
    <main className="hsdj-interior hsdj-faq-page hsdj-faq-mixer min-h-screen bg-neutral-950 text-white">
      <JsonLd data={faqPageJsonLd(faqStructuredData)} />
      <section className="faq-mixer-hero relative overflow-hidden border-b border-white/10">
        <Image src="/images/hsdj-redesign/contact/mixer-wedding-floor-art-v1.webp" alt="DJ mixer and wedding crowd collage" fill sizes="100vw" priority />
        <div className="faq-mixer-hero-inner">
          <div className="faq-mixer-hero-copy">
            <div className="faq-mixer-hero-label">THE QUESTIONS BEFORE THE PARTY</div>
            <MeterMatrixHeading text="Questions couples actually ask." className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl" />
            <HeroSignalCopy className="faq-mixer-hero-lede" tone="yellow">
              Music, microphones, timing, the odd &quot;what if&quot;: here&apos;s what people ask me before we get together.
            </HeroSignalCopy>
            <nav className="faq-mixer-selector" aria-label="Jump to a question channel">
              {groups.map((group, index) => <a key={group.id} href={`#${group.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{group.eyebrow}</a>)}
            </nav>
          </div>
        </div>
      </section>

      <div className="hsdj-faq-channels space-y-0">
        {groups.map((group, groupIndex) => (
          <SectionReveal
            key={group.id}
            as="section"
            id={group.id}
            className={`faq-mixer-channel faq-mixer-channel-${groupIndex + 1}`}
          >
            <div className="faq-mixer-channel-inner">
              <div className="faq-mixer-channel-copy">
                <div className="faq-mixer-channel-topline"><span className="faq-mixer-channel-dial" aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</span><span>{group.eyebrow}</span></div>
                <h2>{group.title}</h2>
                <p className="faq-mixer-channel-intro">{group.intro}</p>
                {group.id === "planning" ? (
                  <div className="faq-mixer-channel-links">
                    <p>
                      More on keeping the floor moving:{" "}
                      <Link
                        href="/guides/how-to-keep-a-wedding-dance-floor-packed"
                      >
                        Dance floor guide
                      </Link>
                    </p>
                    <p>
                      Want to see it in action? <Link href="/stories">Wedding stories</Link>
                    </p>
                  </div>
                ) : null}
                {group.id === "travel" ? (
                  <div className="faq-mixer-channel-links"><p>Planning a local wedding? <Link href="/guides/how-to-choose-a-wedding-dj-in-squamish">Squamish DJ guide</Link></p></div>
                ) : null}
              </div>
              <div className="faq-mixer-channel-list">
                <FaqAccordion items={group.items} />
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal as="section" className="faq-mixer-finale">
        <div className="faq-mixer-finale-inner">
          <div className="faq-mixer-finale-copy">
            <div className="faq-mixer-finale-label">NO PERFECT PLAN REQUIRED</div>
            <h2>Got a date? Start there.</h2>
            <p>Check if I&apos;m open. Then we can talk music, the room, and what you want the night to feel like. You decide what happens next.</p>
            <p>Already chosen the place? <Link href="/venues">Take a look at the venue notes.</Link></p>
          </div>
          <div className="faq-mixer-finale-actions">
            <span>YOUR NEXT MOVE</span>
            <div>
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
