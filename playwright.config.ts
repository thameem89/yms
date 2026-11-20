import { defineConfig, devices } from "@playwright/test";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  reporter: "list",
  use: {
    baseURL,
    launchOptions: executablePath ? { executablePath } : undefined,
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: baseURL,
    env: { RESEND_API_KEY: "", ENQUIRY_FROM_EMAIL: "", NEXT_TELEMETRY_DISABLED: "1" },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
});
