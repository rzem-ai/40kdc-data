[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Unit

# Interface: Unit

Defined in: [generated.ts:937](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L937)

A unit datasheet entry with stat profiles and point costs.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "unit".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:938](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L938)

***

### name

> **name**: `string`

Defined in: [generated.ts:939](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L939)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:940](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L940)

***

### role?

> `optional` **role?**: `"character"` \| `"battleline"` \| `"dedicated-transport"` \| `"fortification"` \| `"allied"` \| `"epic-hero"`

Defined in: [generated.ts:944](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L944)

Battlefield role from the datasheet header. Unit types (Infantry, Vehicle, etc.) belong in keywords.

***

### attachment\_role?

> `optional` **attachment\_role?**: `"leader"` \| `"support"` \| `null`

Defined in: [generated.ts:948](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L948)

Character attachment role (11e). 'support' implies the unit is only legal when attached to a host unit (cannot be taken solo); 'leader' is valid as a standalone list entry. null/absent for non-attaching units.

***

### profiles

> **profiles**: \[\{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \}, ...\{ name?: string; M: StatValue; T: number; W: number; Sv: number; invuln\_sv?: number \| null; Ld: number; OC: number; \[k: string\]: unknown \}\[\]\]

Defined in: [generated.ts:952](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L952)

#### Min Items

1

***

### points?

> `optional` **points?**: `object`[]

Defined in: [generated.ts:982](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L982)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### models

> **models**: `number`

#### cost

> **cost**: `number`

***

### points\_provisional?

> `optional` **points\_provisional?**: `boolean`

Defined in: [generated.ts:990](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L990)

True when point costs are carried over provisionally (e.g. seeded from a prior edition during migration) and not yet confirmed against the current dataslate.

***

### keywords?

> `optional` **keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:991](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L991)

***

### faction\_keywords?

> `optional` **faction\_keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:992](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L992)

***

### base\_size\_mm?

> `optional` **base\_size\_mm?**: \{\[`k`: `string`\]: `unknown`; `shape`: `"round"` \| `"oval"`; `diameter?`: `number`; `width?`: `number`; `length?`: `number`; \} \| `null`

Defined in: [generated.ts:993](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L993)

***

### model\_count?

> `optional` **model\_count?**: `object`

Defined in: [generated.ts:1000](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1000)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### min

> **min**: `number`

#### max

> **max**: `number`

***

### weapon\_ids?

> `optional` **weapon\_ids?**: `string`[]

Defined in: [generated.ts:1005](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1005)

***

### ability\_ids?

> `optional` **ability\_ids?**: `string`[]

Defined in: [generated.ts:1006](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1006)

***

### transport\_capacity?

> `optional` **transport\_capacity?**: \{ `capacity`: `number`; `keyword_restrictions?`: [`KeywordList`](../type-aliases/KeywordList.md) \| `null`; `exclusion_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md) \| `null`; \} \| `null`

Defined in: [generated.ts:1007](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1007)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1012](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1012)

***

### is\_legend?

> `optional` **is\_legend?**: `boolean`

Defined in: [generated.ts:1013](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1013)
