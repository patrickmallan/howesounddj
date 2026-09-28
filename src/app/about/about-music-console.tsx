"use client";

import Image from "next/image";
import { useState } from "react";

const channels = [
  {
    id: "requests",
    name: "Your songs",
    cue: "You give me the songs. I make them move.",
    detail: "Ceremony, entrance and first-dance choices are yours. Send me a long dance-party playlist too. I'll use it as a map, not a rigid running order.",
    screen: "INPUT / YOUR FAVOURITES",
    color: "cyan",
    pad: "/images/hsdj-redesign/controls/pads/cyan.png",
  },
  {
    id: "curveball",
    name: "The curveball",
    cue: "Then one left-field song turns every head.",
    detail: "I love the moment a rock track nobody expected makes the room look up. If your crowd reacts, I follow it. If it doesn't, I move on.",
    screen: "INPUT / SURPRISE",
    color: "pink",
    pad: "/images/hsdj-redesign/controls/pads/red.png",
  },
  {
    id: "range",
    name: "The range",
    cue: "Classics? Disco? 2000's? Latin? Global? Drum n Bass? Country?",
    detail: "Club nights, private parties and weddings have pushed me far beyond a standard wedding rotation. I prepare broadly so I can stay with the music your people actually love.",
    screen: "INPUT / OPEN FORMAT",
    color: "yellow",
    pad: "/images/hsdj-redesign/controls/pads/yellow.png",
  },
  {
    id: "handoff",
    name: "The handoff",
    cue: "No awkward wait for a brave first dancer.",
    detail: "I bring everyone in during the last formal dance. When the first party track lands, the floor is already full.",
    screen: "OUTPUT / FULL FLOOR",
    color: "purple",
    pad: "/images/hsdj-redesign/controls/pads/purple.png",
  },
] as const;

export function AboutMusicConsole() {
  const [activeId, setActiveId] = useState<(typeof channels)[number]["id"]>("requests");
  const active = channels.find((channel) => channel.id === activeId) ?? channels[0];

  return (
    <section className="about-console-section" aria-labelledby="about-console-title">
      <div className="about-console-heading">
        <p className="about-eyebrow">Four channels into my music brain</p>
        <h2 id="about-console-title">Go on. Push a button.</h2>
        <p>No audio will suddenly blast out of your phone. This is how I think about a room.</p>
      </div>
      <div className={`about-console about-console--${active.color}`}>
        <div className="about-console-controls" aria-label="Explore Patrick's approach to music">
          {channels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              aria-pressed={activeId === channel.id}
              onClick={() => setActiveId(channel.id)}
            >
              <Image className="about-console-pad" src={channel.pad} alt="" width={101} height={101} sizes="110px" />
              <span className="about-console-channel-name">{channel.name}</span>
            </button>
          ))}
        </div>
        <div className="about-console-display" id="about-console-display" aria-live="polite">
          <div className="about-console-display-top"><span>HSDJ / PATRICK&apos;S HEAD</span><span>● LIVE INPUT</span></div>
          <p className="about-console-input">{active.screen}</p>
          <h3>{active.cue}</h3>
          <p className="about-console-detail">{active.detail}</p>
          <div className="about-console-meter" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 37) % 76)}%` }} />)}</div>
          <p className="about-console-output">PERSONAL TASTE → ROOM REACTION → NEXT TRACK</p>
        </div>
      </div>
    </section>
  );
}
