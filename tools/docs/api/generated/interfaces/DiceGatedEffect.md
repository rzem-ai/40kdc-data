[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DiceGatedEffect

# Interface: DiceGatedEffect

Defined in: [generated.ts:1188](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1188)

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "dice-gated-effect".

## Indexable

> \[`k`: `string`\]: `unknown`

## Properties

### type

> **type**: `"dice-gated"`

Defined in: [generated.ts:1189](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1189)

***

### dice

> **dice**: `string`

Defined in: [generated.ts:1193](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1193)

Dice expression, e.g. 'D6', '2D6'

***

### threshold

> **threshold**: `number` \| `"leadership"` \| `"toughness"` \| `"save"`

Defined in: [generated.ts:1197](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1197)

Fixed threshold or model characteristic to compare against

***

### comparison?

> `optional` **comparison?**: `"gte"` \| `"lte"` \| `"gt"` \| `"lt"` \| `"eq"`

Defined in: [generated.ts:1198](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1198)

***

### on\_success?

> `optional` **on\_success?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:1199](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1199)

***

### on\_fail?

> `optional` **on\_fail?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:1200](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1200)
