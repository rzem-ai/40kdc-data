[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / MissionMatchup

# Interface: MissionMatchup

Defined in: [generated.ts:649](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L649)

One cell of the 11e Force Disposition matrix: given the player's own Force Disposition and their opponent's, the mission that player plays. Mirrors a single row on a physical Force Disposition card. The (disposition, opponent_disposition) pair is the conceptual key; compound uniqueness across entries is a data convention, not enforced by this schema.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "mission-matchup".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:650](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L650)

***

### disposition

> **disposition**: `"take-and-hold"` \| `"disruption"` \| `"purge-the-foe"` \| `"priority-assets"` \| `"reconnaissance"`

Defined in: [generated.ts:654](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L654)

The player's own Force Disposition.

***

### opponent\_disposition

> **opponent\_disposition**: `"take-and-hold"` \| `"disruption"` \| `"purge-the-foe"` \| `"priority-assets"` \| `"reconnaissance"`

Defined in: [generated.ts:658](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L658)

The opponent's Force Disposition.

***

### mission\_id

> **mission\_id**: `string`

Defined in: [generated.ts:662](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L662)

Kebab-case identifier

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:663](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L663)
