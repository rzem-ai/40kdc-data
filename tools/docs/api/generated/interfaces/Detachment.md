[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Detachment

# Interface: Detachment

Defined in: [generated.ts:301](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L301)

A detachment option within a faction, providing a detachment rule, enhancements, and stratagems.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "detachment".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:302](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L302)

***

### name

> **name**: `string`

Defined in: [generated.ts:303](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L303)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:304](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L304)

***

### detachment\_rule\_id?

> `optional` **detachment\_rule\_id?**: `string` \| `null`

Defined in: [generated.ts:305](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L305)

***

### detachment\_points?

> `optional` **detachment\_points?**: `number` \| `null`

Defined in: [generated.ts:309](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L309)

11e: the detachment-point cost (1–3) charged against the army's detachment-point budget. null when not yet assigned.

***

### force\_dispositions?

> `optional` **force\_dispositions?**: `string`[]

Defined in: [generated.ts:313](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L313)

11e: ids of the Force Disposition entities this detachment grants. Empty until assigned.

***

### enhancement\_ids?

> `optional` **enhancement\_ids?**: `string`[]

Defined in: [generated.ts:314](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L314)

***

### stratagem\_ids?

> `optional` **stratagem\_ids?**: `string`[]

Defined in: [generated.ts:315](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L315)

***

### restrictions?

> `optional` **restrictions?**: \{ `required_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `excluded_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `notes?`: `string`; \} \| `null`

Defined in: [generated.ts:316](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L316)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:321](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L321)
