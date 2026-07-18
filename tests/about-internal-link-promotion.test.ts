import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function readPage(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function countAboutLinks(source: string): number {
  return (source.match(/href="\/about"/g) ?? []).length;
}

describe("HSO-WEB-P01 about internal link promotion", () => {
  it("homepage exposes a contextual body link to /about", () => {
    const home = readPage("src/app/page.tsx");
    expect(countAboutLinks(home)).toBeGreaterThanOrEqual(1);
    expect(home).toMatch(/Full story on About/);
  });

  it("packages page exposes a contextual body link to /about", () => {
    const packages = readPage("src/app/packages/page.tsx");
    expect(countAboutLinks(packages)).toBe(1);
    expect(packages).toMatch(/Meet the person behind Howe Sound DJ/);
  });

  it("contact page exposes a contextual body link to /about", () => {
    const contact = readPage("src/app/contact/page.tsx");
    expect(countAboutLinks(contact)).toBe(1);
    expect(contact).toMatch(/Read about Patrick/);
  });

  it("contact page keeps primary inquiry surfaces intact", () => {
    const contact = readPage("src/app/contact/page.tsx");
    expect(contact).toMatch(/ContactAvailabilityForm/);
    expect(contact).toMatch(/ContactSecondaryInquiryForm/);
    expect(contact).toMatch(/ContactBookConsultSection/);
  });
});
