import { statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicFile = (path: string) => statSync(join(process.cwd(), "public", path)).size;

describe("About hero media budgets", () => {
  it("keeps the real-photo hero below 200 KiB", () => {
    expect(publicFile("images/about/patrick-live-light-trails-retouched-v1.webp")).toBeLessThan(200 * 1024);
  });
});
