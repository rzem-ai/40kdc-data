import { test, expect, devices } from "@playwright/test";

/**
 * Regression: opening a live-session invite on a phone must surface the join
 * prompt, not the PWA install nudge. The nudge fires on iOS user agents
 * (where beforeinstallprompt never comes) once per app version — on an
 * invite URL it used to open on top of the nickname prompt's modal layer,
 * reading as "the link didn't open".
 */
// The iPhone descriptor minus its defaultBrowserType (webkit isn't installed;
// the iOS detection under test is user-agent based, so Chromium suffices).
const iphone = devices["iPhone 13"];
test.use({
  userAgent: iphone.userAgent,
  viewport: iphone.viewport,
  deviceScaleFactor: iphone.deviceScaleFactor,
  isMobile: iphone.isMobile,
  hasTouch: iphone.hasTouch,
});

test("doc invite on a phone shows the join prompt, not the install nudge", async ({ page }) => {
  await page.goto("/?d=test-doc-id&token=test-token");

  // The join flow is front and center…
  await expect(page.getByText("Joining live session")).toBeVisible();
  await expect(page.getByPlaceholder("your name")).toBeVisible();
  await expect(page.getByRole("button", { name: "Join" })).toBeVisible();

  // …and the install nudge stayed away (it would otherwise fire on this
  // fresh iOS profile: no stored version stamp, not standalone).
  await expect(page.getByText("Install Teams Planner")).not.toBeVisible();

  // The nickname prompt is interactive — typing enables Join.
  await expect(page.getByRole("button", { name: "Join" })).toBeDisabled();
  await page.getByPlaceholder("your name").fill("Will");
  await expect(page.getByRole("button", { name: "Join" })).toBeEnabled();
});

test("a plain visit on a phone still gets the install nudge", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Install Teams Planner")).toBeVisible();
});
