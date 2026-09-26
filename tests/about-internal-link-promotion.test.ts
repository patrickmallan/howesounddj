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

describe("HSDJ page-purpose and conversion ownership", () => {
  it("homepage exposes a contextual body link to /about", () => {
    const home = readPage("src/app/page.tsx");
    expect(countAboutLinks(home)).toBeGreaterThanOrEqual(1);
    expect(home).toMatch(/Full story on About/);
  });

  it("packages page owns package choice and the booking sequence", () => {
    const packages = readPage("src/app/packages/page.tsx");
    expect(packages).toMatch(/Complete Wedding/);
    expect(packages).toMatch(/A Great Party/);
    expect(packages).toMatch(/One date\. One conversation\. Your call\./);
    expect(packages).toMatch(/className=\{styles\.signalEnd\}/);
    expect(packages).not.toMatch(/finalSection|finalTape/);
    expect(packages).toMatch(/<CTADuo/);
  });

  it("contact page stays focused on checking a date and starting a conversation", () => {
    const contact = readPage("src/app/contact/page.tsx");
    expect(contact).toMatch(/ContactAvailabilityForm/);
    expect(contact).not.toMatch(/<CTADuo/);
  });

  it("contact keeps the no-date message route without adding another sales section", () => {
    const contact = readPage("src/app/contact/page.tsx");
    expect(contact).toMatch(/ContactMessageDrawer/);
    expect(contact).not.toMatch(/<CTADuo/);
  });
});
