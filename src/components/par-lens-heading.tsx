"use client";

import { useEffect, useRef } from "react";
import { METER_MATRIX_PATTERNS } from "./meter-matrix-heading";
import styles from "./par-lens-heading.module.css";

const PALETTE = [
  [50, 231, 255],
  [165, 107, 255],
  [255, 72, 179],
  [255, 212, 51],
  [88, 240, 140],
] as const;
const TARGET_FRAME_MS = 1000 / 24;

type Lens = {
  active: boolean;
  bank: number;
  x: number;
  y: number;
};

type Props = {
  className?: string;
  id?: string;
  lines: readonly string[];
  text: string;
};

function lineUnits(text: string) {
  return [...text].reduce((total, character) => {
    if (character === " ") return total + 3.2;
    const pattern = METER_MATRIX_PATTERNS[character.toUpperCase()] ?? METER_MATRIX_PATTERNS["?"];
    return total + pattern[0].length + 1;
  }, -1);
}

function makeSprite(
  size: number,
  color: readonly [number, number, number] | null,
  intensity: number,
  dpr: number,
) {
  const sprite = document.createElement("canvas");
  sprite.width = Math.ceil(size * dpr);
  sprite.height = Math.ceil(size * dpr);
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const center = size / 2;
  const housingRadius = size * .275;
  const lensRadius = size * .205;

  if (color) {
    const [red, green, blue] = color;
    const haloRadius = size * .49;
    const halo = context.createRadialGradient(center, center, lensRadius * .3, center, center, haloRadius);
    halo.addColorStop(0, `rgba(${red},${green},${blue},${.1 + .25 * intensity})`);
    halo.addColorStop(.42, `rgba(${red},${green},${blue},${.04 + .14 * intensity})`);
    halo.addColorStop(1, `rgba(${red},${green},${blue},0)`);
    context.fillStyle = halo;
    context.fillRect(0, 0, size, size);
  }

  context.beginPath();
  context.arc(center, center, housingRadius, 0, Math.PI * 2);
  const bezel = context.createRadialGradient(
    center - housingRadius * .3,
    center - housingRadius * .34,
    housingRadius * .08,
    center,
    center,
    housingRadius,
  );
  bezel.addColorStop(0, "#626e6a");
  bezel.addColorStop(.24, "#242c29");
  bezel.addColorStop(.72, "#050807");
  bezel.addColorStop(1, "#202825");
  context.fillStyle = bezel;
  context.fill();
  context.lineWidth = Math.max(.75, size * .028);
  context.strokeStyle = color ? "rgba(214,240,235,.42)" : "rgba(121,151,142,.18)";
  context.stroke();

  context.beginPath();
  context.arc(center, center, lensRadius, 0, Math.PI * 2);
  if (!color) {
    context.fillStyle = "rgba(5,12,10,.96)";
    context.fill();
    context.strokeStyle = "rgba(100,137,125,.16)";
    context.stroke();
    return sprite;
  }

  const [red, green, blue] = color;
  const gradient = context.createRadialGradient(
    center - lensRadius * .2,
    center - lensRadius * .24,
    lensRadius * .08,
    center,
    center,
    lensRadius,
  );
  gradient.addColorStop(0, `rgba(255,255,255,${.86 + intensity * .14})`);
  gradient.addColorStop(.18, `rgba(${red},${green},${blue},${.84 + intensity * .16})`);
  gradient.addColorStop(.68, `rgba(${Math.round(red * .62)},${Math.round(green * .62)},${Math.round(blue * .62)},${.7 + intensity * .3})`);
  gradient.addColorStop(1, `rgba(${Math.round(red * .12)},${Math.round(green * .12)},${Math.round(blue * .12)},.98)`);
  context.fillStyle = gradient;
  context.fill();
  context.lineWidth = Math.max(.75, size * .032);
  context.strokeStyle = `rgba(${red},${green},${blue},${.58 + intensity * .38})`;
  context.stroke();

  context.beginPath();
  context.arc(
    center - lensRadius * .28,
    center - lensRadius * .31,
    Math.max(.5, lensRadius * (.1 + intensity * .1)),
    0,
    Math.PI * 2,
  );
  context.fillStyle = `rgba(255,255,255,${.7 + intensity * .3})`;
  context.fill();
  return sprite;
}

export function ParLensHeading({ className = "", id, lines, text }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let running = false;
    let visible = false;
    let previous = 0;
    const started = performance.now();
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let drawSize = 0;
    let lenses: Lens[] = [];
    let colorSprites: HTMLCanvasElement[][] = [];

    const prepare = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      pixelRatio = dpr;
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const maxUnits = Math.max(...lines.map(lineUnits));
      const paddingX = Math.max(2, width * .006);
      const paddingY = Math.max(2, height * .025);
      const lineGapUnits = 1.25;
      const cell = Math.min(
        (width - paddingX * 2) / maxUnits,
        (height - paddingY * 2) / (lines.length * 7 + (lines.length - 1) * lineGapUnits),
      );
      drawSize = Math.max(8, Math.ceil(cell * 1.65));
      lenses = [];

      const contentHeight = lines.length * 7 * cell + (lines.length - 1) * lineGapUnits * cell;
      let top = (height - contentHeight) / 2;
      lines.forEach((line) => {
        let left = paddingX;
        [...line].forEach((character) => {
          if (character === " ") {
            left += cell * 3.2;
            return;
          }
          const pattern = METER_MATRIX_PATTERNS[character.toUpperCase()] ?? METER_MATRIX_PATTERNS["?"];
          const columns = pattern[0].length;
          pattern.forEach((row, rowIndex) => {
            [...row].forEach((value, columnIndex) => {
              const x = left + columnIndex * cell + cell / 2;
              const y = top + rowIndex * cell + cell / 2;
              const angle = Math.atan2(y / height - .5, x / width - .5);
              const bank = Math.floor((((angle / (Math.PI * 2)) + 1) % 1) * PALETTE.length);
              lenses.push({ active: value === "1", bank, x, y });
            });
          });
          left += cell * (columns + 1);
        });
        top += cell * (7 + lineGapUnits);
      });

      colorSprites = PALETTE.map((color) => [
        makeSprite(drawSize, color, .52, pixelRatio),
        makeSprite(drawSize, color, .78, pixelRatio),
        makeSprite(drawSize, color, 1, pixelRatio),
      ]);
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const cue = reduceMotion ? 1 : ((now - started) / 1000) * .62;
      const cueStep = Math.floor(cue) % PALETTE.length;
      const cueBlend = cue % 1;

      lenses.forEach((lens) => {
        if (!lens.active) return;
        const relativeBank = (lens.bank - cueStep + PALETTE.length) % PALETTE.length;
        const intensityIndex = relativeBank === 0
          ? (cueBlend < .48 ? 2 : 1)
          : relativeBank === PALETTE.length - 1 && cueBlend > .52
            ? 2
            : 0;
        const colorIndex = (lens.bank + cueStep) % PALETTE.length;
        const sprite = colorSprites[colorIndex][intensityIndex];
        context.drawImage(sprite, lens.x - drawSize / 2, lens.y - drawSize / 2, drawSize, drawSize);
      });
      canvas.dataset.ready = "true";
    };

    const animate = (now: number) => {
      if (!running) return;
      if (now - previous >= TARGET_FRAME_MS) {
        previous = now;
        draw(now);
      }
      frame = requestAnimationFrame(animate);
    };
    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      previous = performance.now();
      frame = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      prepare();
      draw(reduceMotion ? started : performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { rootMargin: "80px" });
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    prepare();
    draw(started);
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [lines]);

  return (
    <h1 id={id} className={`${styles.heading} ${className}`.trim()} aria-label={text}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span className={styles.fallback} aria-hidden="true">
        {lines.map((line) => <span key={line}>{line}</span>)}
      </span>
    </h1>
  );
}
