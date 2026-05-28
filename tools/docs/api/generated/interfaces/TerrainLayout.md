[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / TerrainLayout

# Interface: TerrainLayout

Defined in: [generated.ts:971](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L971)

A recommended arrangement of terrain pieces on the board, independent of the deployment map (a deployment-pattern references the layouts it recommends via recommended_terrain_layout_ids). Geometry is the source of truth; the GW standard piece templates are expressed as explicit footprints, with an optional descriptive `template` label. Footprints are deliberately open (not enum-locked) — the launch catalog and its size are unconfirmed, so this models any shape rather than a fixed set. No layout data is authored yet.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "terrain-layout".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:972](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L972)

***

### name

> **name**: `string`

Defined in: [generated.ts:973](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L973)

***

### source?

> `optional` **source?**: `string`

Defined in: [generated.ts:977](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L977)

Mission pack or source the layout originates from.

***

### description?

> `optional` **description?**: `string`

Defined in: [generated.ts:978](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L978)

***

### pieces?

> `optional` **pieces?**: [`Piece`](Piece.md)[]

Defined in: [generated.ts:982](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L982)

Terrain pieces composing the layout. May be empty while a layout is registered by name ahead of its confirmed geometry.

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:983](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L983)
