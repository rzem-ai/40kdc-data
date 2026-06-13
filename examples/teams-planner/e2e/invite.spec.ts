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

  // The join flow is front and center — a centered dialog over the blurred page.
  const dialog = page.locator("dialog", { hasText: "Join live session" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByPlaceholder("your name")).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Join" })).toBeVisible();
  // Centered, not corner-pinned: the dialog's center sits near the viewport's.
  const [box, viewport] = [await dialog.boundingBox(), page.viewportSize()!];
  expect(Math.abs(box!.x + box!.width / 2 - viewport.width / 2)).toBeLessThan(40);

  // …and the install nudge stayed away (it would otherwise fire on this
  // fresh iOS profile: no stored version stamp, not standalone).
  await expect(page.getByText("Install Teams Planner")).not.toBeVisible();

  // The nickname prompt is interactive — typing enables Join.
  await expect(dialog.getByRole("button", { name: "Join" })).toBeDisabled();
  await dialog.getByPlaceholder("your name").fill("Will");
  await expect(dialog.getByRole("button", { name: "Join" })).toBeEnabled();
});

test("a plain visit on a phone still gets the install nudge", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Install Teams Planner")).toBeVisible();
});

test("the session panel minimizes to a status pill and restores", async ({ page }) => {
  // Joining a nonexistent doc drives the widget into a real non-idle state
  // (connecting → error) without needing a live session.
  await page.goto("/?d=test-doc-id&token=test-token");
  const dialog = page.locator("dialog", { hasText: "Join live session" });
  await dialog.getByPlaceholder("your name").fill("Will");
  await dialog.getByRole("button", { name: "Join" }).click();

  // The floating panel appears (connecting or error, depending on timing).
  const panel = page.getByLabel("Live session");
  await expect(panel).toBeVisible();

  // Minimize → compact pill; panel gone.
  await page.getByLabel("Minimize session panel").click();
  await expect(panel).not.toBeVisible();
  const pill = page.getByLabel("Expand session panel");
  await expect(pill).toBeVisible();

  // Restore.
  await pill.click();
  await expect(page.getByLabel("Live session")).toBeVisible();
});
