[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Weapon

# Interface: Weapon

Defined in: [generated.ts:1258](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1258)

A weapon entry with one or more stat profiles (e.g., standard and overcharge modes).

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "weapon".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1259](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1259)

***

### name

> **name**: `string`

Defined in: [generated.ts:1260](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1260)

***

### type

> **type**: `"ranged"` \| `"melee"`

Defined in: [generated.ts:1261](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1261)

***

### profiles

> **profiles**: \[\{ `name`: `string`; `range?`: `number` \| `"Melee"`; `stats`: \{\[`k`: `string`\]: `unknown`; `A`: [`StatValue`](../type-aliases/StatValue.md); `BS?`: `number` \| `null`; `WS?`: `number` \| `null`; `S`: [`StatValue`](../type-aliases/StatValue.md); `AP`: `number`; `D`: [`StatValue`](../type-aliases/StatValue.md); \}; `keywords?`: `object`[]; \}, ...\{ name: string; range?: number \| "Melee"; stats: \{ A: StatValue; BS?: number \| null; WS?: number \| null; S: StatValue; AP: number; D: StatValue; \[k: string\]: unknown \}; keywords?: \{ keyword\_id: string; parameters?: \{ value?: StatValue; target\_keyword?: string; threshold?: number \} \}\[\] \}\[\]\]

Defined in: [generated.ts:1265](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1265)

#### Min Items

1

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1321](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1321)
