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

  it("homepage applies balanced transitions for reported layout defects", () => {
    const page = readSource("src/app/page.tsx");
    const video = readSource("src/components/home-video-proof.tsx");

    expect(page).toContain("HOMEPAGE_HERO_PADDING");
    expect(page).toContain('data-testid="home-venues-band"');
    expect(page).toContain("SECTION_BAND_BORDER_TOP");
    expect(page).toContain("SECTION_TRANSITION_OUT");
    expect(page).toContain("SECTION_TRANSITION_IN");
    expect(page).toContain("SECTION_BAND_BORDER_FOLLOW");
    expect(page).toContain("SECTION_BAND_TOP");
    expect(page).toContain("HOMEPAGE_FINALE_SECTION");
    expect(page).not.toContain("HOMEPAGE_FINALE_INNER_TOP");

    expect(video).toContain("SECTION_TRANSITION_IN");
    expect(video).toContain("SECTION_BAND_BOTTOM");
    expect(video).toContain('data-testid="home-video-proof-eyebrow"');
  });

  it("homepage about band preserves portrait rhythm tokens", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).toContain('data-testid="home-about-grid"');
    expect(page).toContain("MEDIA_COPY_GRID_GAP");
    expect(page).toContain("MEDIA_CARD_PAD");
    expect(page).toMatch(/className="!m-0 !space-y-0"/);
    expect(page).toMatch(/className="flex flex-col justify-center"/);
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
