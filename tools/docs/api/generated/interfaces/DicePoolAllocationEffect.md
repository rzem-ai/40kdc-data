[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DicePoolAllocationEffect

# Interface: DicePoolAllocationEffect

Defined in: [generated.ts:753](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L753)

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "dice-pool-allocation-effect".

## Indexable

> \[`k`: `string`\]: `unknown`

## Properties

### type

> **type**: `"dice-pool-allocation"`

Defined in: [generated.ts:754](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L754)

***

### pool

> **pool**: `object`

Defined in: [generated.ts:755](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L755)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### count

> **count**: `number`

#### die

> **die**: `string`

***

### max\_activations

> **max\_activations**: `number`

Defined in: [generated.ts:760](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L760)

***

### options

> **options**: \[\{\[`k`: `string`\]: `unknown`; `name`: `string`; `requirement`: \{\[`k`: `string`\]: `unknown`; `type`: `"pair"` \| `"triple"` \| `"single"` \| `"run"`; `min_value`: `number`; \}; `effect`: [`EffectNode`](../type-aliases/EffectNode.md); \}, ...\{ name: string; requirement: \{ type: "pair" \| "triple" \| "single" \| "run"; min\_value: number; \[k: string\]: unknown \}; effect: EffectNode; \[k: string\]: unknown \}\[\]\]

Defined in: [generated.ts:764](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L764)

#### Min Items

1
