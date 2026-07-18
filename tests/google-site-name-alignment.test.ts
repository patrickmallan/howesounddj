import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  HOMEPAGE_TITLE,
  SITE_ALTERNATE_NAMES,
  SITE_ORIGIN,
  SITE_PUBLIC_NAME,
  SITE_SHORT_NAME,
} from "@/config/site-brand";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function countJsonLdType(source: string, type: string): number {
  return (source.match(new RegExp(`"@type":\\s*"${type}"`, "g")) ?? []).length;
}

describe("HSO-WEB-P02 google site name alignment", () => {
  it("defines the approved public site name and alternates", () => {
    expect(SITE_PUBLIC_NAME).toBe("Howe Sound Wedding DJ");
    expect(SITE_ALTERNATE_NAMES).toEqual(["Howe Sound DJ", "howesounddj.com"]);
    expect(SITE_SHORT_NAME).toBe("Howe Sound DJ");
    expect(SITE_ORIGIN).toBe("https://www.howesounddj.com");
  });

  it("emits exactly one canonical WebSite entity on the homepage source", () => {
    const home = readSource("src/app/page.tsx");
    expect(home).toMatch(/websiteJsonLd\(\)/);
    expect(countJsonLdType(home, "WebSite")).toBe(0);
  });

  it("serializes the canonical WebSite payload", () => {
    const website = websiteJsonLd();
    expect(website["@type"]).toBe("WebSite");
    expect(website["@id"]).toBe("https://www.howesounddj.com/#website");
    expect(website.name).toBe("Howe Sound Wedding DJ");
    expect(website.url).toBe("https://www.howesounddj.com/");
    expect(website.alternateName).toEqual(["Howe Sound DJ", "howesounddj.com"]);
    expect(() => JSON.stringify(website)).not.toThrow();
    expect(JSON.stringify(website)).not.toMatch(/localhost/);
  });

  it("aligns Organization name with the approved public identity", () => {
    const organization = organizationJsonLd();
    expect(organization["@type"]).toBe("Organization");
    expect(organization.name).toBe("Howe Sound Wedding DJ");
    expect(organization.alternateName).toEqual(["Howe Sound DJ"]);
    expect(organization.url).toBe("https://www.howesounddj.com");
    expect(() => JSON.stringify(organization)).not.toThrow();
  });

  it("does not define a LocalBusiness entity in the canonical schema owner", () => {
    const jsonLd = readSource("src/lib/json-ld.ts");
    expect(jsonLd).not.toMatch(/LocalBusiness/);
  });

  it("aligns root layout og:site_name with the approved public name", () => {
    const layout = readSource("src/app/layout.tsx");
    expect(layout).toMatch(/siteName:\s*SITE_PUBLIC_NAME/);
    expect(layout).toMatch(/property="og:site_name" content=\{SITE_PUBLIC_NAME\}/);
  });

  it("aligns the homepage title with the approved brand", () => {
    expect(HOMEPAGE_TITLE.startsWith("Howe Sound Wedding DJ")).toBe(true);
    const home = readSource("src/app/page.tsx");
    expect(home).toMatch(/title:\s*\{\s*absolute:\s*HOMEPAGE_TITLE\s*\}/);
    expect(home).toMatch(/canonical:\s*`\$\{SITE_ORIGIN\}\/`/);
  });

  it("keeps internal-page title templates on the shorter alternate brand", () => {
    const layout = readSource("src/app/layout.tsx");
    expect(layout).toMatch(/template:\s*`%s \| \$\{SITE_SHORT_NAME\}`/);

    const contact = readSource("src/app/contact/page.tsx");
    expect(contact).toMatch(/Contact \| Howe Sound DJ/);

    const packages = readSource("src/app/packages/page.tsx");
    expect(packages).toMatch(/Wedding DJ Packages \| Clear Sea-to-Sky Coverage/);
    expect(packages).not.toMatch(/Howe Sound Wedding DJ \| Howe Sound Wedding DJ/);
  });
});
