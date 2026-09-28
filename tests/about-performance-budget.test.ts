import { statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicFile = (path: string) => statSync(join(process.cwd(), "public", path)).size;

describe("About hero media budgets", () => {
  it("keeps the desktop motion asset below 900 KiB", () => {
    expect(publicFile("videos/about/patrick-groove-cutout-v1.webm")).toBeLessThan(900 * 1024);
  });

  it("serves a smaller mobile motion asset below 550 KiB", () => {
    expect(publicFile("videos/about/patrick-groove-cutout-v1-480.webm")).toBeLessThan(550 * 1024);
  });

  it("keeps the immediate poster below 75 KiB", () => {
    expect(publicFile("images/about/patrick-groove-poster-v1.webp")).toBeLessThan(75 * 1024);
  });
});
