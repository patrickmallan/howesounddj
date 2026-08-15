import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/visual",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "off",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
