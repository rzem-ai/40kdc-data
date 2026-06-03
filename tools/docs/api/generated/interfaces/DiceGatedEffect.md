[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DiceGatedEffect

# Interface: DiceGatedEffect

Defined in: [generated.ts:812](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L812)

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "dice-gated-effect".

## Indexable

> \[`k`: `string`\]: `unknown`

## Properties

### type

> **type**: `"dice-gated"`

Defined in: [generated.ts:813](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L813)

***

### dice

> **dice**: `string`

Defined in: [generated.ts:817](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L817)

Dice expression, e.g. 'D6', '2D6'

***

### threshold

> **threshold**: `number` \| `"leadership"` \| `"toughness"` \| `"save"`

Defined in: [generated.ts:821](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L821)

Fixed threshold or model characteristic to compare against

***

### comparison?

> `optional` **comparison?**: `"gte"` \| `"lte"` \| `"gt"` \| `"lt"` \| `"eq"`

Defined in: [generated.ts:822](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L822)

***

### on\_success?

> `optional` **on\_success?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:823](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L823)

***

### on\_fail?

> `optional` **on\_fail?**: [`EffectNode`](../type-aliases/EffectNode.md) \| `null`

Defined in: [generated.ts:824](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L824)
