# Open todos

Carried forward from session handoffs so future sessions read this file instead of a paste.

- [ ] **#4 Disambiguate shared-unit dropdown labels** in Salvo (a chassis shared across factions currently appears once per faction with no way to tell them apart in the dropdown).
- [ ] **#5 Layout cleanup** — abilities pane / target pane spacing.
- [ ] **#6 Empty-state polish** across panes.
- [ ] **#8 Holistic `/impeccable` craft pass** on the SPA. Gate now reduced to #4–#6 (#7 closed).
- [ ] **#12 Add Python and R packages** — this is free to do and we might as well. _(Added by a parallel session, 2026-05-28.)_

## Recently closed

- [x] ~~**#3 Expand DSL→Buff translator** — compound AND/OR, `timing-is`, AP stat-mod.~~ Shipped to `main@origin` as `7a148c8b feat: salvo DSL translator — compound conditions, timing-is, AP stat-mod`.
- [x] ~~**#7 Roster import error states** — make failure modes legible.~~ Closed by **#9** below. `tryImportRoster` returns a discriminated `ImportResult` with per-adapter `trials[]`; Salvo renders a headline + expandable per-format trial list in `import-pane.svelte`.
- [x] ~~**#9 Auto-detect import format** across the 5 importers.~~ In flight on `wnmitch/try-import-roster` (rev `rpotklql`, uncommitted). New `tryImportRoster(input, opts) → ImportResult` decodes ListForge URL/base64/gzip + JSON + raw text and greedily dispatches to the first matching adapter. Mirrored in Rust (`try_import_roster`). Required tightening `listForgeAdapter.matches` to exclude NewRecruit-signed payloads — the "greedy + perfect match" contract is now guarded by a matcher-disjointness invariant test on both sides. Per-fixture format-detect assertion added to the TS + Rust conformance runners.
- [x] ~~**#10 Data: "The Betrayer" `condition.type === undefined`**~~ — auto-resolved when #3 shipped. The condition was a valid `and`-compound, not malformed data.
- [x] ~~**#11 Triage local divergence on `wnmitch/salvo-m4-pages`**~~ — verified parallel-session work, 163 files / 8267 insertions, all coherent. Touches zero translator/cruncher/buff/engine files. Footnotes for whoever picks it up:
  - The bookmark name `salvo-m4-pages` is misleading — the commit is parented on `salvo-m5-link-abilities`, so rename to e.g. `wnmitch/salvo-m6-stratagems` before push to avoid clobbering `salvo-m4-pages@origin`.
  - The parallel session's `examples/salvo/src/lib/abilities-pane.svelte` predates the EngineContext threading (still imports only `EligibleAbility`, still calls `getBuffs`). Rebasing onto current state must preserve the `describeBuffs`/EngineContext version from `salvo-abilities-context` (commit 9947ccce).
