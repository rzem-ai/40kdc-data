import { defineConfig } from "@playwright/test";

/**
 * E2E harness for the teams-planner flows that vitest can't reach — the
 * pairings simulator is a multi-step UI walkthrough whose engine is unit
 * tested but whose *flow* (tab switch, secret picks, reveals, layout
 * declaration, summary) only exists in the browser.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:4291",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --port 4291 --strictPort",
    url: "http://localhost:4291",
    reuseExistingServer: !process.env.CI,
  },
});
