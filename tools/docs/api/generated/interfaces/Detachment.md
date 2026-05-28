[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Detachment

# Interface: Detachment

Defined in: [generated.ts:531](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L531)

A detachment option within a faction, providing a detachment rule, enhancements, and stratagems.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "detachment".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:532](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L532)

***

### name

> **name**: `string`

Defined in: [generated.ts:533](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L533)

***

### faction\_id

> **faction\_id**: `string`

Defined in: [generated.ts:534](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L534)

***

### detachment\_rule\_id?

> `optional` **detachment\_rule\_id?**: `string` \| `null`

Defined in: [generated.ts:535](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L535)

***

### detachment\_points?

> `optional` **detachment\_points?**: `number` \| `null`

Defined in: [generated.ts:539](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L539)

11e: the detachment-point cost (1–3) charged against the army's detachment-point budget. null when not yet assigned.

***

### force\_dispositions?

> `optional` **force\_dispositions?**: `string`[]

Defined in: [generated.ts:543](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L543)

11e: ids of the Force Disposition entities this detachment grants. Empty until assigned.

***

### enhancement\_ids?

> `optional` **enhancement\_ids?**: `string`[]

Defined in: [generated.ts:544](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L544)

***

### stratagem\_ids?

> `optional` **stratagem\_ids?**: `string`[]

Defined in: [generated.ts:545](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L545)

***

### restrictions?

> `optional` **restrictions?**: \{ `required_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `excluded_keywords?`: [`KeywordList`](../type-aliases/KeywordList.md); `notes?`: `string`; \} \| `null`

Defined in: [generated.ts:546](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L546)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:551](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L551)
