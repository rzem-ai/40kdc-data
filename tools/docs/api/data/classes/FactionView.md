[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / FactionView

# Class: FactionView

Defined in: [data/entities.ts:262](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L262)

A faction, linked to its units and the records scoped to it.

## Constructors

### Constructor

> **new FactionView**(`raw`, `ds`): `FactionView`

Defined in: [data/entities.ts:263](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L263)

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

Defined in: [data/entities.ts:265](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L265)

The full generated `Faction` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [data/entities.ts:269](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L269)

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [data/entities.ts:273](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L273)

##### Returns

`string`

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: [data/entities.ts:278](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L278)

Units whose `faction_id` is this faction (may be empty for successors).

##### Returns

[`UnitView`](UnitView.md)[]

***

### abilities

#### Get Signature

> **get** **abilities**(): [`AbilityView`](AbilityView.md)[]

Defined in: [data/entities.ts:283](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L283)

Faction-scoped abilities (abilities whose `faction_id` is this faction).

##### Returns

[`AbilityView`](AbilityView.md)[]

***

### weapons

#### Get Signature

> **get** **weapons**(): [`WeaponView`](WeaponView.md)[]

Defined in: [data/entities.ts:288](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L288)

Distinct weapons carried by this faction's units.

##### Returns

[`WeaponView`](WeaponView.md)[]
