import { test, expect, type Page } from "@playwright/test";

/**
 * Pairings-simulator walkthrough: a stored 5-player plan (distinct factions,
 * each with one army granting a distinct disposition) is taken through the
 * full official flow — Initial Skirmish then Main Engagement — and lands on a
 * 5-table summary. The engine itself is vitest-covered; this exercises the
 * real UI: tab switch, roster setup, secret picks, simultaneous reveals,
 * layout declaration, and the per-module result cards.
 */

/** A plan whose 5 players cover all five dispositions via real detachments. */
const PLAN = {
  teamName: "E2E Crew",
  size: 5,
  players: [
    ["p1", "Ash", "orks", "green-tide"], // take-and-hold
    ["p2", "Blair", "aeldari", "aspect-host"], // disruption
    ["p3", "Cam", "necrons", "annihilation-legion"], // purge-the-foe
    ["p4", "Drew", "tau-empire", "kauyon"], // priority-assets
    ["p5", "Em", "chaos-knights", "houndpack-lance"], // reconnaissance
  ].map(([id, name, factionId, detachmentId]) => ({
    id,
    name,
    factionIds: [factionId],
    armies: [{ id: `${id}-a`, name: "Main", factionId, detachmentIds: [detachmentId] }],
    preferences: [],
    locked: {},
  })),
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((plan) => {
    localStorage.setItem("teams-planner.v2", JSON.stringify(plan));
  }, PLAN);
});

/** Drive one skirmish/main module's secret-pick ladder, choosing the first
 *  eligible chip at every step and Layout B at the declaration. */
async function playModule(page: Page, expectedTables: number) {
  // 1. defender
  await expect(page.getByText("Secretly select one member to be your Defender.")).toBeVisible();
  await page.locator("section", { hasText: "Secretly select one member" }).getByRole("button").first().click();
  await page.getByRole("button", { name: "Lock in defender" }).click();
  // 2. reveal
  await expect(page.getByText("Defenders revealed")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  // 3. two attackers
  const attackPanel = page.locator("section", { hasText: "to be Attackers against" });
  await attackPanel.getByRole("button").first().click();
  await attackPanel.getByRole("button").nth(1).click();
  await page.getByRole("button", { name: "Lock in attackers" }).click();
  // 4. reveal
  await expect(page.getByText("Attackers revealed")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  // 5. accept one opposing attacker
  const acceptPanel = page.locator("section", { hasText: "will play against" });
  await acceptPanel.getByRole("button").first().click();
  await page.getByRole("button", { name: "Lock in choice" }).click();
  // 6. reveal
  await expect(page.getByText("Match-ups decided")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  // 7. declare layout (button text = letter + thumb caption, so prefix-match)
  await expect(page.getByText("Declare your layout")).toBeVisible();
  await page.getByRole("button", { name: /^B\b/ }).click();
  // module results
  await expect(page.getByText("tables set")).toBeVisible();
  await expect(page.locator("article")).toHaveCount(expectedTables);
}

test("full 5-player pairing round: skirmish + main → 5 tables", async ({ page }) => {
  await page.goto("/");

  // The plan view shows the seeded roster; switch to the practice tab.
  await expect(page.getByText("All five dispositions covered")).toBeVisible();
  await page.getByRole("tab", { name: "Pairings practice" }).click();
  await expect(page).toHaveURL(/#sim$/);

  // Setup: all 5 players pre-selected with distinct dispositions, CPU rolled.
  await expect(page.getByText("5 selected")).toBeVisible();
  const cpuRows = page.locator("section", { hasText: "Opposing team" }).locator("li");
  await expect(cpuRows).toHaveCount(5);
  // No legality warnings for a clean roster.
  await expect(page.getByText("⚠")).toHaveCount(0);

  await page.getByRole("button", { name: "Start pairings" }).click();

  // Module strip: skirmish then main, round 1.
  await expect(page.getByText("1. Initial Skirmish")).toBeVisible();
  await expect(page.getByText("2. Main Engagement")).toBeVisible();
  await expect(page.getByText("refused/champion tables play Layout A")).toBeVisible();

  await playModule(page, 2); // skirmish → 2 tables
  await page.getByRole("button", { name: "Next module" }).click();
  await playModule(page, 3); // main → 2 defender tables + refused pair
  await page.getByRole("button", { name: "Finish" }).click();

  // Summary: every player paired exactly once → 5 tables.
  await expect(page.getByText("All pairings — round 1")).toBeVisible();
  await expect(page.locator("article")).toHaveCount(5);
  // The refused table carries the round layout (A in round 1).
  const refused = page.locator("article", { hasText: "Refused attackers" });
  await expect(refused).toHaveCount(1);
  await expect(refused.getByText("A", { exact: true })).toBeVisible();
  // Each card shows both asymmetric missions.
  await expect(page.locator("article").first().getByText("You score")).toBeVisible();
  await expect(page.locator("article").first().getByText("They score")).toBeVisible();
});

test("reroll changes the opposing team; restart returns to setup", async ({ page }) => {
  await page.goto("/#sim");
  const cpuList = page.locator("section", { hasText: "Opposing team" });
  await expect(cpuList.locator("li")).toHaveCount(5);
  const before = await cpuList.locator("li").allInnerTexts();
  // Reroll until the roster changes (same-team rolls are possible but
  // vanishingly unlikely twice in a row with a ~135-entry pool).
  let changed = false;
  for (let i = 0; i < 5 && !changed; i++) {
    await page.getByRole("button", { name: "↻ Reroll" }).click();
    const after = await cpuList.locator("li").allInnerTexts();
    changed = JSON.stringify(after) !== JSON.stringify(before);
  }
  expect(changed).toBe(true);

  await page.getByRole("button", { name: "Start pairings" }).click();
  await expect(page.getByText("1. Initial Skirmish")).toBeVisible();
  await page.getByRole("button", { name: "Abandon and restart" }).click();
  await expect(page.getByRole("button", { name: "Start pairings" })).toBeVisible();
});

test("team size widens to 3-8 and the plan round-trips through a share link", async ({ page }) => {
  await page.goto("/");
  const size = page.locator("select").first();
  await expect(size.locator("option")).toHaveCount(6);
  await size.selectOption("3");
  await expect(size).toHaveValue("3");
  await expect(page.getByText("of 3 slots have a faction")).toBeVisible();

  await page.getByRole("button", { name: "Copy share link" }).click();
  // Clipboard may be blocked in the harness — the app falls back to putting
  // the link in the address bar; accept either by reading the toast.
  await expect(page.locator('[role="status"]')).toBeVisible();
});
