[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ForceDisposition

# Interface: ForceDisposition

Defined in: [generated.ts:606](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L606)

A 11e strategic-intent tag granted by detachments. Players compare dispositions at game start to determine the shared mission; asymmetric primary objectives result.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "force-disposition".

## Properties

### id

> **id**: `"take-and-hold"` \| `"disruption"` \| `"purge-the-foe"` \| `"priority-assets"` \| `"reconnaissance"`

Defined in: [generated.ts:610](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L610)

One of the five confirmed launch Force Dispositions.

***

### name

> **name**: `string`

Defined in: [generated.ts:611](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L611)

***

### text?

> `optional` **text?**: `string`

Defined in: [generated.ts:615](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L615)

Community-authored description of the disposition's effect (original prose only — no reproduced rules text).

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:616](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L616)
