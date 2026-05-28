# Open todos

Carried forward from session handoffs so future sessions read this file instead of a paste.

- [ ] **#3 Expand DSL→Buff translator** — compound AND/OR, `timing-is`, AP stat-mod. In flight on `wnmitch/salvo-dsl-compound-timing-ap`.
- [ ] **#4 Disambiguate shared-unit dropdown labels** in Salvo (a chassis shared across factions currently appears once per faction with no way to tell them apart in the dropdown).
- [ ] **#5 Layout cleanup** — abilities pane / target pane spacing.
- [ ] **#6 Empty-state polish** across panes.
- [ ] **#7 Roster import error states** — make failure modes legible.
- [ ] **#8 Holistic `/impeccable` craft pass** on the SPA. Gates on #4–#7.
- [ ] **#9 Auto-detect import format** across the 5 importers so the user doesn't pick a format.
- [ ] **#10 Data: "The Betrayer" `condition.type === undefined`** — **resolved by #3 compound dispatch**. The condition was a valid `and`-compound, not malformed data; the previous translator only switched on `condition.type` and reported the missing `type` as a diagnostic. Close once #3 ships.
- [x] ~~**#11 Triage local divergence on `wnmitch/salvo-m4-pages`**~~ — closed. Verified parallel-session work, 163 files / 8267 insertions, all coherent (stratagem schema, `_core/base-abilities.json` + `_core/base-stratagems.json`, test fixtures, Rust + TS codegen regen, full TypeDoc rebuild, early Salvo updates). Touches zero translator/cruncher/buff/engine files, so no collision with #3. Footnotes for whoever picks it up:
  - The bookmark name `salvo-m4-pages` is misleading — the commit is parented on `salvo-m5-link-abilities`, so rename to e.g. `wnmitch/salvo-m6-stratagems` before push to avoid clobbering `salvo-m4-pages@origin`.
  - The parallel session's `examples/salvo/src/lib/abilities-pane.svelte` predates the EngineContext threading (still imports only `EligibleAbility`, still calls `getBuffs`). Rebasing onto current state must preserve the `describeBuffs`/EngineContext version from `salvo-abilities-context` (commit 9947ccce).
