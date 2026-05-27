[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / WeaponView

# Class: WeaponView

Defined in: data/entities.ts:86

A weapon, linked to the units that carry it.

## Constructors

### Constructor

> **new WeaponView**(`raw`, `ds`): `WeaponView`

Defined in: data/entities.ts:87

#### Parameters

##### raw

[`Weapon`](../../generated/interfaces/Weapon.md)

The full generated `Weapon` record.

##### ds

[`Dataset`](Dataset.md)

#### Returns

`WeaponView`

## Properties

### raw

> `readonly` **raw**: [`Weapon`](../../generated/interfaces/Weapon.md)

Defined in: data/entities.ts:89

The full generated `Weapon` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: data/entities.ts:93

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: data/entities.ts:97

##### Returns

`string`

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: data/entities.ts:102

Units that list this weapon in their `weapon_ids`.

##### Returns

[`UnitView`](UnitView.md)[]
