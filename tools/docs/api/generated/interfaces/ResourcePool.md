[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ResourcePool

# Interface: ResourcePool

Defined in: [generated.ts:1183](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1183)

A faction's resource system (Miracle Dice, Pain tokens, Blessings dice pool, etc.).

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "resource-pool".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1184](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1184)

***

### name

> **name**: `string`

Defined in: [generated.ts:1185](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1185)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:1186](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1186)

***

### pool\_type

> **pool\_type**: `"token"` \| `"dice-pool"` \| `"counter"`

Defined in: [generated.ts:1187](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1187)

***

### generation?

> `optional` **generation?**: `object`[]

Defined in: [generated.ts:1188](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1188)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### condition

> **condition**: [`AbilityCondition2`](../type-aliases/AbilityCondition2.md)

#### amount

> **amount**: [`StatValue`](../type-aliases/StatValue.md)

***

### max\_size?

> `optional` **max\_size?**: `number` \| `null`

Defined in: [generated.ts:1193](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1193)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1194](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1194)
