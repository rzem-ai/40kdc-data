[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ResourcePool

# Interface: ResourcePool

Defined in: [generated.ts:1416](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1416)

A faction's resource system (Miracle Dice, Pain tokens, Blessings dice pool, etc.).

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "resource-pool".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1417](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1417)

***

### name

> **name**: `string`

Defined in: [generated.ts:1418](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1418)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:1419](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1419)

***

### pool\_type

> **pool\_type**: `"token"` \| `"dice-pool"` \| `"counter"`

Defined in: [generated.ts:1420](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1420)

***

### generation?

> `optional` **generation?**: `object`[]

Defined in: [generated.ts:1421](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1421)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### condition

> **condition**: [`AbilityCondition2`](../type-aliases/AbilityCondition2.md)

#### amount

> **amount**: [`StatValue`](../type-aliases/StatValue.md)

***

### max\_size?

> `optional` **max\_size?**: `number` \| `null`

Defined in: [generated.ts:1426](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1426)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1427](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1427)
