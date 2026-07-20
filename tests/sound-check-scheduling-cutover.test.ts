import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PUBLIC_SOUND_CHECK_CTA_LABEL,
  PUBLIC_SOUND_CHECK_SCHEDULING,
  SCHEDULING_PROVIDER,
} from "@/config/site-scheduling";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";
import { consultClickEventParams } from "@/lib/analytics";

const ROOT = process.cwd();
const SOUND_CHECK_URL = "https://calendly.com/patrick-howesounddj/sound-check";
const GENERIC_CALENDLY_PROFILE = "https://calendly.com/patrick-howesounddj";
const SHOWTIME_PREP_URL = "https://calendly.com/patrick-howesounddj/showtime-prep";

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function collectProductionSources(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectProductionSources(fullPath, acc);
      continue;
    }
    if (/\.(ts|tsx)$/.test(entry)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

const PRODUCTION_SOURCES = collectProductionSources(join(ROOT, "src"));

describe("HSDJ-WEB-SCHEDULING-01 Sound Check public cutover", () => {
  it("defines the canonical public Sound Check scheduling owner", () => {
    expect(SCHEDULING_PROVIDER).toBe("CALENDLY");
    expect(PUBLIC_SOUND_CHECK_SCHEDULING.purpose).toBe("SOUND_CHECK");
    expect(PUBLIC_SOUND_CHECK_SCHEDULING.label).toBe("Sound Check");
    expect(PUBLIC_SOUND_CHECK_SCHEDULING.durationMinutes).toBe(45);
    expect(PUBLIC_SOUND_CHECK_SCHEDULING.url).toBe(SOUND_CHECK_URL);
    expect(CONSULT_CALENDLY_URL).toBe(SOUND_CHECK_URL);
    expect(PUBLIC_SOUND_CHECK_CTA_LABEL).toBe("Book a Sound Check");
  });

  it("keeps consult-calendly as a thin re-export of the canonical owner", () => {
    const consultCalendly = readSource("src/lib/consult-calendly.ts");
    expect(consultCalendly).toMatch(/from "@\/config\/site-scheduling"/);
    expect(consultCalendly).toMatch(/CONSULT_CALENDLY_URL = PUBLIC_SOUND_CHECK_SCHEDULING\.url/);
    expect(consultCalendly).not.toMatch(/https:\/\/calendly\.com/);
  });

  it("wires principal direct-scheduling CTAs to the canonical URL", () => {
    const trackedLink = readSource("src/components/book-consult-tracked-link.tsx");
    expect(trackedLink).toMatch(/href=\{CONSULT_CALENDLY_URL\}/);
    expect(trackedLink).toMatch(/PUBLIC_SOUND_CHECK_CTA_LABEL/);

    const availabilityForm = readSource("src/components/contact-availability-form.tsx");
    expect(availabilityForm).toMatch(/href=\{CONSULT_CALENDLY_URL\}/);
    expect(availabilityForm).toMatch(/PUBLIC_SOUND_CHECK_CTA_LABEL/);

    const headerChecker = readSource("src/components/compact-availability-checker.tsx");
    expect(headerChecker).toMatch(/href=\{CONSULT_CALENDLY_URL\}/);
    expect(headerChecker).toMatch(/PUBLIC_SOUND_CHECK_CTA_LABEL/);
  });

  it("renders accessible Sound Check CTA labels on direct scheduling surfaces", () => {
    expect(readSource("src/components/book-consult-tracked-link.tsx")).toMatch(
      /children \?\? PUBLIC_SOUND_CHECK_CTA_LABEL/
    );
    expect(readSource("src/components/contact-availability-form.tsx")).toMatch(/Book a Sound Check/);
    expect(readSource("src/components/contact-book-consult-section.tsx")).toMatch(
      /PUBLIC_SOUND_CHECK_SUPPORTING_COPY/
    );
  });

  it("preserves external-link security on the tracked scheduling link", () => {
    const trackedLink = readSource("src/components/book-consult-tracked-link.tsx");
    expect(trackedLink).toMatch(/target="_blank"/);
    expect(trackedLink).toMatch(/rel="noopener noreferrer"/);
  });

  it("adds sound_check booking semantics to consult analytics params", () => {
    const params = consultClickEventParams({ surface: "hero", intent: "direct_consult" });
    expect(params.provider).toBe("calendly");
    expect(params.booking_purpose).toBe("sound_check");
    expect(params.surface).toBe("hero");
  });

  it("does not expose the generic Calendly profile as a public scheduling destination", () => {
    const offenders = PRODUCTION_SOURCES.filter((filePath) => {
      const source = readFileSync(filePath, "utf8");
      return (
        source.includes(GENERIC_CALENDLY_PROFILE) &&
        !source.includes(SOUND_CHECK_URL) &&
        !source.includes("showtime-prep")
      );
    }).filter(
      (filePath) =>
        !filePath.endsWith("site-scheduling.ts") &&
        !filePath.endsWith("consult-calendly.ts")
    );

    expect(offenders).toEqual([]);
  });

  it("does not expose Showtime Prep in production source", () => {
    const offenders = PRODUCTION_SOURCES.filter((filePath) => {
      const source = readFileSync(filePath, "utf8");
      return /showtime[- ]prep/i.test(source) || source.includes(SHOWTIME_PREP_URL);
    });
    expect(offenders).toEqual([]);
  });

  it("does not duplicate the Sound Check URL literal outside the canonical owner", () => {
    const duplicateLiteralOwners = PRODUCTION_SOURCES.filter((filePath) => {
      if (filePath.endsWith("site-scheduling.ts")) return false;
      return readFileSync(filePath, "utf8").includes(SOUND_CHECK_URL);
    });
    expect(duplicateLiteralOwners).toEqual([]);
  });

  it("keeps inquiry-only routes separate from direct scheduling", () => {
    const contactForm = readSource("src/components/contact-secondary-inquiry-form.tsx");
    expect(contactForm).toMatch(/\/api\/contact/);
    expect(contactForm).not.toMatch(/CONSULT_CALENDLY_URL/);

    const checkLink = readSource("src/components/check-availability-tracked-link.tsx");
    expect(checkLink).toMatch(/\/contact#availability/);
    expect(checkLink).not.toMatch(/calendly\.com/);
  });
});
