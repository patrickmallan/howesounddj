"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./night-mix-fader.module.css";

const SPECTRUM_BANDS = 44;

const STAGES = [
  {
    title: "Ceremony",
    word: "HEARD",
    line: "Clear microphones, the right songs, and every cue handled. You stay in the moment while I take care of the sound.",
    moves: ["Guests hear every word", "Music starts on cue", "No tech distractions"],
    bpm: 72,
    spectrum: { energy: .22, low: .12, mid: .72, high: .18 },
    image: "/images/hsdj-redesign/wedding-story/night-stage-ceremony-v1.webp",
    alt: "An outdoor mountain wedding ceremony seen through the seated guests",
    imagePosition: "center 45%",
    accent: "#75f4ff",
    wash: "#0739b8",
  },
  {
    title: "Cocktails",
    word: "EASE IN",
    line: "Good records, easy volume. Enough lift for a drink, never enough to shout over.",
    moves: ["Good records, low volume", "People can still talk", "A little shoulder bounce"],
    bpm: 104,
    spectrum: { energy: .44, low: .4, mid: .52, high: .34 },
    image: "/images/hsdj-redesign/wedding-story/night-stage-cocktails-v1.webp",
    alt: "Wedding guests laughing together during cocktails on a mountain lodge patio",
    imagePosition: "center center",
    accent: "#ff9b45",
    wash: "#c44012",
  },
  {
    title: "Dinner",
    word: "DON'T RUSH IT",
    line: "Dinner still gets good music. The volume stays comfortable, requests are welcome, and the speech mic is ready.",
    moves: ["Play the good stuff", "Speech mic ready", "Keep the volume comfortable"],
    bpm: 92,
    spectrum: { energy: .34, low: .3, mid: .46, high: .2 },
    image: "/images/hsdj-redesign/wedding-story/night-stage-dinner-v1.webp",
    alt: "Wedding guests talking and sharing dinner at long candlelit tables",
    imagePosition: "center center",
    accent: "#ffe000",
    wash: "#7f4e00",
  },
  {
    title: "First dance",
    word: "THIS ONE MATTERS",
    line: "Your version starts clean and plays as long as you want it to. If you have had enough of the spotlight, give me the nod.",
    moves: ["Your exact version", "Starts clean, right on cue", "Full song or early fade"],
    bpm: 76,
    spectrum: { energy: .58, low: .52, mid: .68, high: .4 },
    image: "/images/hsdj-redesign/wedding-story/night-stage-first-dance-v1.webp",
    alt: "A newlywed couple sharing their first dance while family and friends watch",
    imagePosition: "center 44%",
    accent: "#ff72c8",
    wash: "#7e1458",
  },
  {
    title: "Open floor",
    word: "NOW WE GO",
    line: "I watch what lands, follow the room, and choose the next track to keep the energy moving.",
    moves: ["Watch what lands", "Follow the room", "Keep the energy moving"],
    bpm: 128,
    spectrum: { energy: .94, low: .96, mid: .78, high: .84 },
    image: "/images/hsdj-redesign/wedding-story/night-stage-open-floor-v1.webp",
    alt: "A packed wedding dance floor with guests laughing and dancing in different ways",
    imagePosition: "center 42%",
    accent: "#45ef68",
    wash: "#0b6f47",
  },
] as const;

export function NightMixFader() {
  const [active, setActive] = useState(2);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const stage = STAGES[active];
  const customProperties = {
    "--fader-stop": `${active * 25}%`,
    "--stage-accent": stage.accent,
    "--stage-wash": stage.wash,
    "--image-position": stage.imagePosition,
  } as CSSProperties;

  useEffect(() => {
    const spectrum = spectrumRef.current;
    if (!spectrum) return;

    const bars = Array.from(spectrum.querySelectorAll<HTMLElement>("i"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      bars.forEach((bar, index) => {
        const frequency = index / Math.max(1, bars.length - 1);
        const profile = stage.spectrum;
        const lowShape = Math.exp(-Math.pow((frequency - .12) / .2, 2)) * profile.low;
        const midShape = Math.exp(-Math.pow((frequency - .5) / .32, 2)) * profile.mid;
        const highShape = Math.exp(-Math.pow((frequency - .88) / .2, 2)) * profile.high;
        const quietLift = .16 + Math.sqrt(profile.energy) * .16;
        const level = quietLift + profile.energy * (.08 + lowShape * .38 + midShape * .31 + highShape * .22);
        const boundedLevel = Math.max(.06, Math.min(.94, level));
        bar.style.setProperty("--spectrum-level", String(boundedLevel));
        bar.style.setProperty("--peak-level", String(Math.min(.97, boundedLevel + .035)));
      });
      return;
    }

    const current = bars.map(() => .08);
    const peaks = bars.map(() => .1);
    const peakHoldUntil = bars.map(() => 0);
    const texture = bars.map(() => .25 + Math.random() * .4);
    let textureStep = -1;
    let previous = performance.now();
    let frame = 0;
    let running = false;
    const rendered = bars.map(() => ({ level: -1, peak: -1, opacity: -1 }));

    const animate = (now: number) => {
      if (now - previous < 1000 / 30) {
        if (running) frame = requestAnimationFrame(animate);
        return;
      }
      const dt = Math.min((now - previous) / 1000, .05);
      previous = now;

      const beats = (now / 1000) * (stage.bpm / 60);
      const beatPhase = beats % 1;
      const eighthPhase = (beats * 2) % 1;
      const sixteenthStep = Math.floor(beats * 4);
      const kick = Math.exp(-beatPhase * 11);
      const backbeatDistance = Math.abs(beatPhase - .5);
      const backbeat = Math.exp(-(backbeatDistance * backbeatDistance) / .008);
      const hat = Math.exp(-eighthPhase * 15);

      if (sixteenthStep !== textureStep) {
        textureStep = sixteenthStep;
        texture.forEach((_, index) => {
          const neighbour = index > 0 ? texture[index - 1] : .35;
          texture[index] = neighbour * .28 + (.12 + Math.random() * .76) * .72;
        });
      }

      bars.forEach((bar, index) => {
        const frequency = index / Math.max(1, bars.length - 1);
        const low = Math.exp(-Math.pow((frequency - .1) / .18, 2));
        const lowMid = Math.exp(-Math.pow((frequency - .34) / .24, 2));
        const presence = Math.exp(-Math.pow((frequency - .62) / .25, 2));
        const air = Math.exp(-Math.pow((frequency - .9) / .19, 2));
        const musicalRipple = .5 + .5 * Math.sin(beats * 2.1 + index * .58);
        const profile = stage.spectrum;
        const quietLift = .105 + Math.sqrt(profile.energy) * .085;
        const energyGain = .34 + profile.energy * .72;
        const target = Math.min(.98,
          quietLift + profile.energy * .025 + energyGain * (
            texture[index] * (.035 + low * profile.low * .2 + lowMid * profile.mid * .22 + presence * profile.mid * .14) +
            kick * low * profile.low * .7 +
            backbeat * (lowMid * profile.mid * .3 + presence * profile.mid * .22) +
            hat * air * profile.high * .48 +
            musicalRipple * presence * profile.mid * .14
          )
        );
        const timeConstant = target > current[index] ? .025 : .19 + frequency * .09;
        current[index] += (target - current[index]) * (1 - Math.exp(-dt / timeConstant));
        if (current[index] >= peaks[index]) {
          peaks[index] = current[index];
          peakHoldUntil[index] = now + 240;
        } else if (now > peakHoldUntil[index]) {
          peaks[index] = Math.max(current[index], peaks[index] - dt * .42);
        }
        const opacity = .58 + current[index] * .42;
        if (Math.abs(current[index] - rendered[index].level) >= .012) {
          bar.style.setProperty("--spectrum-level", current[index].toFixed(3));
          rendered[index].level = current[index];
        }
        if (Math.abs(peaks[index] - rendered[index].peak) >= .012) {
          bar.style.setProperty("--peak-level", peaks[index].toFixed(3));
          rendered[index].peak = peaks[index];
        }
        if (Math.abs(opacity - rendered[index].opacity) >= .012) {
          bar.style.opacity = opacity.toFixed(3);
          rendered[index].opacity = opacity;
        }
      });

      if (running) frame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      previous = performance.now();
      frame = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    }, { rootMargin: "180px" });
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (spectrum.getBoundingClientRect().bottom >= -180 && spectrum.getBoundingClientRect().top <= window.innerHeight + 180) start();
    };

    observer.observe(spectrum);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [active, stage.bpm, stage.spectrum]);

  return (
    <div className={styles.console} style={customProperties}>
      <div className={styles.scene} key={stage.title}>
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
          className={styles.sceneImage}
        />
        <div className={styles.sceneWash} />
        <div className={styles.signalField} ref={spectrumRef} aria-hidden="true">
          {Array.from({ length: SPECTRUM_BANDS }, (_, index) => <i key={index} />)}
          <div className={styles.frequencyScale}><span>60</span><span>250</span><span>1K</span><span>4K</span><span>12K</span></div>
        </div>
        <div className={styles.sceneCopy} aria-live="polite">
          <p className={styles.stageName}>{stage.title}</p>
          <strong className={styles.stageWord}>{stage.word}</strong>
          <p className={styles.stageLine}>{stage.line}</p>
          <div className={styles.moves}>{stage.moves.map((move, index) => <span key={move}><b>0{index + 1}</b>{move}</span>)}</div>
        </div>
      </div>

      <div className={styles.controlSurface}>
        <p className={styles.instruction}>Move through the night <span>The job changes with the room.</span></p>
        <div className={styles.fader}>
          <div className={styles.rail} aria-hidden="true" />
          <Image className={styles.cap} src="/images/hsdj-redesign/controls/faders/crossfader-cap.png" alt="" width={116} height={66} />
          <input
            aria-label="Explore how the music changes through the wedding night"
            max={4}
            min={0}
            onChange={(event) => setActive(Number(event.currentTarget.value))}
            step={1}
            type="range"
            value={active}
          />
        </div>
        <div className={styles.stages}>
          {STAGES.map((item, index) => (
            <button className={index === active ? styles.active : undefined} key={item.title} onClick={() => setActive(index)} type="button">
              <span>0{index + 1}</span><b>{item.title}</b>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
