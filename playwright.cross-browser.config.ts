import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "tests/visual",
  testMatch: "cross-browser-smoke.spec.ts",
  timeout: 45_000,
  workers: 1,
  // Local WebKit upgrades HTTP assets under the site's CSP. Use a temporary
  // self-signed HTTPS proxy for smoke tests; production HTTPS needs no override.
  use: { baseURL, ignoreHTTPSErrors: baseURL.startsWith("https://127.0.0.1:") },
  projects: [
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
