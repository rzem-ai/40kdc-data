[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / FactionView

# Class: FactionView

Defined in: data/entities.ts:108

A faction, linked to its units and the records scoped to it.

## Constructors

### Constructor

> **new FactionView**(`raw`, `ds`): `FactionView`

Defined in: data/entities.ts:109

#### Parameters

##### raw

[`Faction`](../../generated/interfaces/Faction.md)

The full generated `Faction` record.

##### ds

[`Dataset`](Dataset.md)

#### Returns

`FactionView`

## Properties

### raw

> `readonly` **raw**: [`Faction`](../../generated/interfaces/Faction.md)

Defined in: data/entities.ts:111

The full generated `Faction` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: data/entities.ts:115

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: data/entities.ts:119

##### Returns

`string`

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: data/entities.ts:124

Units whose `faction_id` is this faction (may be empty for successors).

##### Returns

[`UnitView`](UnitView.md)[]

***

### abilities

#### Get Signature

> **get** **abilities**(): [`AbilityView`](AbilityView.md)[]

Defined in: data/entities.ts:129

Faction-scoped abilities (abilities whose `faction_id` is this faction).

##### Returns

[`AbilityView`](AbilityView.md)[]

***

### weapons

#### Get Signature

> **get** **weapons**(): [`WeaponView`](WeaponView.md)[]

Defined in: data/entities.ts:134

Distinct weapons carried by this faction's units.

##### Returns

[`WeaponView`](WeaponView.md)[]
