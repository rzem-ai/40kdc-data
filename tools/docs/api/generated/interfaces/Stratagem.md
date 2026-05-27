[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Stratagem

# Interface: Stratagem

Defined in: [generated.ts:794](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L794)

A CP-costed ability usable during specific game phases.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "stratagem".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:795](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L795)

***

### name

> **name**: `string`

Defined in: [generated.ts:796](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L796)

***

### category

> **category**: `"core"` \| `"detachment"`

Defined in: [generated.ts:800](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L800)

Whether this is a universal core stratagem or tied to a specific detachment

***

### type

> **type**: `"battle-tactic"` \| `"strategic-ploy"` \| `"epic-deed"` \| `"wargear"`

Defined in: [generated.ts:804](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L804)

GW-printed stratagem category from the card

***

### detachment\_id?

> `optional` **detachment\_id?**: `string` \| `null`

Defined in: [generated.ts:808](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L808)

Null for core stratagems

***

### cp\_cost

> **cp\_cost**: `number`

Defined in: [generated.ts:809](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L809)

***

### phases

> **phases**: [`PhaseList`](../type-aliases/PhaseList.md)

Defined in: [generated.ts:810](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L810)

***

### player\_turn

> **player\_turn**: [`PlayerTurn`](../type-aliases/PlayerTurn.md)

Defined in: [generated.ts:811](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L811)

***

### timing

> **timing**: `"once-per-phase"` \| `"once-per-turn"` \| `"once-per-battle"` \| `"unlimited"`

Defined in: [generated.ts:812](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L812)

***

### target\_restrictions?

> `optional` **target\_restrictions?**: \{ `required_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `excluded_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `notes?`: `string`; \} \| `null`

Defined in: [generated.ts:813](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L813)

***

### ability\_id?

> `optional` **ability\_id?**: `string` \| `null`

Defined in: [generated.ts:818](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L818)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:819](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L819)
