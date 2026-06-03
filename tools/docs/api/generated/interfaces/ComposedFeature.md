[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ComposedFeature

# Interface: ComposedFeature

Defined in: [generated.ts:1034](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1034)

A feature placed on an area template, positioned in the area's centroid-local frame (y-down inches). When the area is placed, rotated, or mirrored, its composed features are carried along.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "composed-feature".

## Properties

### id?

> `optional` **id?**: `string`

Defined in: [generated.ts:1038](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1038)

Kebab-case identifier

***

### template

> **template**: `string`

Defined in: [generated.ts:1042](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1042)

Kebab-case identifier

***

### position

> **position**: [`Vec23`](Vec23.md)

Defined in: [generated.ts:1043](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1043)

***

### rotation\_degrees?

> `optional` **rotation\_degrees?**: `number`

Defined in: [generated.ts:1047](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1047)

Clockwise rotation of the feature about its own centroid, within the area-local frame.

***

### mirror?

> `optional` **mirror?**: `"none"` \| `"horizontal"` \| `"vertical"`

Defined in: [generated.ts:1048](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1048)

***

### floor?

> `optional` **floor?**: `number`

Defined in: [generated.ts:1052](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/generated.ts#L1052)

Ruin floor this feature occupies (0 = ground level).
