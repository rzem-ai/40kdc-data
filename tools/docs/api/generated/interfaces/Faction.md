[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Faction

# Interface: Faction

Defined in: [generated.ts:358](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L358)

A playable faction or sub-faction.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "faction".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:359](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L359)

***

### name

> **name**: `string`

Defined in: [generated.ts:360](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L360)

***

### parent\_faction\_id?

> `optional` **parent\_faction\_id?**: `string` \| `null`

Defined in: [generated.ts:361](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L361)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:362](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L362)

***

### keywords?

> `optional` **keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:363](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L363)

***

### aliases?

> `optional` **aliases?**: `string`[]

Defined in: [generated.ts:364](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L364)

***

### faction\_rule\_id?

> `optional` **faction\_rule\_id?**: `string` \| `null`

Defined in: [generated.ts:368](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L368)

Reference to the faction-wide ability (e.g., Oath of Moment)
