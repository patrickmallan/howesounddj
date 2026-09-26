"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  label?: string;
  peak?: boolean;
};

const SEGMENT_COUNT = 36;
const FRAME_INTERVAL_MS = 1000 / 30;
const INITIAL_LIT_SEGMENTS = [18, 17] as const;
const segments = Array.from({ length: SEGMENT_COUNT }, (_, index) => index);

function pulse(phase: number, position: number, width: number) {
  const distance = Math.min(Math.abs(phase - position), 1 - Math.abs(phase - position));
  return Math.exp(-(distance * distance) / (2 * width * width));
}

export function LivingVUMeter({ className = "", label = "MASTER", peak = false }: Props) {
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const meter = meterRef.current;
    if (!meter) return;

    const channels = Array.from(meter.querySelectorAll<HTMLElement>(".hsdj-vu-channel"));
    const channelSegments = channels.map((channel) => Array.from(channel.querySelectorAll<HTMLElement>(".hsdj-vu-leds i")));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // A level meter still needs to read as live when the visitor requests
      // reduced motion. Use a calm stepped programme instead of rapid peaks.
      const calmLevels = [[18, 17], [21, 19], [18, 22], [20, 18]] as const;
      let calmStep = 0;
      const renderCalmLevel = () => {
        channelSegments.forEach((lights, channelIndex) => {
          lights.forEach((light, index) => light.classList.toggle("is-lit", index < calmLevels[calmStep][channelIndex]));
        });
      };
      renderCalmLevel();
      const calmFrame = window.setInterval(() => {
        calmStep = (calmStep + 1) % calmLevels.length;
        renderCalmLevel();
      }, 650);
      return () => window.clearInterval(calmFrame);
    }

    let frame = 0;
    let previous = performance.now();
    let running = false;
    const level = [0.42, 0.44];
    const heldPeak = [0.5, 0.52];
    const holdUntil = [0, 0];
    // The server-rendered meter is already lit so it never flashes "off" while
    // a mobile browser downloads and hydrates the interactive component.
    const renderedLights = channelSegments.map((lights) => lights.filter((light) => light.classList.contains("is-lit")).length);
    const renderedPeaks = [-1, -1];
    let lastBeat = -1;
    let lastPhrase = -1;
    let phraseEnergy = 0.06;
    let phraseTarget = 0.06;
    let kickStrength = 0.48;
    let backbeatStrength = 0.22;
    let eighthStrength = 0.08;
    let stereoTarget = 0;
    let stereoPosition = 0;
    let redPush = 0;

    const animate = (now: number) => {
      if (now - previous < FRAME_INTERVAL_MS) {
        if (running) frame = requestAnimationFrame(animate);
        return;
      }
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      // One shared musical programme drives both sides. Small accent and pan
      // differences create a believable stereo image without random flicker.
      const beats = (now / 1000) * (122 / 60);
      const beatNumber = Math.floor(beats);
      const beatPhase = beats % 1;
      const phraseNumber = Math.floor(beats / 8);

      // Change the musical emphasis only on beat and phrase boundaries. This
      // creates an evolving performance without the nervousness of frame-by-frame noise.
      if (beatNumber !== lastBeat) {
        lastBeat = beatNumber;
        kickStrength = 0.4 + Math.random() * 0.17;
        backbeatStrength = 0.16 + Math.random() * 0.14;
        eighthStrength = 0.04 + Math.random() * 0.09;
        stereoTarget = (Math.random() - 0.5) * 0.075;
        redPush = Math.random() < 0.24 ? 0.14 + Math.random() * 0.06 : 0;
      }
      if (phraseNumber !== lastPhrase) {
        lastPhrase = phraseNumber;
        phraseTarget = 0.035 + Math.random() * 0.105;
      }

      phraseEnergy += (phraseTarget - phraseEnergy) * (1 - Math.exp(-dt / 1.8));
      stereoPosition += (stereoTarget - stereoPosition) * (1 - Math.exp(-dt / 0.32));

      const kick = pulse(beatPhase, 0, 0.052);
      const backbeat = pulse(beatPhase, 0.5, 0.07);
      const eighth = pulse(beatPhase, 0.25, 0.045) + pulse(beatPhase, 0.75, 0.045);
      const programme = 0.26 + kick * (kickStrength + redPush) + backbeat * backbeatStrength + eighth * eighthStrength + phraseEnergy;
      const targets = [
        Math.min(0.955, programme + stereoPosition + kick * 0.018),
        Math.min(0.955, programme - stereoPosition + backbeat * 0.026),
      ];

      targets.forEach((target, index) => {
        const timeConstant = target > level[index] ? 0.018 : 0.68;
        level[index] += (target - level[index]) * (1 - Math.exp(-dt / timeConstant));

        if (level[index] >= heldPeak[index]) {
          heldPeak[index] = level[index];
          holdUntil[index] = now + 720;
        } else if (now > holdUntil[index]) {
          heldPeak[index] = Math.max(level[index], heldPeak[index] - dt * 0.2);
        }

        const litCount = Math.round(level[index] * SEGMENT_COUNT);
        const previousCount = renderedLights[index];
        if (litCount !== previousCount) {
          const start = Math.min(litCount, previousCount);
          const end = Math.max(litCount, previousCount);
          for (let lightIndex = start; lightIndex < end; lightIndex += 1) {
            channelSegments[index]?.[lightIndex]?.classList.toggle("is-lit", lightIndex < litCount);
          }
          renderedLights[index] = litCount;
        }

        const peakSegment = Math.round(heldPeak[index] * SEGMENT_COUNT);
        if (peakSegment !== renderedPeaks[index]) {
          channels[index]?.style.setProperty("--meter-peak", `${(peakSegment / SEGMENT_COUNT * 100).toFixed(1)}%`);
          renderedPeaks[index] = peakSegment;
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
    }, { rootMargin: "100px" });
    const isNearViewport = () => {
      const bounds = meter.getBoundingClientRect();
      return bounds.bottom >= -100 && bounds.top <= window.innerHeight + 100;
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (isNearViewport()) start();
    };

    observer.observe(meter);
    // The homepage meter is already visible at hydration time. Start it now
    // rather than depending on an observer callback that older iOS WebKit can
    // defer until the page scrolls.
    if (!document.hidden && isNearViewport()) start();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={meterRef} className={`hsdj-vu-meter ${peak ? "is-peak" : ""} ${className}`.trim()} aria-hidden="true">
      <div className="hsdj-vu-header"><span className="hsdj-vu-label">{label}</span><span className="hsdj-vu-status"><i /> LIVE</span></div>
      <div className="hsdj-vu-well">
        <span className="hsdj-vu-scale"><i>+6</i><i>0</i><i>-6</i><i>-12</i><i>-24</i><i>-∞</i></span>
        {["L", "R"].map((channel, channelIndex) => (
          <div className="hsdj-vu-strip" key={channel}>
            <div className="hsdj-vu-channel">
              <span className="hsdj-vu-peak-marker" />
              <span className="hsdj-vu-leds">
                {segments.map((segment) => <i className={segment < INITIAL_LIT_SEGMENTS[channelIndex] ? "is-lit" : undefined} key={segment} />)}
              </span>
            </div>
            <b>{channel}</b>
          </div>
        ))}
      </div>
      <span className="hsdj-vu-footer"><i /> PROGRAM <i /></span>
    </div>
  );
}
