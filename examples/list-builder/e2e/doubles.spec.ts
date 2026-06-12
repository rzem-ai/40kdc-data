import { test, expect, type Page } from '@playwright/test';

/**
 * Doubles flow: build a solo army, flip the header toggle into the team
 * workspace, build Army B on its own tab, watch the team-level advisories
 * react, save to the library (badge + reopen), and round-trip the composed
 * #dbl= share link. Downloads are stubbed out (saving auto-downloads both
 * armies' roster-json, which would otherwise hang a headless run).
 */

const pointsSelect = (page: Page) =>
	page.locator('label', { hasText: 'Points / player' }).locator('select');
const dispositionSelect = (page: Page) =>
	page.locator('label', { hasText: 'Team disposition' }).locator('select');
/** The army editor's own header selects (scoped by label so the doubles team
 *  header's selects can't shadow them). */
const factionSelect = (page: Page) =>
	page.locator('label', { hasText: 'Faction' }).locator('select');
const detachmentSelect = (page: Page) =>
	page.locator('label', { hasText: 'Detachments' }).locator('select');

async function addUnit(page: Page, name: string) {
	await page.getByPlaceholder('Search units or keywords…').fill(name);
	await page.locator('li button', { hasText: name }).first().click();
}

async function startSoloArmy(page: Page) {
	await page.goto('/');
	await page.getByRole('button', { name: '+ New list' }).click();
	await page.getByPlaceholder('My list').fill('Hammers');
	await factionSelect(page).selectOption('adeptus-astartes');
	// One detachment so the team-disposition options have a granted set.
	await detachmentSelect(page).selectOption('gladius-task-force');
	// An Epic Hero, to exercise the cross-army uniqueness check later.
	await addUnit(page, 'High Marshal Helbrecht');
	await expect(page.getByText('Helbrecht').nth(1)).toBeVisible();
}

test('solo → doubles: toggle, build both armies, team checks react, save + reopen', async ({ page }) => {
	await startSoloArmy(page);

	// Flip into the team workspace; the solo draft becomes Army A.
	await page.getByLabel('Doubles').check();
	await expect(page.getByPlaceholder('Our team')).toBeVisible();
	await expect(page.getByRole('tab', { name: /Army A/ })).toBeVisible();
	// Army A kept its units and got the per-player default ceiling.
	await expect(page.getByText('/ 1000').first()).toBeVisible();
	// Team advisories: no warlord yet. The disposition carried over from the
	// solo draft (its detachment forces one), so no disposition note.
	await expect(page.getByText('no team Warlord yet', { exact: false })).toBeVisible();
	await expect(dispositionSelect(page)).not.toHaveValue('');

	await page.getByPlaceholder('Our team').fill('Hammer Time');

	// Points per player: 750 re-pins both armies.
	await pointsSelect(page).selectOption('750');
	await expect(page.getByText('/ 750').first()).toBeVisible();

	// Build Army B on its own tab — a different faction → force of convenience.
	await page.getByRole('tab', { name: /Army B/ }).click();
	await page.getByPlaceholder('My list').fill('Bugs');
	await factionSelect(page).selectOption('tyranids');
	await addUnit(page, 'Hive Tyrant');
	await expect(page.getByText('Force of convenience')).toBeVisible();

	// Tab back: Army A's edits survived the remount.
	await page.getByRole('tab', { name: /Army A/ }).click();
	await expect(page.getByPlaceholder('My list')).toHaveValue('Hammers');
	await expect(page.getByText('Helbrecht').first()).toBeVisible();

	// Re-record the team disposition from the granted options.
	await dispositionSelect(page).selectOption({ index: 1 });
	await expect(page.getByText('no team Force Disposition', { exact: false })).toHaveCount(0);

	// Save: stub the download anchor clicks, then check the library row.
	await page.evaluate(() => {
		HTMLAnchorElement.prototype.click = function () {};
	});
	await page.getByRole('button', { name: 'Save to Library' }).click();
	const row = page.locator('li', { hasText: 'Hammer Time' });
	await expect(row).toBeVisible();
	await expect(row.getByText('Doubles · 750/player')).toBeVisible();

	// Reopen: both armies come back at the right level.
	await row.getByRole('button', { name: 'Edit' }).click();
	await expect(page.getByPlaceholder('Our team')).toHaveValue('Hammer Time');
	await expect(page.getByText('/ 750').first()).toBeVisible();
	await page.getByRole('tab', { name: /Army B/ }).click();
	await expect(page.getByPlaceholder('My list')).toHaveValue('Bugs');
	await expect(page.getByText('Hive Tyrant').first()).toBeVisible();
});

test('cross-army epic hero warns; doubles share link round-trips', async ({ page }) => {
	await startSoloArmy(page);
	await page.getByLabel('Doubles').check();

	// Same Epic Hero in Army B → team-level warning; same faction → unified.
	await page.getByRole('tab', { name: /Army B/ }).click();
	await factionSelect(page).selectOption('adeptus-astartes');
	await addUnit(page, 'High Marshal Helbrecht');
	await expect(page.getByText('is in both armies', { exact: false })).toBeVisible();
	await expect(page.getByText('Unified force')).toBeVisible();

	// Share: grab the composed link from the clipboard and reopen it cold.
	await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.getByRole('button', { name: 'Copy share link' }).click();
	await expect(page.getByText('Doubles share link copied')).toBeVisible();
	const url = await page.evaluate(() => navigator.clipboard.readText());
	expect(url).toContain('#dbl=');

	await page.goto(url);
	await expect(page.getByPlaceholder('Our team')).toBeVisible();
	await expect(page.getByText('is in both armies', { exact: false })).toBeVisible();
	await page.getByRole('tab', { name: /Army B/ }).click();
	await expect(page.getByText('Helbrecht').first()).toBeVisible();
});

test('toggling doubles off keeps Army A as the solo draft', async ({ page }) => {
	await startSoloArmy(page);
	await page.getByLabel('Doubles').check();
	await expect(page.getByPlaceholder('Our team')).toBeVisible();
	// Army B is empty, so no confirm dialog fires.
	await page.getByLabel('Doubles').uncheck();
	await expect(page.getByPlaceholder('My list')).toHaveValue('Hammers');
	await expect(page.getByText('Helbrecht').first()).toBeVisible();
	// Solo ceiling restored (strike-force default).
	await expect(page.getByText('/ 2000').first()).toBeVisible();
});
