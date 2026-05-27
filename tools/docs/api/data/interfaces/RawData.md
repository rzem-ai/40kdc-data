[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / RawData

# Interface: RawData

Defined in: data/types.ts:40

Every entity collection in the dataset, keyed by camelCase collection name.

Collections with no authored data yet (e.g. `interactionFlags`) are present
as empty arrays so the API surface is stable and new data flows through
automatically once authored.

## Properties

### units

> **units**: [`Unit`](../../generated/interfaces/Unit.md)[]

Defined in: data/types.ts:41

***

### weapons

> **weapons**: [`Weapon`](../../generated/interfaces/Weapon.md)[]

Defined in: data/types.ts:42

***

### factions

> **factions**: [`Faction`](../../generated/interfaces/Faction.md)[]

Defined in: data/types.ts:43

***

### abilities

> **abilities**: [`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md)[]

Defined in: data/types.ts:45

Community-authored ability mechanics (key is `ability_id`, not `id`).

***

### phaseMappings

> **phaseMappings**: [`PhaseMapping`](../../generated/interfaces/PhaseMapping.md)[]

Defined in: data/types.ts:47

Phase assignments, joined to abilities/stratagems/etc. via `source_id`.

***

### detachments

> **detachments**: [`Detachment`](../../generated/interfaces/Detachment.md)[]

Defined in: data/types.ts:48

***

### stratagems

> **stratagems**: [`Stratagem`](../../generated/interfaces/Stratagem.md)[]

Defined in: data/types.ts:49

***

### enhancements

> **enhancements**: [`Enhancement`](../../generated/interfaces/Enhancement.md)[]

Defined in: data/types.ts:50

***

### leaderAttachments

> **leaderAttachments**: [`LeaderAttachment`](../../generated/interfaces/LeaderAttachment.md)[]

Defined in: data/types.ts:51

***

### unitCompositions

> **unitCompositions**: [`UnitComposition`](../../generated/interfaces/UnitComposition.md)[]

Defined in: data/types.ts:52

***

### wargearOptions

> **wargearOptions**: [`WargearOption`](../../generated/interfaces/WargearOption.md)[]

Defined in: data/types.ts:53

***

### gameVersions

> **gameVersions**: [`GameVersion`](../../generated/interfaces/GameVersion.md)[]

Defined in: data/types.ts:54

***

### missions

> **missions**: [`Mission`](../../generated/interfaces/Mission.md)[]

Defined in: data/types.ts:55

***

### missionMatchups

> **missionMatchups**: [`MissionMatchup`](../../generated/interfaces/MissionMatchup.md)[]

Defined in: data/types.ts:56

***

### secondaryCards

> **secondaryCards**: [`SecondaryCard`](../../generated/interfaces/SecondaryCard.md)[]

Defined in: data/types.ts:57

***

### deploymentPatterns

> **deploymentPatterns**: [`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md)[]

Defined in: data/types.ts:58

***

### forceDispositions

> **forceDispositions**: [`ForceDisposition`](../../generated/interfaces/ForceDisposition.md)[]

Defined in: data/types.ts:59

***

### resourcePools

> **resourcePools**: [`ResourcePool`](../../generated/interfaces/ResourcePool.md)[]

Defined in: data/types.ts:60

***

### timingFlags

> **timingFlags**: [`TimingFlag`](../../generated/interfaces/TimingFlag.md)[]

Defined in: data/types.ts:61

***

### interactionFlags

> **interactionFlags**: [`InteractionFlag`](../../generated/interfaces/InteractionFlag.md)[]

Defined in: data/types.ts:62
