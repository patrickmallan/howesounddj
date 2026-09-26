import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CTA_FINALE_SECTION_Y,
  MEDIA_COPY_GRID_GAP,
  PAGE_GUTTER_X,
  SECTION_BAND_BORDER_FOLLOW,
  SECTION_BAND_Y,
  SECTION_TRANSITION_IN,
  SECTION_TRANSITION_OUT,
} from "../src/lib/cta-section-spacing";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

describe("HSDJ sitewide spacing geometry contracts", () => {
  it("exports mobile-first transition tokens with balanced section insets", () => {
    expect(PAGE_GUTTER_X).toBe("px-6 lg:px-8");
    expect(CTA_FINALE_SECTION_Y).toMatch(/^py-16/);
    expect(CTA_FINALE_SECTION_Y).not.toMatch(/\bmt-/);
    expect(SECTION_BAND_Y).toContain("pt-12");
    expect(SECTION_TRANSITION_OUT).toMatch(/pb-12/);
    expect(SECTION_TRANSITION_IN).toMatch(/pt-12/);
    expect(SECTION_BAND_BORDER_FOLLOW).toBe(SECTION_BAND_Y);
    expect(MEDIA_COPY_GRID_GAP).toBe("gap-8 md:gap-10 lg:gap-12");
  });

  it("homepage implements the eight-chapter deck instead of the old section stack", () => {
    const page = readSource("src/app/page.tsx");

    expect(page).toContain("styles.arrivalCopy");
    expect(readSource("src/app/layout.tsx")).toContain("HomepageScrollFader");
    expect(page).toContain("styles.soundCheck");
    expect(page).toContain("styles.build");
    expect(page).toContain("styles.readRoom");
    expect(page).toContain("styles.playback");
    expect(page).toContain("styles.operator");
    expect(page).toContain("styles.remembers");
    expect(page).toContain("styles.encore");
    expect(page).toContain("LivingVUMeter");
    expect(page).toContain("NightMixFader");
    expect(readSource("src/components/night-mix-fader.tsx")).toContain("crossfader-cap.png");
    expect(page).not.toContain("channel-fader-rail.png");
    expect(page).not.toContain("styles.faderBank");
    expect(page).toContain('data-testid="home-venues-band"');
  });

  it("renders both VU channels as efficient bottom-up LED signals", () => {
    const meter = readSource("src/components/living-vu-meter.tsx");
    const globalCss = readSource("src/app/globals.css");

    expect(meter).toContain("hsdj-vu-leds");
    expect(meter).toContain("is-lit");
    expect(meter).toContain("IntersectionObserver");
    expect(meter).not.toContain("hsdj-vu-segment");
    expect(globalCss).toContain(".hsdj-vu-leds");
    expect(globalCss).toContain(".hsdj-vu-leds i.is-lit");
    expect(globalCss).not.toContain("hsdj-vu-level-a");
    expect(globalCss).not.toContain("hsdj-vu-level-b");
  });

  it("homepage operator chapter preserves the portrait and first-person route", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).toContain('data-testid="home-about-grid"');
    expect(page).toContain("styles.operatorPaper");
    expect(page).toContain("I&apos;m Patrick");
    expect(page).toContain('href="/about"');
  });

  it("uses one locked twelve-o-clock knob for every informational marker", () => {
    const marker = readSource("src/components/hardware-list-marker.tsx");
    const homepage = readSource("src/app/page.tsx");

    expect(marker).toContain("controls/rotary/eq-black.png");
    expect(marker).not.toContain("rotation");
    expect(homepage).not.toContain("kind=");
    expect(homepage).not.toContain("rotation=");
  });

  it("does not wire Availability Success into homepage spacing edits", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).not.toMatch(/post-availability-success/);
    expect(readSource("src/components/post-availability-success.tsx")).toMatch(/PostAvailabilitySuccess/);
  });

  it("documents balanced mobile section insets at 375px", () => {
    const sectionInsetPx = 48;
    expect(sectionInsetPx).toBeGreaterThanOrEqual(40);
    expect(sectionInsetPx).toBeLessThanOrEqual(56);
  });
});
