import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

describe("HSDJ-WEB-AVAILABILITY-01 modal desktop geometry", () => {
  it("uses a proportional grid for segmented wedding date fields", () => {
    const fields = readSource("src/components/wedding-date-fields.tsx");
    expect(fields).toMatch(/grid-cols-\[minmax\(0,1\.4fr\)_minmax\(0,1fr\)_minmax\(0,1fr\)\]/);
    expect(fields).toMatch(/min-w-0/);
    expect(fields).toMatch(/placeholder="YYYY"/);
    expect(fields).toMatch(/placeholder="MM"/);
    expect(fields).toMatch(/placeholder="DD"/);
    expect(fields).toMatch(/aria-label="Year \(YYYY\)"/);
    expect(fields).not.toMatch(/flex-none/);
    expect(fields).not.toMatch(/overflow-x-auto/);
  });

  it("expands the header availability panel width on desktop", () => {
    const header = readSource("src/components/header-check-availability.tsx");
    expect(header).toMatch(/xl:w-\[min\(calc\(100vw-2rem\),28rem\)\]/);
    expect(header).toMatch(/w-\[min\(calc\(100vw-1\.5rem\),26rem\)\]/);
    expect(header).not.toMatch(/22rem/);
  });

  it("keeps compact availability checker wired to wedding date fields and submit", () => {
    const checker = readSource("src/components/compact-availability-checker.tsx");
    expect(checker).toMatch(/WeddingDateFields/);
    expect(checker).toMatch(/runAvailabilityCheck/);
    expect(checker).toMatch(/Check Availability/);
    expect(checker).not.toMatch(/overflow-x-auto/);
  });

  it("does not introduce a second availability modal implementation", () => {
    const header = readSource("src/components/header-check-availability.tsx");
    expect(header).toMatch(/<CompactAvailabilityChecker/);
    expect(header).toMatch(/role="dialog"/);
    const renderMatches = header.match(/<CompactAvailabilityChecker/g) ?? [];
    expect(renderMatches.length).toBe(1);
  });
});
