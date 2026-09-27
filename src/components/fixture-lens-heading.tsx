"use client";

import { useMemo, type CSSProperties } from "react";
import styles from "./fixture-lens-heading.module.css";

type Point = readonly [number, number];
type Glyph = { paths: readonly (readonly Point[])[]; width: number };

const line = (...points: Point[]) => points;
const ellipse = (cx: number, cy: number, rx: number, ry: number, start = 0, end = Math.PI * 2) => {
  const steps = Math.max(12, Math.ceil(Math.abs(end - start) * Math.max(rx, ry) * 1.15));
  return Array.from({ length: steps + 1 }, (_, index): Point => {
    const angle = start + (end - start) * (index / steps);
    return [cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry];
  });
};

// These are lighting paths, not font outlines. Every path becomes two parallel
// rows of discrete fixtures so the strokes keep the mass of the reference rig.
const GLYPHS: Record<string, Glyph> = {
  A: { width: 5.2, paths: [line([.2, 7], [2.6, 0], [5, 7]), line([1.05, 4.45], [4.15, 4.45])] },
  B: { width: 5, paths: [line([.3, 0], [.3, 7]), line([.3, .1], [3.35, .1], [4.6, .8], [4.6, 2.55], [3.45, 3.45], [.3, 3.45]), line([.3, 3.45], [3.55, 3.45], [4.75, 4.35], [4.75, 6.05], [3.55, 6.9], [.3, 6.9])] },
  C: { width: 5.2, paths: [ellipse(2.7, 3.5, 2.35, 3.25, Math.PI * .22, Math.PI * 1.78)] },
  D: { width: 5.1, paths: [line([.3, 0], [.3, 7]), line([.3, .1], [3.1, .1], [4.65, 1.35], [4.65, 5.65], [3.1, 6.9], [.3, 6.9])] },
  E: { width: 4.8, paths: [line([.35, 0], [.35, 7]), line([.35, .15], [4.6, .15]), line([.35, 3.45], [3.75, 3.45]), line([.35, 6.85], [4.7, 6.85])] },
  F: { width: 4.7, paths: [line([.35, 0], [.35, 7]), line([.35, .15], [4.6, .15]), line([.35, 3.45], [3.75, 3.45])] },
  G: { width: 5.4, paths: [ellipse(2.75, 3.5, 2.4, 3.25, Math.PI * .18, Math.PI * 1.82), line([2.8, 3.75], [5.1, 3.75], [5.1, 6.25])] },
  H: { width: 5.2, paths: [line([.35, 0], [.35, 7]), line([4.85, 0], [4.85, 7]), line([.35, 3.5], [4.85, 3.5])] },
  I: { width: 2.4, paths: [line([1.2, 0], [1.2, 7]), line([.1, .1], [2.3, .1]), line([.1, 6.9], [2.3, 6.9])] },
  J: { width: 4.5, paths: [line([.75, .1], [4.2, .1]), line([3.65, .1], [3.65, 5.3], [2.8, 6.65], [1.35, 6.8], [.2, 5.8])] },
  K: { width: 5, paths: [line([.35, 0], [.35, 7]), line([4.75, .1], [.4, 4.05]), line([2.25, 2.45], [4.9, 6.9])] },
  L: { width: 4.5, paths: [line([.35, 0], [.35, 6.85], [4.35, 6.85])] },
  M: { width: 6, paths: [line([.3, 7], [.3, .1], [3, 3.75], [5.7, .1], [5.7, 7])] },
  N: { width: 5.4, paths: [line([.3, 7], [.3, .1], [5.1, 6.9], [5.1, 0])] },
  O: { width: 5.4, paths: [ellipse(2.7, 3.5, 2.35, 3.25)] },
  P: { width: 5, paths: [line([.3, 7], [.3, .1]), line([.3, .1], [3.35, .1], [4.65, 1], [4.65, 2.55], [3.35, 3.5], [.3, 3.5])] },
  Q: { width: 5.5, paths: [ellipse(2.7, 3.4, 2.35, 3.15), line([3.25, 5.3], [5.25, 7])] },
  R: { width: 5.1, paths: [line([.3, 7], [.3, .1]), line([.3, .1], [3.35, .1], [4.65, 1], [4.65, 2.55], [3.35, 3.5], [.3, 3.5]), line([2.55, 3.5], [4.95, 6.9])] },
  S: { width: 5, paths: [line([4.55, .65], [3.65, .15], [1.45, .25], [.3, 1.45], [.85, 2.75], [4.05, 4.05], [4.7, 5.45], [3.6, 6.75], [1.2, 6.75], [.25, 6.2])] },
  T: { width: 5, paths: [line([.1, .15], [4.9, .15]), line([2.5, .15], [2.5, 7])] },
  U: { width: 5.4, paths: [line([.3, 0], [.3, 5.25], [1.25, 6.65], [2.7, 6.9], [4.15, 6.65], [5.1, 5.25], [5.1, 0])] },
  V: { width: 5.2, paths: [line([.15, .1], [2.6, 6.9], [5.05, .1])] },
  W: { width: 6.4, paths: [line([.1, .1], [1.15, 6.9], [3.2, 4.4], [5.25, 6.9], [6.3, .1])] },
  X: { width: 5.1, paths: [line([.2, .1], [4.9, 6.9]), line([4.9, .1], [.2, 6.9])] },
  Y: { width: 5.2, paths: [line([.15, .1], [2.6, 3.55], [5.05, .1]), line([2.6, 3.55], [2.6, 7])] },
  Z: { width: 5, paths: [line([.2, .15], [4.8, .15], [.2, 6.85], [4.8, 6.85])] },
  ".": { width: 1.2, paths: [line([.6, 6.7], [.6, 6.8])] },
  ",": { width: 1.4, paths: [line([.7, 6.55], [.55, 7.45])] },
  "-": { width: 3, paths: [line([.25, 3.5], [2.75, 3.5])] },
  "'": { width: 1.4, paths: [line([.75, 0], [.5, 1.6])] },
  "’": { width: 1.4, paths: [line([.75, 0], [.5, 1.6])] },
  "?": { width: 5, paths: [line([.25, .9], [1.3, .15], [3.55, .15], [4.7, 1.2], [4.3, 2.65], [2.5, 3.65], [2.5, 4.45]), line([2.5, 6.75], [2.5, 6.85])] },
};

const LETTER_GAP = 1.05;
const WORD_GAP = 2.65;
const LINE_GAP = 1.85;
const LINE_HEIGHT = 7;
const FIXTURE_STEP = .82;
const ROW_OFFSET = .34;

// Trigonometric glyph paths can differ by a few final decimal places between
// the server and browser JavaScript engines. SVG serializes those differences,
// so React sees different attributes during hydration. Six decimal places is
// far beyond visible precision at every rendered headline size and gives both
// environments identical geometry.
function stableCoordinate(value: number) {
  return Number(value.toFixed(6));
}

type Palette = "cool" | "amber" | "cyan";
type Led = { id: string; x: number; y: number };
type Letter = { character: string; id: string; leds: Led[] };
type Word = { id: string; letters: Letter[] };
type Line = { id: string; palette: Palette; width: number; words: Word[] };
type Geometry = { height: number; lines: Line[]; width: number };
type Props = { className?: string; id?: string; lines: readonly string[]; text: string };

function glyphFor(character: string) {
  return GLYPHS[character.toUpperCase()] ?? GLYPHS["?"];
}

function glyphWidth(character: string) {
  return glyphFor(character).width;
}

function fixturesAlongPath(path: readonly Point[]) {
  const fixtures: Point[] = [];
  const seen = new Set<string>();
  path.slice(0, -1).forEach((start, segmentIndex) => {
    const end = path[segmentIndex + 1];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const distance = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(distance / FIXTURE_STEP));
    const nx = -dy / distance;
    const ny = dx / distance;
    for (let index = 0; index <= steps; index += 1) {
      const t = index / steps;
      for (const offset of [-ROW_OFFSET, ROW_OFFSET]) {
        const x = start[0] + dx * t + nx * offset;
        const y = start[1] + dy * t + ny * offset;
        const key = `${Math.round(x * 20)}:${Math.round(y * 20)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        fixtures.push([x, y]);
      }
    }
  });
  return fixtures;
}

function buildGeometry(sourceLines: readonly string[]): Geometry {
  const palettes: readonly Palette[] = ["cool", "amber", "cyan", "cyan"];
  const lineWidths = sourceLines.map((line) => {
    const words = line.trim().split(/\s+/);
    return words.reduce((lineTotal, word, wordIndex) => {
      const wordWidth = [...word].reduce((wordTotal, character, characterIndex) => (
        wordTotal + glyphWidth(character) + (characterIndex ? LETTER_GAP : 0)
      ), 0);
      return lineTotal + wordWidth + (wordIndex ? WORD_GAP : 0);
    }, 0);
  });
  const width = Math.max(...lineWidths);
  const height = sourceLines.length * LINE_HEIGHT + Math.max(0, sourceLines.length - 1) * LINE_GAP;

  const lines = sourceLines.map((line, lineIndex): Line => {
    let cursor = (width - lineWidths[lineIndex]) / 2;
    let ledNumber = 0;
    const words = line.trim().split(/\s+/).map((word, wordIndex): Word => {
      if (wordIndex) cursor += WORD_GAP;
      const letters = [...word].map((character, characterIndex): Letter => {
        if (characterIndex) cursor += LETTER_GAP;
        const glyph = glyphFor(character);
        const letterX = cursor;
        const leds: Led[] = [];

        glyph.paths.flatMap(fixturesAlongPath).forEach(([x, y]) => {
          leds.push({
            id: `line-${lineIndex + 1}-letter-${characterIndex + 1}-led-${++ledNumber}`,
            x: stableCoordinate(letterX + x),
            y: stableCoordinate(lineIndex * (LINE_HEIGHT + LINE_GAP) + y),
          });
        });

        cursor += glyphWidth(character);
        return {
          character,
          id: `line-${lineIndex + 1}-word-${wordIndex + 1}-letter-${characterIndex + 1}`,
          leds,
        };
      });
      return { id: `line-${lineIndex + 1}-word-${wordIndex + 1}`, letters };
    });

    return {
      id: `fixture-line-${lineIndex + 1}`,
      palette: palettes[lineIndex % palettes.length],
      width: lineWidths[lineIndex],
      words,
    };
  });

  return { height, lines, width };
}

function FixtureSymbols() {
  return (
    <defs>
      <radialGradient id="fixture-cool-lens" cx="42%" cy="38%" r="62%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".25" stopColor="#f8fbff" />
        <stop offset=".54" stopColor="#c7dcff" />
        <stop offset=".78" stopColor="#5f7cff" />
        <stop offset="1" stopColor="#071138" />
      </radialGradient>
      <radialGradient id="fixture-amber-lens" cx="42%" cy="38%" r="62%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".24" stopColor="#fffbe8" />
        <stop offset=".5" stopColor="#ffe247" />
        <stop offset=".78" stopColor="#ff8a00" />
        <stop offset="1" stopColor="#4b1300" />
      </radialGradient>
      <radialGradient id="fixture-cyan-lens" cx="42%" cy="38%" r="62%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".24" stopColor="#efffff" />
        <stop offset=".5" stopColor="#67f6ff" />
        <stop offset=".78" stopColor="#00a8f3" />
        <stop offset="1" stopColor="#002c63" />
      </radialGradient>
      <radialGradient id="fixture-cool-halo">
        <stop offset="0" stopColor="#dce8ff" stopOpacity=".34" />
        <stop offset=".52" stopColor="#526dff" stopOpacity=".13" />
        <stop offset="1" stopColor="#526dff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="fixture-amber-halo">
        <stop offset="0" stopColor="#fff5a7" stopOpacity=".34" />
        <stop offset=".52" stopColor="#ff7600" stopOpacity=".14" />
        <stop offset="1" stopColor="#ff7600" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="fixture-cyan-halo">
        <stop offset="0" stopColor="#d9ffff" stopOpacity=".34" />
        <stop offset=".52" stopColor="#00aaf8" stopOpacity=".14" />
        <stop offset="1" stopColor="#00aaf8" stopOpacity="0" />
      </radialGradient>

      {(["cool", "amber", "cyan"] as const).map((palette) => {
        const flare = palette === "amber" ? "#ff9b00" : palette === "cyan" ? "#00cfff" : "#6f85ff";
        return (
          <symbol key={palette} id={`fixture-${palette}`} viewBox="-1 -1 2 2" overflow="visible">
            <circle r=".39" fill="#030706" stroke="#25302d" strokeWidth=".07" />
            <circle r=".31" fill="#09100f" stroke="#62706b" strokeWidth=".025" />
            <g className={styles.illumination}>
              <circle r=".9" fill={`url(#fixture-${palette}-halo)`} />
              <g className={styles.starburst} stroke={flare} strokeLinecap="round" strokeOpacity=".38">
                <path d="M-.7 0H-.38M.38 0H.7M0-.7V-.38M0 .38V.7" strokeWidth=".028" />
                <path d="M-.49-.49L-.29-.29M.29.29L.49.49M.49-.49L.29-.29M-.29.29L-.49.49" strokeWidth=".018" />
              </g>
              <circle r=".305" fill={`url(#fixture-${palette}-lens)`} stroke="#fff" strokeOpacity=".7" strokeWidth=".025" />
              <circle r=".13" fill="#fff" />
              <circle cx="-.105" cy="-.12" r=".05" fill="#fff" />
            </g>
          </symbol>
        );
      })}
    </defs>
  );
}

export function FixtureLensHeading({ className = "", id, lines, text }: Props) {
  const geometry = useMemo(() => buildGeometry(lines), [lines]);

  return (
    <h1
      id={id}
      className={`${styles.heading} ${className}`.trim()}
      style={{
        aspectRatio: `${geometry.width + 2} / ${geometry.height + 2}`,
        maxWidth: "100%",
        width: "100%",
      } as CSSProperties}
    >
      <span className={styles.semanticText}>{text}</span>
      <svg
        className={styles.rig}
        viewBox={`-1 -1 ${geometry.width + 2} ${geometry.height + 2}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <FixtureSymbols />
        {geometry.lines.map((line) => (
          <g key={line.id} className={styles.fixtureLine}>
            {line.words.map((word) => (
              <g key={word.id}>
                {word.letters.map((letter) => (
                  <g key={letter.id}>
                    {letter.leds.map((led) => (
                      <use
                        key={led.id}
                        className={styles.fixture}
                        href={`#fixture-${line.palette}`}
                        x={stableCoordinate(led.x - 1)}
                        y={stableCoordinate(led.y - 1)}
                        width="2"
                        height="2"
                      />
                    ))}
                  </g>
                ))}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </h1>
  );
}
