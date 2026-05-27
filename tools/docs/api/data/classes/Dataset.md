[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / Dataset

# Class: Dataset

Defined in: data/dataset.ts:33

The whole dataset, with linked accessors over every entity collection.

## Constructors

### Constructor

> **new Dataset**(`raw?`): `Dataset`

Defined in: data/dataset.ts:67

#### Parameters

##### raw?

[`RawData`](../interfaces/RawData.md) = `...`

#### Returns

`Dataset`

## Properties

### units

> `readonly` **units**: [`Collection`](Collection.md)\<[`Unit`](../../generated/interfaces/Unit.md), [`UnitView`](UnitView.md)\>

Defined in: data/dataset.ts:35

***

### weapons

> `readonly` **weapons**: [`Collection`](Collection.md)\<[`Weapon`](../../generated/interfaces/Weapon.md), [`WeaponView`](WeaponView.md)\>

Defined in: data/dataset.ts:36

***

### factions

> `readonly` **factions**: [`Collection`](Collection.md)\<[`Faction`](../../generated/interfaces/Faction.md), [`FactionView`](FactionView.md)\>

Defined in: data/dataset.ts:37

***

### abilities

> `readonly` **abilities**: [`Collection`](Collection.md)\<[`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md), [`AbilityView`](AbilityView.md)\>

Defined in: data/dataset.ts:38

***

### detachments

> `readonly` **detachments**: [`Collection`](Collection.md)\<[`Detachment`](../../generated/interfaces/Detachment.md), [`Detachment`](../../generated/interfaces/Detachment.md)\>

Defined in: data/dataset.ts:41

***

### enhancements

> `readonly` **enhancements**: [`Collection`](Collection.md)\<[`Enhancement`](../../generated/interfaces/Enhancement.md), [`Enhancement`](../../generated/interfaces/Enhancement.md)\>

Defined in: data/dataset.ts:42

***

### stratagems

> `readonly` **stratagems**: [`Collection`](Collection.md)\<[`Stratagem`](../../generated/interfaces/Stratagem.md), [`Stratagem`](../../generated/interfaces/Stratagem.md)\>

Defined in: data/dataset.ts:43

***

### wargearOptions

> `readonly` **wargearOptions**: [`Collection`](Collection.md)\<[`WargearOption`](../../generated/interfaces/WargearOption.md), [`WargearOption`](../../generated/interfaces/WargearOption.md)\>

Defined in: data/dataset.ts:44

***

### missions

> `readonly` **missions**: [`Collection`](Collection.md)\<[`Mission`](../../generated/interfaces/Mission.md), [`Mission`](../../generated/interfaces/Mission.md)\>

Defined in: data/dataset.ts:45

***

### missionMatchups

> `readonly` **missionMatchups**: [`Collection`](Collection.md)\<[`MissionMatchup`](../../generated/interfaces/MissionMatchup.md), [`MissionMatchup`](../../generated/interfaces/MissionMatchup.md)\>

Defined in: data/dataset.ts:46

***

### secondaryCards

> `readonly` **secondaryCards**: [`Collection`](Collection.md)\<[`SecondaryCard`](../../generated/interfaces/SecondaryCard.md), [`SecondaryCard`](../../generated/interfaces/SecondaryCard.md)\>

Defined in: data/dataset.ts:47

***

### deploymentPatterns

> `readonly` **deploymentPatterns**: [`Collection`](Collection.md)\<[`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md), [`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md)\>

Defined in: data/dataset.ts:48

***

### forceDispositions

> `readonly` **forceDispositions**: [`Collection`](Collection.md)\<[`ForceDisposition`](../../generated/interfaces/ForceDisposition.md), [`ForceDisposition`](../../generated/interfaces/ForceDisposition.md)\>

Defined in: data/dataset.ts:49

***

### resourcePools

> `readonly` **resourcePools**: [`Collection`](Collection.md)\<[`ResourcePool`](../../generated/interfaces/ResourcePool.md), [`ResourcePool`](../../generated/interfaces/ResourcePool.md)\>

Defined in: data/dataset.ts:50

***

### leaderAttachments

> `readonly` **leaderAttachments**: readonly [`LeaderAttachment`](../../generated/interfaces/LeaderAttachment.md)[]

Defined in: data/dataset.ts:53

***

### unitCompositions

> `readonly` **unitCompositions**: readonly [`UnitComposition`](../../generated/interfaces/UnitComposition.md)[]

Defined in: data/dataset.ts:54

***

### gameVersions

> `readonly` **gameVersions**: readonly [`GameVersion`](../../generated/interfaces/GameVersion.md)[]

Defined in: data/dataset.ts:55

***

### timingFlags

> `readonly` **timingFlags**: readonly [`TimingFlag`](../../generated/interfaces/TimingFlag.md)[]

Defined in: data/dataset.ts:56

***

### interactionFlags

> `readonly` **interactionFlags**: readonly [`InteractionFlag`](../../generated/interfaces/InteractionFlag.md)[]

Defined in: data/dataset.ts:57

***

### phaseMappings

> `readonly` **phaseMappings**: readonly [`PhaseMapping`](../../generated/interfaces/PhaseMapping.md)[]

Defined in: data/dataset.ts:58

## Methods

### embedded()

> `static` **embedded**(): `Dataset`

Defined in: data/dataset.ts:120

The dataset built from the package's embedded data.

#### Returns

`Dataset`

***

### phasesFor()

> **phasesFor**(`sourceType`, `sourceId`): [`Phase`](../../generated/type-aliases/Phase.md)[]

Defined in: data/dataset.ts:125

Phases a source acts in, unioned across its phase-mappings.

#### Parameters

##### sourceType

`string`

##### sourceId

`string`

#### Returns

[`Phase`](../../generated/type-aliases/Phase.md)[]

***

### unitsWithAbility()

> **unitsWithAbility**(`abilityId`): [`UnitView`](UnitView.md)[]

Defined in: data/dataset.ts:130

Units that list the given ability id.

#### Parameters

##### abilityId

`string`

#### Returns

[`UnitView`](UnitView.md)[]

***

### unitsWithWeapon()

> **unitsWithWeapon**(`weaponId`): [`UnitView`](UnitView.md)[]

Defined in: data/dataset.ts:135

Units that list the given weapon id.

#### Parameters

##### weaponId

`string`

#### Returns

[`UnitView`](UnitView.md)[]
