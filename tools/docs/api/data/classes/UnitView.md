[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / UnitView

# Class: UnitView

Defined in: data/entities.ts:18

A unit, linked to its faction, weapons, and abilities.

## Constructors

### Constructor

> **new UnitView**(`raw`, `ds`): `UnitView`

Defined in: data/entities.ts:19

#### Parameters

##### raw

[`Unit`](../../generated/interfaces/Unit.md)

The full generated `Unit` record.

##### ds

[`Dataset`](Dataset.md)

#### Returns

`UnitView`

## Properties

### raw

> `readonly` **raw**: [`Unit`](../../generated/interfaces/Unit.md)

Defined in: data/entities.ts:21

The full generated `Unit` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: data/entities.ts:25

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: data/entities.ts:29

##### Returns

`string`

***

### faction

#### Get Signature

> **get** **faction**(): [`FactionView`](FactionView.md) \| `undefined`

Defined in: data/entities.ts:34

The unit's faction, or `undefined` if its `faction_id` is unknown.

##### Returns

[`FactionView`](FactionView.md) \| `undefined`

***

### weapons

#### Get Signature

> **get** **weapons**(): [`WeaponView`](WeaponView.md)[]

Defined in: data/entities.ts:39

Weapons referenced by `weapon_ids`; unresolved ids are skipped.

##### Returns

[`WeaponView`](WeaponView.md)[]

***

### abilities

#### Get Signature

> **get** **abilities**(): [`AbilityView`](AbilityView.md)[]

Defined in: data/entities.ts:44

Abilities referenced by `ability_ids`; unresolved ids are skipped.

##### Returns

[`AbilityView`](AbilityView.md)[]
