import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { JsonLd } from "@/components/json-ld";
import { storiesHubBreadcrumbJsonLd } from "@/lib/json-ld";
import { StoriesQuietLoop } from "./stories-quiet-loop";
import "./stories-contact-sheet.css";

const description = "Sea-to-Sky dance floor stories about the moments, pacing, and music that turn a wedding room into a party.";
const title = "Sea-to-Sky Dance Floor Stories | Packed Mountain Receptions";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/stories", type: "website", images: ["/og-share.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-share.jpg"] },
  alternates: { canonical: "/stories" },
};

const stories = [
  {
    slug: "what-a-sea-to-sky-gondola-dance-floor-feels-like",
    title: "Above the town, the room changes gear.",
    description: "A wedding up at the Sea to Sky Gondola already has the view. Here is what happens when the party earns its place beside it.",
    image: "/images/hsdj-redesign/wedding-story/night-stage-open-floor-v1.webp",
    alt: "Wedding crowd and dance floor under event lighting",
  },
  {
    slug: "what-a-sunwolf-riverside-wedding-reception-feels-like",
    title: "Sunwolf has the river. We bring the party.",
    description: "A relaxed wedding by the river is lovely. When it is time to dance, I still want the whole room in it.",
    image: "/images/stories/sunwolf-riverside-resort-dj.webp",
    alt: "Patrick DJing beside a riverside wedding reception",
  },
  {
    slug: "sea-to-sky-wedding-dance-floor-energy",
    title: "The last formal dance. The first packed floor.",
    description: "Patrick invites everyone into the final formal dance, so the party begins with the whole room already there.",
    image: "/images/stories/patrick-with-bride-real-dj-v2.webp",
    alt: "Patrick with a bride behind his DJ controller at a real wedding reception",
  },
] as const;

const diaryNotes = [
  {
    image: "/images/stories/diary-notes/cream-stained-v1.webp",
    shape: "tall",
    text: "We said one shot-ski. The photo album suggests we cannot count.",
  },
  {
    image: "/images/stories/diary-notes/blush-guestbook-v1.webp",
    shape: "tall",
    text: "Grandma knew every Macarena move. Grandpa invented six more and now refuses to teach them to us.",
  },
  {
    image: "/images/stories/diary-notes/cocktail-napkin-v1.webp",
    shape: "square",
    text: "Took off my silent-disco headphones. Same song for everyone. Forty people singing it in forty different keys. Incredible.",
  },
  {
    image: "/images/stories/diary-notes/pocket-diary-v1.webp",
    shape: "tall",
    text: "Patrick waved everyone in during our last formal dance. My uncle got there first and nearly took out the cake.",
  },
  {
    image: "/images/stories/diary-notes/coffee-coaster-v1.webp",
    shape: "square",
    text: "My cousin attempted the worm in a three-piece suit. The worm won.",
  },
  {
    image: "/images/stories/diary-notes/yellow-pad-v1.webp",
    shape: "tall",
    text: "Dad danced across the dinner table like he had been booked as entertainment. Mum did not even look up.",
  },
  {
    image: "/images/stories/diary-notes/envelope-v1.webp",
    shape: "envelope",
    text: "They lifted us up on chairs. I held on like it was a roller coaster with no seat belt.",
  },
  {
    image: "/images/stories/diary-notes/blush-guestbook-v1.webp",
    shape: "tall",
    text: "Best man mentioned the groom’s old drag act. Groom yelled, ‘I was better than you!’ The aunties demanded proof.",
  },
  {
    image: "/images/stories/diary-notes/cream-stained-v1.webp",
    shape: "tall",
    text: "Lost a shoe before midnight. Found it by the photo booth the next morning. No idea who has the other one.",
  },
  {
    image: "/images/stories/diary-notes/cocktail-napkin-v1.webp",
    shape: "square",
    text: "Rain wrecked the family photos. We came inside looking like wet dogs and somehow led the dancing.",
  },
  {
    image: "/images/stories/diary-notes/pocket-diary-v1.webp",
    shape: "tall",
    text: "We said ‘one more song’ four times. Even the shuttle driver started singing along.",
  },
  {
    image: "/images/stories/diary-notes/coffee-coaster-v1.webp",
    shape: "square",
    text: "Auntie asked for one ABBA song. Forty-five minutes later she was still in the middle, shoes in one hand.",
  },
  {
    image: "/images/stories/diary-notes/envelope-v1.webp",
    shape: "envelope",
    text: "The bouquet missed every hand and landed in dessert. Nobody volunteered to catch it a second time.",
  },
  {
    image: "/images/stories/diary-notes/yellow-pad-v1.webp",
    shape: "tall",
    text: "My brother split his trousers doing a squat. Finished the song with his jacket tied around his waist.",
  },
  {
    image: "/images/stories/diary-notes/cream-stained-v1.webp",
    shape: "tall",
    text: "Someone passed the guestbook around mid-dance. It came back with a drawing of the DJ and PLEASE PLAY ONE MORE.",
  },
  {
    image: "/images/stories/diary-notes/coffee-coaster-v1.webp",
    shape: "square",
    text: "The best man tried to crowd-surf. The crowd carried him four feet and set him down by the bar.",
  },
  {
    image: "/images/stories/diary-notes/blush-guestbook-v1.webp",
    shape: "tall",
    text: "Grandad asked for one slow song. Five minutes later he was leading a conga line. No one knows what happened in between.",
  },
  {
    image: "/images/stories/diary-notes/cocktail-napkin-v1.webp",
    shape: "square",
    text: "We found confetti in our suitcase in Mexico. Apparently the dance floor came on the honeymoon.",
  },
] as const;

export default function StoriesHubPage() {
  return (
    <main className="hsdj-interior hsdj-stories-page hsdj-contact-sheet min-h-screen text-white">
      <JsonLd data={storiesHubBreadcrumbJsonLd()} />
      <section className="contact-sheet-hero" aria-labelledby="contact-sheet-title">
        <Image src="/images/hsdj-redesign/new-editorial/stories-after-set-collage-v1.webp" alt="Editorial collage of mountain wedding dance-floor moments, DJ equipment and string lights" fill sizes="100vw" priority />
        <div className="contact-sheet-hero-copy">
          <MeterMatrixHeading id="contact-sheet-title" text="What the room felt like." lines={["What the", "room felt", "like."]} />
          <p>There is a point when guests stop watching the dance floor and become it. These are stories about the music, timing, and people that get a room there.</p>
        </div>
        <div className="contact-sheet-hero-mark" aria-hidden="true">THE NIGHT<br />WENT OFF<span>.</span></div>
      </section>

      <section className="contact-sheet-night-notes" aria-labelledby="contact-sheet-night-notes-title">
        <div className="contact-sheet-night-notes-intro">
          <h2 id="contact-sheet-night-notes-title">If the dance floor kept a diary...</h2>
          <p>Imagine the diary entries three weeks later. Nobody is writing about the chair covers; the group chat is still losing it over moments like these.</p>
        </div>
        <div className="contact-sheet-night-notes-scatter">
          {diaryNotes.map((note) => (
            <article className={`contact-sheet-night-note contact-sheet-night-note--${note.shape}`} key={`${note.image}-${note.text}`}>
              <Image src={note.image} alt="" fill sizes="(max-width: 600px) 90vw, 24rem" />
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-sheet-sequence" aria-labelledby="contact-sheet-sequence-title">
        <div className="contact-sheet-sequence-heading">
          <h2 id="contact-sheet-sequence-title">Three rooms. Three different energies.</h2>
        </div>
        <div className="contact-sheet-strip">
          {stories.map((story) => (
            <article key={story.slug} className="contact-sheet-frame">
              <div className="contact-sheet-photo">
                <Image src={story.image} alt={story.alt} fill sizes="(max-width: 800px) 100vw, 65vw" />
              </div>
              <div className="contact-sheet-caption">
                <h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3>
                <p className="contact-sheet-summary">{story.description}</p>
                <Link href={`/stories/${story.slug}`}>Enter this story <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-sheet-real-reels" aria-labelledby="contact-sheet-real-reels-title">
        <div className="contact-sheet-real-reels-heading">
          <h2 id="contact-sheet-real-reels-title">From the booth, for real.</h2>
          <p>A quick look at Patrick working the room. No staged gear shot.</p>
        </div>
        <StoriesQuietLoop />
      </section>

      <nav className="contact-sheet-exit" aria-label="More ways to explore">
        <p>The people say it better.</p>
        <Link href="/reviews">Hear from couples <span aria-hidden="true">↗</span></Link>
        <Link href="/guides">Get into the planning <span aria-hidden="true">↗</span></Link>
      </nav>
    </main>
  );
}
