[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / AbilityView

# Class: AbilityView

Defined in: [data/entities.ts:81](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L81)

An ability, linked to the phases it acts in and the units that have it.

Phases are not stored on the ability — they live in `phase-mappings` records.

## Example

```ts
units.find("Kharn")!.abilities
  .filter(a => a.phases.includes("shooting"));
```

## Constructors

### Constructor

> **new AbilityView**(`raw`, `ds`): `AbilityView`

Defined in: [data/entities.ts:82](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L82)

#### Parameters

##### raw

[`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md)

The full generated ability record.

##### ds

[`Dataset`](Dataset.md)

#### Returns

`AbilityView`

## Properties

### raw

> `readonly` **raw**: [`AbilityDSLEntry`](../../generated/interfaces/AbilityDSLEntry.md)

Defined in: [data/entities.ts:84](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L84)

The full generated ability record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [data/entities.ts:89](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L89)

The ability's id (`ability_id` in the raw record).

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [data/entities.ts:93](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L93)

##### Returns

`string`

***

### phases

#### Get Signature

> **get** **phases**(): [`Phase`](../../generated/type-aliases/Phase.md)[]

Defined in: [data/entities.ts:98](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L98)

Game phases this ability acts in, unioned across its phase-mappings.

##### Returns

[`Phase`](../../generated/type-aliases/Phase.md)[]

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: [data/entities.ts:103](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L103)

Units that list this ability in their `ability_ids`.

##### Returns

[`UnitView`](UnitView.md)[]

## Methods

### getBuffs()

> **getBuffs**(`source`, `context?`, `perspective?`): [`Buff`](../type-aliases/Buff.md)[]

Defined in: [data/entities.ts:116](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L116)

Buff stack this ability contributes against `context`, with provenance
tagged via `source` (the caller knows whether this ability is being read
as army, detachment, unit, leader, etc.). DSL branches the buff layer
can't auto-apply are dropped here; call [describeBuffs](#describebuffs) if you
also want the diagnostics. `perspective` defaults to `"attacker"`; pass
`"target"` to translate the ability as a defensive buff (FNP, T/Sv
stat-mods, save rerolls, incoming hit penalties).

#### Parameters

##### source

[`BuffSource`](../type-aliases/BuffSource.md)

##### context?

[`EngineContext`](../type-aliases/EngineContext.md)

##### perspective?

[`TranslationPerspective`](../type-aliases/TranslationPerspective.md) = `"attacker"`

#### Returns

[`Buff`](../type-aliases/Buff.md)[]

***

### describeBuffs()

> **describeBuffs**(`source`, `context?`, `perspective?`): `object`

Defined in: [data/entities.ts:129](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L129)

Full DSL→Buff translation, including the `unsupported` list of effect
fragments the buff layer can't model. The SPA renders these as warnings
so users see which abilities have effects that need a manual toggle.

#### Parameters

##### source

[`BuffSource`](../type-aliases/BuffSource.md)

##### context?

[`EngineContext`](../type-aliases/EngineContext.md)

##### perspective?

[`TranslationPerspective`](../type-aliases/TranslationPerspective.md) = `"attacker"`

#### Returns

`object`

##### applied

> **applied**: [`Buff`](../type-aliases/Buff.md)[]

##### unsupported

> **unsupported**: [`UnsupportedFragment`](../type-aliases/UnsupportedFragment.md)[]
