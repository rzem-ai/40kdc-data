[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / AbilityDSLEntry

# Interface: AbilityDSLEntry

Defined in: [generated.ts:1329](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1329)

Community-authored structured representation of what a game ability does. NOT GW text.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "ability".

## Properties

### ability\_id

> **ability\_id**: `string`

Defined in: [generated.ts:1330](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1330)

***

### name

> **name**: `string`

Defined in: [generated.ts:1331](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1331)

***

### authored\_by

> **authored\_by**: `string`

Defined in: [generated.ts:1332](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1332)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1333](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1333)

***

### version?

> `optional` **version?**: `string`

Defined in: [generated.ts:1334](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1334)

***

### supersedes?

> `optional` **supersedes?**: `string` \| `null`

Defined in: [generated.ts:1335](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1335)

***

### unit\_ids?

> `optional` **unit\_ids?**: `string`[]

Defined in: [generated.ts:1336](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1336)

***

### faction\_id?

> `optional` **faction\_id?**: `string` \| `null`

Defined in: [generated.ts:1340](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1340)

For faction-type abilities, the faction this rule belongs to

***

### detachment\_id?

> `optional` **detachment\_id?**: `string` \| `null`

Defined in: [generated.ts:1344](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1344)

For detachment/enhancement/stratagem-type abilities, the associated detachment

***

### ability\_type?

> `optional` **ability\_type?**: `"stratagem"` \| `"enhancement"` \| `"unit"` \| `"core"` \| `"detachment"` \| `"faction"`

Defined in: [generated.ts:1345](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1345)

***

### behavior?

> `optional` **behavior?**: `"passive"` \| `"activated"` \| `"reactive"` \| `"aura"`

Defined in: [generated.ts:1349](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1349)

How this ability interacts with the game flow — not a runtime predicate

***

### effect

> **effect**: [`AbilityEffect1`](../type-aliases/AbilityEffect1.md)

Defined in: [generated.ts:1350](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1350)

***

### scope

> **scope**: [`AbilityScope`](AbilityScope.md)

Defined in: [generated.ts:1351](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1351)

***

### interactions?

> `optional` **interactions?**: `object`[]

Defined in: [generated.ts:1352](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1352)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### ability\_ref

> **ability\_ref**: `string`

#### type

> **type**: `"conflicts-with"` \| `"combos-with"` \| `"superseded-by"` \| `"requires"` \| `"replaces"`

#### notes?

> `optional` **notes?**: `string`

***

### disputed?

> `optional` **disputed?**: `boolean`

Defined in: [generated.ts:1358](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1358)

***

### dispute\_notes?

> `optional` **dispute\_notes?**: `string`

Defined in: [generated.ts:1359](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1359)

***

### community\_notes?

> `optional` **community\_notes?**: `string`

Defined in: [generated.ts:1360](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1360)
