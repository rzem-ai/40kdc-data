[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Unit

# Interface: Unit

Defined in: [generated.ts:1022](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1022)

A unit datasheet entry with stat profiles and point costs.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "unit".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1023](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1023)

***

### name

> **name**: `string`

Defined in: [generated.ts:1024](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1024)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:1025](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1025)

***

### role?

> `optional` **role?**: `"character"` \| `"battleline"` \| `"dedicated-transport"` \| `"fortification"` \| `"allied"` \| `"epic-hero"`

Defined in: [generated.ts:1029](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1029)

Battlefield role from the datasheet header. Unit types (Infantry, Vehicle, etc.) belong in keywords.

***

### attachment\_role?

> `optional` **attachment\_role?**: `"leader"` \| `"support"` \| `null`

Defined in: [generated.ts:1033](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1033)

Character attachment role (11e). 'support' implies the unit is only legal when attached to a host unit (cannot be taken solo); 'leader' is valid as a standalone list entry. null/absent for non-attaching units.

***

### profiles

> **profiles**: \[\{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \}, ...\{ name?: string; M: StatValue; T: number; W: number; Sv: number; invuln\_sv?: number \| null; Ld: number; OC: number; \[k: string\]: unknown \}\[\]\]

Defined in: [generated.ts:1037](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1037)

#### Min Items

1

***

### points?

> `optional` **points?**: `object`[]

Defined in: [generated.ts:1067](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1067)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### models

> **models**: `number`

#### cost

> **cost**: `number`

***

### points\_provisional?

> `optional` **points\_provisional?**: `boolean`

Defined in: [generated.ts:1075](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1075)

True when point costs are carried over provisionally (e.g. seeded from a prior edition during migration) and not yet confirmed against the current dataslate.

***

### keywords?

> `optional` **keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:1076](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1076)

***

### faction\_keywords?

> `optional` **faction\_keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:1077](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1077)

***

### base\_size\_mm?

> `optional` **base\_size\_mm?**: \{\[`k`: `string`\]: `unknown`; `shape`: `"round"` \| `"oval"`; `diameter?`: `number`; `width?`: `number`; `length?`: `number`; \} \| `null`

Defined in: [generated.ts:1078](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1078)

***

### model\_count?

> `optional` **model\_count?**: `object`

Defined in: [generated.ts:1085](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1085)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### min

> **min**: `number`

#### max

> **max**: `number`

***

### weapon\_ids?

> `optional` **weapon\_ids?**: `string`[]

Defined in: [generated.ts:1090](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1090)

***

### ability\_ids?

> `optional` **ability\_ids?**: `string`[]

Defined in: [generated.ts:1091](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1091)

***

### transport\_capacity?

> `optional` **transport\_capacity?**: \{ `capacity`: `number`; `keyword_restrictions?`: [`KeywordList`](../type-aliases/KeywordList.md) \| `null`; `exclusion_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md) \| `null`; \} \| `null`

Defined in: [generated.ts:1092](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1092)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1097](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1097)

***

### is\_legend?

> `optional` **is\_legend?**: `boolean`

Defined in: [generated.ts:1098](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1098)
