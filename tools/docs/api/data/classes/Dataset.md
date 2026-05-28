[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / Dataset

# Class: Dataset

Defined in: [data/dataset.ts:46](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L46)

The whole dataset, with linked accessors over every entity collection.

## Constructors

### Constructor

> **new Dataset**(`raw?`): `Dataset`

Defined in: [data/dataset.ts:83](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L83)

#### Parameters

##### raw?

[`RawData`](../interfaces/RawData.md) = `...`

#### Returns

`Dataset`

## Properties

### units

> `readonly` **units**: [`Collection`](Collection.md)\<[`Unit`](../../generated/interfaces/Unit.md), [`UnitView`](UnitView.md)\>

Defined in: [data/dataset.ts:48](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L48)

***

### weapons

> `readonly` **weapons**: [`Collection`](Collection.md)\<[`Weapon`](../../generated/interfaces/Weapon.md), [`WeaponView`](WeaponView.md)\>

Defined in: [data/dataset.ts:49](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L49)

***

### weaponKeywords

> `readonly` **weaponKeywords**: [`Collection`](Collection.md)\<[`WeaponKeyword`](../../generated/interfaces/WeaponKeyword.md), [`WeaponKeywordView`](WeaponKeywordView.md)\>

Defined in: [data/dataset.ts:50](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L50)

***

### factions

> `readonly` **factions**: [`Collection`](Collection.md)\<[`Faction`](../../generated/interfaces/Faction.md), [`FactionView`](FactionView.md)\>

Defined in: [data/dataset.ts:51](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L51)

***

### abilities

> `readonly` **abilities**: [`Collection`](Collection.md)\<[`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md), [`AbilityView`](AbilityView.md)\>

Defined in: [data/dataset.ts:52](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L52)

***

### detachments

> `readonly` **detachments**: [`Collection`](Collection.md)\<[`Detachment`](../../generated/interfaces/Detachment.md), [`Detachment`](../../generated/interfaces/Detachment.md)\>

Defined in: [data/dataset.ts:55](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L55)

***

### enhancements

> `readonly` **enhancements**: [`Collection`](Collection.md)\<[`Enhancement`](../../generated/interfaces/Enhancement.md), [`Enhancement`](../../generated/interfaces/Enhancement.md)\>

Defined in: [data/dataset.ts:56](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L56)

***

### stratagems

> `readonly` **stratagems**: [`Collection`](Collection.md)\<[`Stratagem`](../../generated/interfaces/Stratagem.md), [`Stratagem`](../../generated/interfaces/Stratagem.md)\>

Defined in: [data/dataset.ts:57](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L57)

***

### wargearOptions

> `readonly` **wargearOptions**: [`Collection`](Collection.md)\<[`WargearOption`](../../generated/interfaces/WargearOption.md), [`WargearOption`](../../generated/interfaces/WargearOption.md)\>

Defined in: [data/dataset.ts:58](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L58)

***

### missions

> `readonly` **missions**: [`Collection`](Collection.md)\<[`Mission`](../../generated/interfaces/Mission.md), [`Mission`](../../generated/interfaces/Mission.md)\>

Defined in: [data/dataset.ts:59](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L59)

***

### missionMatchups

> `readonly` **missionMatchups**: [`Collection`](Collection.md)\<[`MissionMatchup`](../../generated/interfaces/MissionMatchup.md), [`MissionMatchup`](../../generated/interfaces/MissionMatchup.md)\>

Defined in: [data/dataset.ts:60](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L60)

***

### secondaryCards

> `readonly` **secondaryCards**: [`Collection`](Collection.md)\<[`SecondaryCard`](../../generated/interfaces/SecondaryCard.md), [`SecondaryCard`](../../generated/interfaces/SecondaryCard.md)\>

Defined in: [data/dataset.ts:61](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L61)

***

### deploymentPatterns

> `readonly` **deploymentPatterns**: [`Collection`](Collection.md)\<[`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md), [`DeploymentPattern`](../../generated/interfaces/DeploymentPattern.md)\>

Defined in: [data/dataset.ts:62](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L62)

***

### forceDispositions

> `readonly` **forceDispositions**: [`Collection`](Collection.md)\<[`ForceDisposition`](../../generated/interfaces/ForceDisposition.md), [`ForceDisposition`](../../generated/interfaces/ForceDisposition.md)\>

Defined in: [data/dataset.ts:63](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L63)

***

### resourcePools

> `readonly` **resourcePools**: [`Collection`](Collection.md)\<[`ResourcePool`](../../generated/interfaces/ResourcePool.md), [`ResourcePool`](../../generated/interfaces/ResourcePool.md)\>

Defined in: [data/dataset.ts:64](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L64)

***

### leaderAttachments

> `readonly` **leaderAttachments**: readonly [`LeaderAttachment`](../../generated/interfaces/LeaderAttachment.md)[]

Defined in: [data/dataset.ts:67](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L67)

***

### unitCompositions

> `readonly` **unitCompositions**: readonly [`UnitComposition`](../../generated/interfaces/UnitComposition.md)[]

Defined in: [data/dataset.ts:68](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L68)

***

### gameVersions

> `readonly` **gameVersions**: readonly [`GameVersion`](../../generated/interfaces/GameVersion.md)[]

Defined in: [data/dataset.ts:69](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L69)

***

### timingFlags

> `readonly` **timingFlags**: readonly [`TimingFlag`](../../generated/interfaces/TimingFlag.md)[]

Defined in: [data/dataset.ts:70](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L70)

***

### interactionFlags

> `readonly` **interactionFlags**: readonly [`InteractionFlag`](../../generated/interfaces/InteractionFlag.md)[]

Defined in: [data/dataset.ts:71](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L71)

***

### phaseMappings

> `readonly` **phaseMappings**: readonly [`PhaseMapping`](../../generated/interfaces/PhaseMapping.md)[]

Defined in: [data/dataset.ts:72](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L72)

## Methods

### embedded()

> `static` **embedded**(): `Dataset`

Defined in: [data/dataset.ts:142](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L142)

The dataset built from the package's embedded data.

#### Returns

`Dataset`

***

### phasesFor()

> **phasesFor**(`sourceType`, `sourceId`): [`Phase`](../../generated/type-aliases/Phase.md)[]

Defined in: [data/dataset.ts:147](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L147)

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

Defined in: [data/dataset.ts:152](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L152)

Units that list the given ability id.

#### Parameters

##### abilityId

`string`

#### Returns

[`UnitView`](UnitView.md)[]

***

### unitsWithWeapon()

> **unitsWithWeapon**(`weaponId`): [`UnitView`](UnitView.md)[]

Defined in: [data/dataset.ts:157](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L157)

Units that list the given weapon id.

#### Parameters

##### weaponId

`string`

#### Returns

[`UnitView`](UnitView.md)[]

***

### weaponsWithKeyword()

> **weaponsWithKeyword**(`keywordId`): [`WeaponView`](WeaponView.md)[]

Defined in: [data/dataset.ts:162](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L162)

Weapons whose profiles reference the given weapon-keyword id.

#### Parameters

##### keywordId

`string`

#### Returns

[`WeaponView`](WeaponView.md)[]

***

### eligibleAbilities()

> **eligibleAbilities**(`input`, `phase`): [`EligibleAbility`](../type-aliases/EligibleAbility.md)[]

Defined in: [data/dataset.ts:170](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L170)

Enumerate every ability that could apply to the given unit in `phase`,
grouped by source. The SPA uses this to render the abilities pane.

#### Parameters

##### input

[`EligibilityInput`](../type-aliases/EligibilityInput.md)

##### phase

[`Phase`](../../generated/type-aliases/Phase.md)

#### Returns

[`EligibleAbility`](../type-aliases/EligibleAbility.md)[]

***

### buffsFor()

> **buffsFor**(`input`, `context`): [`Buff`](../type-aliases/Buff.md)[]

Defined in: [data/dataset.ts:187](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L187)

Attacker-perspective [Buff](../type-aliases/Buff.md) stack for a (unit, phase) combination:
intrinsic weapon-profile keywords plus every eligible ability whose DSL
effect translates to an attacker-side buff (army, detachment, unit,
leader, support, plus any stratagems the caller has opted into).

The result includes only buffs the buff layer can express today — the
`unsupported` half of the DSL→Buff translation is dropped here so callers
who just want the stack don't need to thread diagnostics through. Use
[AbilityView.describeBuffs](AbilityView.md#describebuffs) when you need the diagnostics for an
individual ability. Symmetric to [defensiveBuffsFor](#defensivebuffsfor), which walks
the same eligibility set under target perspective.

#### Parameters

##### input

[`EligibilityInput`](../type-aliases/EligibilityInput.md) & `object`

##### context

[`EngineContext`](../type-aliases/EngineContext.md)

#### Returns

[`Buff`](../type-aliases/Buff.md)[]

***

### defensiveBuffsFor()

> **defensiveBuffsFor**(`input`, `context`): [`Buff`](../type-aliases/Buff.md)[]

Defined in: [data/dataset.ts:211](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/dataset.ts#L211)

Defender-perspective buff stack for the chosen unit: walks the same
eligible-abilities set as [buffsFor](#buffsfor) but translates each ability's
DSL effect as defensive (FNP, save mods from `stat-modifier Sv`,
toughness mods from `stat-modifier T`, save rerolls, incoming hit
penalties from `bs-modifier`). Use this when the chosen unit is being
crunched as the *target* — the engine reads `feelNoPain`/`saveMod`/
`toughnessMod` out of `resolveBuffs` so wiring the result into `crunch`
just means concatenating onto the existing `buffs` array.

`weaponProfiles` are ignored under target perspective — weapon-keyword
effects ride with the firing weapon, not the receiving unit.

#### Parameters

##### input

[`EligibilityInput`](../type-aliases/EligibilityInput.md) & `object`

##### context

[`EngineContext`](../type-aliases/EngineContext.md)

#### Returns

[`Buff`](../type-aliases/Buff.md)[]
