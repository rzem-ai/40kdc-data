[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / AbilityDSLEntry

# Interface: AbilityDSLEntry

Defined in: [generated.ts:1096](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1096)

Community-authored structured representation of what a game ability does. NOT GW text.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "ability".

## Properties

### ability\_id

> **ability\_id**: `string`

Defined in: [generated.ts:1097](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1097)

***

### name

> **name**: `string`

Defined in: [generated.ts:1098](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1098)

***

### authored\_by

> **authored\_by**: `string`

Defined in: [generated.ts:1099](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1099)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1100](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1100)

***

### version?

> `optional` **version?**: `string`

Defined in: [generated.ts:1101](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1101)

***

### supersedes?

> `optional` **supersedes?**: `string` \| `null`

Defined in: [generated.ts:1102](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1102)

***

### unit\_ids?

> `optional` **unit\_ids?**: `string`[]

Defined in: [generated.ts:1103](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1103)

***

### faction\_id?

> `optional` **faction\_id?**: `string` \| `null`

Defined in: [generated.ts:1107](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1107)

For faction-type abilities, the faction this rule belongs to

***

### detachment\_id?

> `optional` **detachment\_id?**: `string` \| `null`

Defined in: [generated.ts:1111](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1111)

For detachment/enhancement/stratagem-type abilities, the associated detachment

***

### ability\_type?

> `optional` **ability\_type?**: `"stratagem"` \| `"enhancement"` \| `"unit"` \| `"core"` \| `"detachment"` \| `"faction"`

Defined in: [generated.ts:1112](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1112)

***

### behavior?

> `optional` **behavior?**: `"passive"` \| `"activated"` \| `"reactive"` \| `"aura"`

Defined in: [generated.ts:1116](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1116)

How this ability interacts with the game flow — not a runtime predicate

***

### effect

> **effect**: [`AbilityEffect1`](../type-aliases/AbilityEffect1.md)

Defined in: [generated.ts:1117](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1117)

***

### scope

> **scope**: [`AbilityScope`](AbilityScope.md)

Defined in: [generated.ts:1118](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1118)

***

### interactions?

> `optional` **interactions?**: `object`[]

Defined in: [generated.ts:1119](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1119)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### ability\_ref

> **ability\_ref**: `string`

#### type

> **type**: `"conflicts-with"` \| `"combos-with"` \| `"superseded-by"` \| `"requires"` \| `"replaces"`

#### notes?

> `optional` **notes?**: `string`

***

### disputed?

> `optional` **disputed?**: `boolean`

Defined in: [generated.ts:1125](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1125)

***

### dispute\_notes?

> `optional` **dispute\_notes?**: `string`

Defined in: [generated.ts:1126](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1126)

***

### community\_notes?

> `optional` **community\_notes?**: `string`

Defined in: [generated.ts:1127](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L1127)
