import { defineConfig } from '@playwright/test';

/**
 * E2E harness for the list-builder flows vitest can't reach — the Doubles
 * workspace is a tabbed two-army UI whose team logic is unit tested but whose
 * flow (toggle from solo, tab switching without losing edits, save, the
 * #dbl= share round-trip) only exists in the browser.
 */
export default defineConfig({
	testDir: './e2e',
	timeout: 30_000,
	use: {
		baseURL: 'http://localhost:4292',
		trace: 'retain-on-failure',
	},
	webServer: {
		command: 'npm run dev -- --port 4292 --strictPort',
		url: 'http://localhost:4292',
		reuseExistingServer: !process.env.CI,
	},
});
