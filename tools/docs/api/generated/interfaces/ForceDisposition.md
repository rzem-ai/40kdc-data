[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ForceDisposition

# Interface: ForceDisposition

Defined in: [generated.ts:376](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L376)

A 11e strategic-intent tag granted by detachments. Players compare dispositions at game start to determine the shared mission; asymmetric primary objectives result.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "force-disposition".

## Properties

### id

> **id**: `"take-and-hold"` \| `"disruption"` \| `"purge-the-foe"` \| `"priority-assets"` \| `"reconnaissance"`

Defined in: [generated.ts:380](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L380)

One of the five confirmed launch Force Dispositions.

***

### name

> **name**: `string`

Defined in: [generated.ts:381](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L381)

***

### text?

> `optional` **text?**: `string`

Defined in: [generated.ts:385](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L385)

Community-authored description of the disposition's effect (original prose only — no reproduced rules text).

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:386](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L386)
