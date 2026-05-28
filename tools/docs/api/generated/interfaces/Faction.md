[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Faction

# Interface: Faction

Defined in: [generated.ts:588](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L588)

A playable faction or sub-faction.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "faction".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:589](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L589)

***

### name

> **name**: `string`

Defined in: [generated.ts:590](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L590)

***

### parent\_faction\_id?

> `optional` **parent\_faction\_id?**: `string` \| `null`

Defined in: [generated.ts:591](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L591)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:592](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L592)

***

### keywords?

> `optional` **keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:593](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L593)

***

### aliases?

> `optional` **aliases?**: `string`[]

Defined in: [generated.ts:594](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L594)

***

### faction\_rule\_id?

> `optional` **faction\_rule\_id?**: `string` \| `null`

Defined in: [generated.ts:598](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L598)

Reference to the faction-wide ability (e.g., Oath of Moment)
