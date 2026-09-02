import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("production browser policy", () => {
  it("allows the active GA4 collection endpoint through CSP", () => {
    const config = readFileSync("next.config.ts", "utf8");
    const connectSrc = config.match(/\[\s*"connect-src",([\s\S]*?)\]\.join\(" "\)/)?.[1] ?? "";

    expect(connectSrc).toContain("https://analytics.google.com");
    expect(connectSrc).toContain("https://www.google-analytics.com");
  });

  it("raises low-opacity supporting text to an accessible baseline", () => {
    const css = readFileSync("src/app/globals.css", "utf8");

    expect(css).toMatch(/\.text-white\\\/35,[\s\S]*\.text-white\\\/40,[\s\S]*\.text-white\\\/45[\s\S]*rgb\(255 255 255 \/ 0\.5\)/);
  });

  it("keeps analytics out of Google advertising signal collection", () => {
    const analytics = readFileSync("src/components/google-analytics.tsx", "utf8");

    expect(analytics).toContain("allow_google_signals: false");
    expect(analytics).toContain("allow_ad_personalization_signals: false");
  });
});

describe("first-paint policy", () => {
  it("keeps the primary homepage message visible before hydration", () => {
    const source = readFileSync("src/components/homepage-hero-headline.tsx", "utf8");
    expect(source).not.toContain('resolved ? "opacity-100" : "opacity-0"');
    expect(source).not.toContain("useLayoutEffect");
  });

  it("does not preload the full below-fold proof video", () => {
    const source = readFileSync("src/components/home-video-proof.tsx", "utf8");
    expect(source).toContain('preload="none"');
    expect(source).not.toContain("autoPlay");
  });
});
