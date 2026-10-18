import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSignalCopy } from "@/components/hero-signal-copy";
import { JsonLd } from "@/components/json-ld";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import { storiesHubBreadcrumbJsonLd } from "@/lib/json-ld";
import { StoriesQuietLoop } from "./stories-quiet-loop";
import "./stories-contact-sheet.css";
import "./stories-paper-heap.css";

const description = "Sea-to-Sky dance floor stories about the moments, pacing, and music that turn a wedding room into a party.";
const title = "Sea-to-Sky Dance Floor Stories | Packed Mountain Receptions";
const heroTitle = "What the room felt like.";

type StoriesHardwareLinkProps = {
  href: string;
  label: string;
  mode?: "play" | "hot-cue";
};

function StoriesHardwareLink({ href, label, mode = "play" }: StoriesHardwareLinkProps) {
  const control = mode === "play"
    ? "/images/hsdj-redesign/controls/buttons/play-pause-round.png"
    : "/images/hsdj-redesign/controls/buttons/hot-cue-mode.png";
  const dimensions = mode === "play" ? { width: 130, height: 130 } : { width: 94, height: 26 };

  return (
    <Link
      className={`contact-sheet-hardware-link contact-sheet-hardware-link--${mode}`}
      href={href}
      prefetch={false}
      data-physical-control={mode}
    >
      <span className="contact-sheet-hardware-face" aria-hidden="true">
        <Image src={control} alt="" {...dimensions} sizes={mode === "play" ? "68px" : "94px"} />
      </span>
      <strong>{label}</strong>
      <span className="contact-sheet-hardware-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/stories", type: "website", images: ["/og-cake-party-v2.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-cake-party-v2.jpg"] },
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

const backgroundStories = [
  "The flower girl borrowed the microphone, announced she was seven, and introduced the couple like they were headlining a festival.",
  "The groom's dad knew every word of the rap verse. His children are still asking where he learned it.",
  "Someone changed into ski boots for the last hour. Nobody remembers seeing skis anywhere near the wedding.",
  "The ring bearer slept under a table until his favourite song came on. He danced one chorus and went back to bed.",
  "The officiant arrived at the dance floor in running shoes. Apparently she had been waiting all evening for this part.",
  "The bride's cousin made a grand entrance carrying two slices of cake and lost neither. We applauded the engineering.",
  "A guest tried to teach the whole room a line dance. By the second verse, the teacher was following everyone else.",
  "The first person to request the Spice Girls was the grandfather. He also knew the choreography better than we did.",
  "Someone caught the bouquet while holding a drink. The drink survived; their expression in the photo did not.",
  "The couple promised they would leave early. At closing, they were the ones asking if there was time for one more.",
  "A tiny nephew took over the circle, spun once, and bowed. The adults gave him an encore he did not request.",
  "The best man's speech mentioned a childhood band. By midnight the entire band had reunited on the dance floor.",
  "We found the groom's tie on a speaker the next morning. Nobody could explain how it had got up there.",
  "The cake-cutting song became a singalong. We were still holding the knife when the chorus came round again.",
  "The quietest table at dinner turned into the loudest corner of the floor. Their waiter came over to watch.",
  "Auntie packed sensible flats. She took them off after one song and danced the rest of the night barefoot.",
  "The bride's brother tried a cartwheel in his suit. It was not elegant, but the landing got a standing ovation.",
  "Someone taught the DJ a move during the break. It was retired immediately, which only made everyone try it.",
  "The newlyweds vanished for ten minutes. We found them at the back of the room teaching Grandma a two-step.",
  "The photographer put down the camera for the final song. The couple's parents pulled her into the circle.",
  "A guest requested a song for his wife, then realised she was already dancing to it with three other people.",
  "The groom's mum started a train through the tables. By the time it reached the door, the groom was the caboose.",
  "The wedding party practised a polished entrance. Their first attempt went in three directions and was much better.",
  "Someone yelled that they could do a lift. The room wisely voted for a spin instead, and it was perfect.",
  "A little girl gave every dancer a score out of ten. She gave the bride eleven and refused to explain the maths.",
  "The sunset photos ran late. The couple came back to find their grandparents holding down the dance floor.",
  "A cousin arrived with a disposable camera. Every photo on it is of people laughing too hard to pose.",
  "The first slow song ended, but nobody let go. We had to start the next track around a room full of hugs.",
  "Someone's jacket went missing. It was eventually found on the back of a chair with four handwritten song requests inside.",
  "The groom's sister knew the chorus in another language. By the end, half the room was singing her version.",
] as const;

const backgroundPlacement = [
  [-9, -1, -8], [16, 2, 7], [41, -3, -4], [69, 1, 8], [87, -2, -11],
  [2, 13, 9], [28, 19, -7], [53, 13, 6], [79, 17, -5], [-12, 29, 6],
  [15, 28, -10], [43, 33, 8], [71, 29, -8], [89, 37, 5], [1, 44, -5],
  [26, 48, 11], [54, 44, -6], [77, 50, 9], [-10, 59, -10], [16, 63, 5],
  [44, 59, -8], [69, 65, 8], [87, 61, -4], [0, 78, 7], [26, 75, -9],
  [51, 81, 6], [78, 76, -8], [-8, 91, 4], [30, 91, -7], [67, 91, 9],
] as const;

const backgroundNotes = backgroundStories.map((text, index) => {
  const [x, y, turn] = backgroundPlacement[index];
  return {
    text,
    length: text.length < 100 ? "brief" : text.length < 130 ? "medium" : "long",
    style: {
      "--pile-x": `${x}%`,
      "--pile-y": `${y}%`,
      "--pile-tablet-x": `${-14 + (index % 3) * 40 + (index * 11 % 15)}%`,
      "--pile-tablet-y": `${Math.floor(index / 3) * 10.3 - 2 + (index * 7 % 5)}%`,
      "--pile-mobile-x": `${-22 + (index % 2) * 69 + (index * 7 % 10)}%`,
      "--pile-mobile-y": `${Math.floor(index / 2) * 6.6 - 1 + (index * 13 % 3)}%`,
      "--pile-turn": `${turn}deg`,
    } as CSSProperties,
  };
});

export default function StoriesHubPage() {
  return (
    <main className="hsdj-interior hsdj-stories-page hsdj-contact-sheet min-h-screen text-white">
      <JsonLd data={storiesHubBreadcrumbJsonLd()} />
      <section className="contact-sheet-hero" aria-labelledby="contact-sheet-title">
        <Image src="/images/hsdj-redesign/new-editorial/stories-after-set-collage-v1.webp" alt="Editorial collage of mountain wedding dance-floor moments, DJ equipment and string lights" fill sizes="100vw" priority />
        <div className="contact-sheet-hero-copy">
          <MeterMatrixHeading id="contact-sheet-title" className="contact-sheet-title" text={heroTitle} lines={["What the", "room felt", "like."]} />
          <HeroSignalCopy tone="pink">There is a point when guests stop watching the dance floor and become it. These are stories about the music, timing, and people that get a room there.</HeroSignalCopy>
        </div>
          <div className="contact-sheet-hero-mark" aria-hidden="true">THE NIGHT<br />WENT OFF</div>
      </section>

      <section className="contact-sheet-night-notes" aria-labelledby="contact-sheet-night-notes-title">
        <div className="contact-sheet-note-field" aria-hidden="true">
          {backgroundNotes.map((note) => <span className="contact-sheet-background-note" data-length={note.length} key={note.text} style={note.style}><span>{note.text}</span></span>)}
        </div>
        <div className="contact-sheet-night-notes-intro">
          <h2 id="contact-sheet-night-notes-title">If the dance floor kept a diary...</h2>
          <p>Imagined diary entries from the nights nobody stops talking about. The chair covers never make the group chat. These moments do.</p>
        </div>
        <div className="contact-sheet-night-notes-scatter">
          {diaryNotes.map((note) => (
            <article
              className={`contact-sheet-night-note contact-sheet-night-note--${note.shape}`}
              data-length={note.text.length < 80 ? "brief" : note.text.length < 120 ? "medium" : "long"}
              key={`${note.image}-${note.text}`}
            >
              <Image src={note.image} alt="" fill sizes="(max-width: 600px) 85vw, (max-width: 900px) 48vw, 27vw" />
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
                <Image src={story.image} alt={story.alt} fill loading="eager" fetchPriority="low" sizes="(max-width: 800px) 100vw, 65vw" />
              </div>
              <div className="contact-sheet-caption">
                <h3>{story.title}</h3>
                <p className="contact-sheet-summary">{story.description}</p>
                <StoriesHardwareLink href={`/stories/${story.slug}`} label="Enter this story" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-sheet-real-reels" aria-labelledby="contact-sheet-real-reels-title">
        <div className="contact-sheet-real-reels-heading">
          <h2 id="contact-sheet-real-reels-title">This is the fun part.</h2>
          <p>The speeches are done, the formalities are over, and I get to find out what your friends and family actually dance to. Sometimes the best song of the night wasn&apos;t on anybody&apos;s list.</p>
        </div>
        <StoriesQuietLoop />
      </section>

      <nav className="contact-sheet-exit" aria-label="More ways to explore">
        <p>The people say it better.</p>
        <StoriesHardwareLink href="/reviews" label="Hear from couples" mode="hot-cue" />
        <StoriesHardwareLink href="/guides" label="Get into the planning" mode="hot-cue" />
      </nav>
    </main>
  );
}
