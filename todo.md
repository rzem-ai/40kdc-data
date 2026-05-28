# Open todos

Carried forward from session handoffs so future sessions read this file instead of a paste.

- [ ] **#12 Add Python and R packages** — this is free to do and we might as well. _(Added by a parallel session, 2026-05-28.)_

## Recently closed

- [x] ~~**#4 Disambiguate shared-unit dropdown labels**~~ — `attacker-pane.svelte` and `target-pane.svelte` now derive a Set of duplicate names per dropdown and append `· <faction>` only when the unit name is ambiguous. Captains stay as "Captain", Hellbrute becomes "Hellbrute · Chaos Space Marines" / "Hellbrute · World Eaters".
- [x] ~~**#5 Layout cleanup**~~ — superseded by the layout restructure under #8. Old 3-column named-area grid replaced with header + setup-sidebar + canvas + tools-sidebar pattern, and ad-hoc spacing across `app.css` rolled into a `--space-1..6` scale.
- [x] ~~**#6 Empty-state polish**~~ — new `EmptyState.svelte` component centralizes the muted-recessed-card pattern; all five panes migrated; missing states added for attacker-pane (no weapons in phase) and import-pane (helper caption).
- [x] ~~**#8 Holistic `/impeccable` craft pass**~~ — Salvo's visual language now mirrors `~/bevy-deploy-helper` (shadowboxing): industrial near-black palette with teal accent, Barlow Condensed headings + Barlow body + JetBrains Mono numerics, signature inset rim-lit shadows on every elevated surface, segmented-control tab strip, projection table treated as hero (sticky head, hovered rows, mono numerics), unified focus rings, thin custom scrollbars. Four-commit sequence on main: `refactor: salvo design tokens` → `fix: salvo dropdown labels` → `feat: salvo unified EmptyState` → `feat: salvo shadowboxing layout`.
- [x] ~~**#3 Expand DSL→Buff translator** — compound AND/OR, `timing-is`, AP stat-mod.~~ Shipped to `main@origin` as `7a148c8b feat: salvo DSL translator — compound conditions, timing-is, AP stat-mod`.
- [x] ~~**#7 Roster import error states** — make failure modes legible.~~ Closed by **#9** below. `tryImportRoster` returns a discriminated `ImportResult` with per-adapter `trials[]`; Salvo renders a headline + expandable per-format trial list in `import-pane.svelte`.
- [x] ~~**#9 Auto-detect import format** across the 5 importers.~~ In flight on `wnmitch/try-import-roster` (rev `rpotklql`, uncommitted). New `tryImportRoster(input, opts) → ImportResult` decodes ListForge URL/base64/gzip + JSON + raw text and greedily dispatches to the first matching adapter. Mirrored in Rust (`try_import_roster`). Required tightening `listForgeAdapter.matches` to exclude NewRecruit-signed payloads — the "greedy + perfect match" contract is now guarded by a matcher-disjointness invariant test on both sides. Per-fixture format-detect assertion added to the TS + Rust conformance runners.
- [x] ~~**#10 Data: "The Betrayer" `condition.type === undefined`**~~ — auto-resolved when #3 shipped. The condition was a valid `and`-compound, not malformed data.
- [x] ~~**#11 Triage local divergence on `wnmitch/salvo-m4-pages`**~~ — verified parallel-session work, 163 files / 8267 insertions, all coherent. Touches zero translator/cruncher/buff/engine files. Footnotes for whoever picks it up:
  - The bookmark name `salvo-m4-pages` is misleading — the commit is parented on `salvo-m5-link-abilities`, so rename to e.g. `wnmitch/salvo-m6-stratagems` before push to avoid clobbering `salvo-m4-pages@origin`.
  - The parallel session's `examples/salvo/src/lib/abilities-pane.svelte` predates the EngineContext threading (still imports only `EligibleAbility`, still calls `getBuffs`). Rebasing onto current state must preserve the `describeBuffs`/EngineContext version from `salvo-abilities-context` (commit 9947ccce).
