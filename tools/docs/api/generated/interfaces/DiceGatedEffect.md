[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DiceGatedEffect

# Interface: DiceGatedEffect

Defined in: [generated.ts:724](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L724)

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "dice-gated-effect".

## Indexable

> \[`k`: `string`\]: `unknown`

## Properties

### type

> **type**: `"dice-gated"`

Defined in: [generated.ts:725](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L725)

***

### dice

> **dice**: `string`

Defined in: [generated.ts:729](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L729)

Dice expression, e.g. 'D6', '2D6'

***

### threshold

> **threshold**: `number` \| `"leadership"` \| `"toughness"` \| `"save"`

Defined in: [generated.ts:733](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L733)

Fixed threshold or model characteristic to compare against

***

### comparison?

> `optional` **comparison?**: `"gte"` \| `"lte"` \| `"gt"` \| `"lt"` \| `"eq"`

Defined in: [generated.ts:734](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L734)

***

### on\_success?

> `optional` **on\_success?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:735](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L735)

***

### on\_fail?

> `optional` **on\_fail?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:736](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L736)
