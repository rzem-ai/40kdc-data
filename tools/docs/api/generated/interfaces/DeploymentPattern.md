[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DeploymentPattern

# Interface: DeploymentPattern

Defined in: [generated.ts:242](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L242)

A deployment map: per-side deployment zones, objective positions, and (11e) per-side territory polygons. Pattern geometry carries forward unchanged from 10th edition; downstream tooling (e.g. bevy-deploy-helper) consumes this as the canonical encoding.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "deployment-pattern".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:243](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L243)

***

### name

> **name**: `string`

Defined in: [generated.ts:244](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L244)

***

### source?

> `optional` **source?**: `string`

Defined in: [generated.ts:248](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L248)

Mission pack or source the pattern originates from (e.g. 'leviathan').

***

### description?

> `optional` **description?**: `string`

Defined in: [generated.ts:249](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L249)

***

### zones

> **zones**: \[\{ `player`: [`Side`](../type-aliases/Side.md); `name?`: `string`; `shape`: [`ZoneShape`](../type-aliases/ZoneShape.md); `position`: [`Vec2`](Vec2.md); `color?`: `string`; \}, `...{ player: Side; name?: string; shape: ZoneShape; position: Vec2; color?: string }[]`\]

Defined in: [generated.ts:255](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L255)

Per-side deployment zones.

#### Min Items

1

***

### territories?

> `optional` **territories?**: `object`[]

Defined in: [generated.ts:280](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L280)

11e per-side territory polygons, mirroring the deployment-zone shape (e.g. the band between a deployment zone and the midline). Empty until authored.

#### player

> **player**: [`Side`](../type-aliases/Side.md)

#### shape

> **shape**: [`ZoneShape`](../type-aliases/ZoneShape.md)

#### position

> **position**: [`Vec2`](Vec2.md)

***

### objectives?

> `optional` **objectives?**: [`Vec2`](Vec2.md)[]

Defined in: [generated.ts:288](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L288)

Objective-marker positions on the board.

***

### recommended\_terrain\_layout\_ids?

> `optional` **recommended\_terrain\_layout\_ids?**: `string`[]

Defined in: [generated.ts:292](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L292)

Ids of recommended terrain-layout entities (resolved once terrain-layout data is authored).

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:293](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L293)
