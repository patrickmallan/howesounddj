import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.HSDJ_TEST_BASE_URL ?? "http://127.0.0.1:3000";
const useExistingServer = Boolean(process.env.HSDJ_TEST_BASE_URL);

export default defineConfig({
  testDir: "tests/visual",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "off",
    ignoreHTTPSErrors: baseURL.startsWith("https://127.0.0.1:"),
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: useExistingServer ? undefined : {
    command: "npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
