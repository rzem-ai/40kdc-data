[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / AbilityView

# Class: AbilityView

Defined in: data/entities.ts:58

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

Defined in: data/entities.ts:59

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

Defined in: data/entities.ts:61

The full generated ability record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: data/entities.ts:66

The ability's id (`ability_id` in the raw record).

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: data/entities.ts:70

##### Returns

`string`

***

### phases

#### Get Signature

> **get** **phases**(): [`Phase`](../../generated/type-aliases/Phase.md)[]

Defined in: data/entities.ts:75

Game phases this ability acts in, unioned across its phase-mappings.

##### Returns

[`Phase`](../../generated/type-aliases/Phase.md)[]

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: data/entities.ts:80

Units that list this ability in their `ability_ids`.

##### Returns

[`UnitView`](UnitView.md)[]
