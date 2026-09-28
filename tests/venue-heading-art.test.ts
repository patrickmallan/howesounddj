import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

test("venue fixture artwork stays in sync with names and renderer", () => {
  const projectRoot = fileURLToPath(new URL("../", import.meta.url));
  expect(() => execFileSync(process.execPath, ["scripts/generate-venue-heading-art.mjs", "--check"], {
    cwd: projectRoot,
    stdio: "pipe",
  })).not.toThrow();
});
