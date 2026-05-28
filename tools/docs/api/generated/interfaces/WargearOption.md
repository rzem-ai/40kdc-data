[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / WargearOption

# Interface: WargearOption

Defined in: [generated.ts:1106](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1106)

A weapon substitution option available to models within a unit.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "wargear-option".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1107](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1107)

***

### unit\_id

> **unit\_id**: `string`

Defined in: [generated.ts:1108](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1108)

***

### model\_constraint?

> `optional` **model\_constraint?**: \{ `model_name?`: `string`; `per_n_models?`: `number`; `max_count?`: `number`; \} \| `null`

Defined in: [generated.ts:1109](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1109)

***

### replaces

> **replaces**: \[`string`, `...string[]`\]

Defined in: [generated.ts:1119](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1119)

Weapon IDs being removed

#### Min Items

1

***

### replacement

> **replacement**: \[`string`, `...string[]`\]

Defined in: [generated.ts:1125](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1125)

Weapon IDs being added

#### Min Items

1

***

### is\_free?

> `optional` **is\_free?**: `boolean`

Defined in: [generated.ts:1126](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1126)

***

### additional\_cost?

> `optional` **additional\_cost?**: `number` \| `null`

Defined in: [generated.ts:1127](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1127)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1128](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1128)
