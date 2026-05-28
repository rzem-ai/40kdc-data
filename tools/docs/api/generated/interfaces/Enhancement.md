[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Enhancement

# Interface: Enhancement

Defined in: [generated.ts:559](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L559)

A purchasable upgrade for a character unit, provided by a detachment.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "enhancement".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:560](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L560)

***

### name

> **name**: `string`

Defined in: [generated.ts:561](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L561)

***

### detachment\_id

> **detachment\_id**: `string`

Defined in: [generated.ts:562](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L562)

***

### cost

> **cost**: `number`

Defined in: [generated.ts:563](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L563)

***

### points\_provisional?

> `optional` **points\_provisional?**: `boolean`

Defined in: [generated.ts:567](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L567)

True when the cost is carried over provisionally (e.g. seeded from a prior edition during migration) and not yet confirmed against the current dataslate.

***

### upgrade\_tag?

> `optional` **upgrade\_tag?**: `boolean`

Defined in: [generated.ts:571](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L571)

11e: when true, this enhancement applies to up to `max_targets` non-character units while counting as a single Enhancement choice.

***

### max\_targets?

> `optional` **max\_targets?**: `number`

Defined in: [generated.ts:575](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L575)

Number of units this enhancement may be applied to. Only meaningful when `upgrade_tag` is true; defaults to 1.

***

### keyword\_restrictions?

> `optional` **keyword\_restrictions?**: [`KeywordList`](../type-aliases/KeywordList.md)

Defined in: [generated.ts:576](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L576)

***

### exclusion\_keywords?

> `optional` **exclusion\_keywords?**: [`KeywordList`](../type-aliases/KeywordList.md) \| `null`

Defined in: [generated.ts:577](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L577)

***

### ability\_id?

> `optional` **ability\_id?**: `string` \| `null`

Defined in: [generated.ts:578](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L578)

***

### is\_unique?

> `optional` **is\_unique?**: `boolean`

Defined in: [generated.ts:579](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L579)

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:580](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L580)
