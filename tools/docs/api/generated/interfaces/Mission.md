[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Mission

# Interface: Mission

Defined in: [generated.ts:441](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L441)

An 11e primary mission (the objective a player scores). Which mission a player plays is selected by the Force Disposition matchup matrix (see mission-matchup), keyed on the player's own disposition and their opponent's. Victory points are capped per game and per battle round.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "mission".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:442](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L442)

***

### name

> **name**: `string`

Defined in: [generated.ts:443](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L443)

***

### source?

> `optional` **source?**: `string`

Defined in: [generated.ts:447](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L447)

Mission pack or source the mission originates from.

***

### description?

> `optional` **description?**: `string`

Defined in: [generated.ts:451](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L451)

Community-authored mission/objective summary (original prose only — no reproduced rules text).

***

### vp\_per\_game\_cap?

> `optional` **vp\_per\_game\_cap?**: `number`

Defined in: [generated.ts:455](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L455)

Maximum primary VP scorable across the whole game. 11e default is 45.

***

### vp\_per\_round\_cap?

> `optional` **vp\_per\_round\_cap?**: `number`

Defined in: [generated.ts:459](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L459)

Maximum primary VP scorable in a single battle round. 11e default is 15.

***

### deployment\_pattern\_ids?

> `optional` **deployment\_pattern\_ids?**: `string`[]

Defined in: [generated.ts:463](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L463)

Ids of the deployment-pattern entities (maps) this mission can be played on. Empty until the per-mission maps are confirmed.

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:464](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L464)
