[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Stratagem

# Interface: Stratagem

Defined in: [generated.ts:879](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L879)

A CP-costed ability usable during specific game phases.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "stratagem".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:880](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L880)

***

### name

> **name**: `string`

Defined in: [generated.ts:881](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L881)

***

### category

> **category**: `"core"` \| `"detachment"`

Defined in: [generated.ts:885](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L885)

Whether this is a universal core stratagem or tied to a specific detachment

***

### type

> **type**: `"battle-tactic"` \| `"strategic-ploy"` \| `"epic-deed"` \| `"wargear"`

Defined in: [generated.ts:889](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L889)

GW-printed stratagem category from the card

***

### detachment\_id?

> `optional` **detachment\_id?**: `string` \| `null`

Defined in: [generated.ts:893](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L893)

Null for core stratagems

***

### cp\_cost

> **cp\_cost**: `number`

Defined in: [generated.ts:894](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L894)

***

### phases

> **phases**: [`PhaseList`](../type-aliases/PhaseList.md)

Defined in: [generated.ts:895](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L895)

***

### player\_turn

> **player\_turn**: [`PlayerTurn`](../type-aliases/PlayerTurn.md)

Defined in: [generated.ts:896](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L896)

***

### timing

> **timing**: `"once-per-phase"` \| `"once-per-turn"` \| `"once-per-battle"` \| `"unlimited"`

Defined in: [generated.ts:897](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L897)

***

### target\_restrictions?

> `optional` **target\_restrictions?**: \{ `required_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `excluded_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `notes?`: `string`; \} \| `null`

Defined in: [generated.ts:898](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L898)

***

### ability\_id?

> `optional` **ability\_id?**: `string` \| `null`

Defined in: [generated.ts:903](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L903)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:904](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L904)
