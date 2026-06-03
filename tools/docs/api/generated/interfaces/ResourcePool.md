[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ResourcePool

# Interface: ResourcePool

Defined in: [generated.ts:1487](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1487)

A faction's resource system (Miracle Dice, Pain tokens, Blessings dice pool, etc.).

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "resource-pool".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1488](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1488)

***

### name

> **name**: `string`

Defined in: [generated.ts:1489](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1489)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:1490](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1490)

***

### pool\_type

> **pool\_type**: `"token"` \| `"dice-pool"` \| `"counter"`

Defined in: [generated.ts:1491](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1491)

***

### generation?

> `optional` **generation?**: `object`[]

Defined in: [generated.ts:1492](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1492)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### condition

> **condition**: [`AbilityCondition2`](../type-aliases/AbilityCondition2.md)

#### amount

> **amount**: [`StatValue`](../type-aliases/StatValue.md)

***

### max\_size?

> `optional` **max\_size?**: `number` \| `null`

Defined in: [generated.ts:1497](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1497)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1498](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1498)
