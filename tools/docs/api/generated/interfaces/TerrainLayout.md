[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / TerrainLayout

# Interface: TerrainLayout

Defined in: [generated.ts:886](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L886)

A recommended arrangement of terrain pieces on the board, independent of the deployment map (a deployment-pattern references the layouts it recommends via recommended_terrain_layout_ids). Geometry is the source of truth; the GW standard piece templates are expressed as explicit footprints, with an optional descriptive `template` label. Footprints are deliberately open (not enum-locked) — the launch catalog and its size are unconfirmed, so this models any shape rather than a fixed set. No layout data is authored yet.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "terrain-layout".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:887](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L887)

***

### name

> **name**: `string`

Defined in: [generated.ts:888](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L888)

***

### source?

> `optional` **source?**: `string`

Defined in: [generated.ts:892](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L892)

Mission pack or source the layout originates from.

***

### description?

> `optional` **description?**: `string`

Defined in: [generated.ts:893](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L893)

***

### pieces?

> `optional` **pieces?**: [`Piece`](Piece.md)[]

Defined in: [generated.ts:897](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L897)

Terrain pieces composing the layout. May be empty while a layout is registered by name ahead of its confirmed geometry.

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:898](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L898)
