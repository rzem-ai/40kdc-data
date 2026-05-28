[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / RawData

# Interface: RawData

Defined in: [data/types.ts:41](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L41)

Every entity collection in the dataset, keyed by camelCase collection name.

Collections with no authored data yet (e.g. `interactionFlags`) are present
as empty arrays so the API surface is stable and new data flows through
automatically once authored.

## Properties

### units

> **units**: [`Unit`](../../generated/interfaces/Unit.md)[]

Defined in: [data/types.ts:42](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L42)

***

### weapons

> **weapons**: [`Weapon`](../../generated/interfaces/Weapon.md)[]

Defined in: [data/types.ts:43](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L43)

***

### weaponKeywords

> **weaponKeywords**: [`WeaponKeyword`](../../generated/interfaces/WeaponKeyword.md)[]

Defined in: [data/types.ts:45](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L45)

Catalog of weapon keywords (Lethal Hits, Sustained Hits N, Anti-X N+, ...).

***

### factions

> **factions**: [`Faction`](../../generated/interfaces/Faction.md)[]

Defined in: [data/types.ts:46](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L46)

***

### abilities

> **abilities**: [`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md)[]

Defined in: [data/types.ts:48](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L48)

Community-authored ability mechanics (key is `ability_id`, not `id`).

***

### phaseMappings

> **phaseMappings**: [`PhaseMapping`](../../generated/interfaces/PhaseMapping.md)[]

Defined in: [data/types.ts:50](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L50)

Phase assignments, joined to abilities/stratagems/etc. via `source_id`.

***

### detachments

> **detachments**: [`Detachment`](../../generated/interfaces/Detachment.md)[]

Defined in: [data/types.ts:51](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L51)

***

### stratagems

> **stratagems**: [`Stratagem`](../../generated/interfaces/Stratagem.md)[]

Defined in: [data/types.ts:52](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L52)

***

### enhancements

> **enhancements**: [`Enhancement`](../../generated/interfaces/Enhancement.md)[]

Defined in: [data/types.ts:53](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L53)

***

### leaderAttachments

> **leaderAttachments**: [`LeaderAttachment`](../../generated/interfaces/LeaderAttachment.md)[]

Defined in: [data/types.ts:54](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L54)

***

### unitCompositions

> **unitCompositions**: [`UnitComposition`](../../generated/interfaces/UnitComposition.md)[]

Defined in: [data/types.ts:55](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L55)

***

### wargearOptions

> **wargearOptions**: [`WargearOption`](../../generated/interfaces/WargearOption.md)[]

Defined in: [data/types.ts:56](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L56)

***

### gameVersions

> **gameVersions**: [`GameVersion`](../../generated/interfaces/GameVersion.md)[]

Defined in: [data/types.ts:57](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L57)

***

### missions

> **missions**: [`Mission`](../../generated/interfaces/Mission.md)[]

Defined in: [data/types.ts:58](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L58)

***

### missionMatchups

> **missionMatchups**: [`MissionMatchup`](../../generated/interfaces/MissionMatchup.md)[]

Defined in: [data/types.ts:59](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L59)

***

### secondaryCards

> **secondaryCards**: [`SecondaryCard`](../../generated/interfaces/SecondaryCard.md)[]

Defined in: [data/types.ts:60](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L60)

***

### deploymentPatterns

> **deploymentPatterns**: [`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md)[]

Defined in: [data/types.ts:61](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L61)

***

### forceDispositions

> **forceDispositions**: [`ForceDisposition`](../../generated/interfaces/ForceDisposition.md)[]

Defined in: [data/types.ts:62](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L62)

***

### resourcePools

> **resourcePools**: [`ResourcePool`](../../generated/interfaces/ResourcePool.md)[]

Defined in: [data/types.ts:63](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L63)

***

### timingFlags

> **timingFlags**: [`TimingFlag`](../../generated/interfaces/TimingFlag.md)[]

Defined in: [data/types.ts:64](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L64)

***

### interactionFlags

> **interactionFlags**: [`InteractionFlag`](../../generated/interfaces/InteractionFlag.md)[]

Defined in: [data/types.ts:65](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/types.ts#L65)
