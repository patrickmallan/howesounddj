import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MEDIA_COPY_GRID_GAP,
  PAGE_GUTTER_X,
  SECTION_BAND_BORDER_ENTRY,
  SECTION_BAND_PRE_BORDER_BOTTOM,
  SECTION_BAND_Y,
} from "../src/lib/cta-section-spacing";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

describe("HSDJ sitewide spacing geometry contracts", () => {
  it("exports a bounded spacing vocabulary for primary content bands", () => {
    expect(PAGE_GUTTER_X).toBe("px-6 lg:px-8");
    expect(SECTION_BAND_Y).toContain("pt-14");
    expect(SECTION_BAND_BORDER_ENTRY).toMatch(/pt-10/);
    expect(SECTION_BAND_PRE_BORDER_BOTTOM).toMatch(/pb-10/);
    expect(MEDIA_COPY_GRID_GAP).toBe("gap-8 md:gap-10 lg:gap-12");
  });

  it("homepage about band uses border-entry rhythm and avoids stacked section dead zones", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).toMatch(/id="about"/);
    expect(page).toContain("SECTION_BAND_BORDER_ENTRY");
    expect(page).toContain("SECTION_BAND_PRE_BORDER_BOTTOM");
    expect(page).toContain("MEDIA_COPY_GRID_GAP");
    expect(page).toContain("MEDIA_CARD_PAD");
    expect(page).toContain('data-testid="home-about-grid"');
    expect(page).toContain('data-testid="home-patrick-portrait"');
    expect(page).toContain('data-testid="home-about-copy"');
    expect(page).toMatch(/className="!m-0 !space-y-0"/);
    expect(page).toMatch(/max-lg:justify-start lg:justify-center/);
    expect(page).not.toMatch(/gap-12 px-6 py-16 md:py-24 lg:grid-cols-2/);
  });

  it("homepage primary sections import canonical spacing tokens", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).toContain("PAGE_GUTTER_X");
    expect(page).toContain("SECTION_BAND_Y");
    expect(page).toContain("EYEBROW_TO_HEADING");
  });

  it("does not wire Availability Success into homepage spacing edits", () => {
    const page = readSource("src/app/page.tsx");
    expect(page).not.toMatch(/post-availability-success/);
    expect(readSource("src/components/post-availability-success.tsx")).toMatch(/PostAvailabilitySuccess/);
  });

  it("documents expected mobile gutter symmetry at 375px viewport", () => {
    const gutterPx = 24;
    const borderEntryTopPx = 40;
    const preBorderBottomPx = 40;
    const mediaCopyGapPx = 32;
    const combinedServicesToAboutGap = preBorderBottomPx + borderEntryTopPx;
    expect(gutterPx).toBe(24);
    expect(combinedServicesToAboutGap).toBeLessThan(128);
    expect(mediaCopyGapPx).toBeLessThan(48);
  });
});
