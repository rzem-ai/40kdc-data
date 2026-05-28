[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / EngineContext

# Type Alias: EngineContext

> **EngineContext** = `object`

Defined in: [cruncher/buffs.ts:81](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L81)

Shared engine context. Carries the phase plus a few attacker/target flags
the keyword translator and the resolver both need. The engine fills it from
its `EngineInput.context` plus the unit-keyword unions; the resolver reads
only the subset relevant to its `applicableWhen` checks.

## Properties

### phase

> **phase**: [`Phase`](../../generated/type-aliases/Phase.md)

Defined in: [cruncher/buffs.ts:82](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L82)

***

### attackerStationary?

> `optional` **attackerStationary?**: `boolean`

Defined in: [cruncher/buffs.ts:84](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L84)

Attacker has not moved this turn — Heavy fires its +1 to hit.

***

### withinHalfRange?

> `optional` **withinHalfRange?**: `boolean`

Defined in: [cruncher/buffs.ts:86](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L86)

Within half the weapon's range — Melta / Rapid Fire fire.

***

### attackerInCover?

> `optional` **attackerInCover?**: `boolean`

Defined in: [cruncher/buffs.ts:88](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L88)

Attacker benefits from cover (mostly informational; cover applies to defenders).

***

### targetInCover?

> `optional` **targetInCover?**: `boolean`

Defined in: [cruncher/buffs.ts:90](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L90)

Target is in cover — the resolver flips on `cover`, the engine applies +1 to save.

***

### attackerKeywords?

> `optional` **attackerKeywords?**: `ReadonlyArray`\<`string`\>

Defined in: [cruncher/buffs.ts:92](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L92)

Attacker keywords (union of unit.keywords + faction_keywords), lower-cased.

***

### targetKeywords?

> `optional` **targetKeywords?**: `ReadonlyArray`\<`string`\>

Defined in: [cruncher/buffs.ts:94](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L94)

Target keywords (union of unit.keywords + faction_keywords), lower-cased.
