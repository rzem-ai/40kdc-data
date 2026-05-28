[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / DeploymentPattern

# Interface: DeploymentPattern

Defined in: [generated.ts:472](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L472)

A deployment map: per-side deployment zones, objective positions, and (11e) per-side territory polygons. Pattern geometry carries forward unchanged from 10th edition; downstream tooling (e.g. bevy-deploy-helper) consumes this as the canonical encoding.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "deployment-pattern".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:473](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L473)

***

### name

> **name**: `string`

Defined in: [generated.ts:474](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L474)

***

### source?

> `optional` **source?**: `string`

Defined in: [generated.ts:478](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L478)

Mission pack or source the pattern originates from (e.g. 'leviathan').

***

### description?

> `optional` **description?**: `string`

Defined in: [generated.ts:479](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L479)

***

### zones

> **zones**: \[\{ `player`: [`Side`](../type-aliases/Side.md); `name?`: `string`; `shape`: [`ZoneShape`](../type-aliases/ZoneShape.md); `position`: [`Vec2`](Vec2.md); `color?`: `string`; \}, `...{ player: Side; name?: string; shape: ZoneShape; position: Vec2; color?: string }[]`\]

Defined in: [generated.ts:485](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L485)

Per-side deployment zones.

#### Min Items

1

***

### territories?

> `optional` **territories?**: `object`[]

Defined in: [generated.ts:510](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L510)

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

Defined in: [generated.ts:518](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L518)

Objective-marker positions on the board.

***

### recommended\_terrain\_layout\_ids?

> `optional` **recommended\_terrain\_layout\_ids?**: `string`[]

Defined in: [generated.ts:522](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L522)

Ids of recommended terrain-layout entities (resolved once terrain-layout data is authored).

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:523](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L523)
