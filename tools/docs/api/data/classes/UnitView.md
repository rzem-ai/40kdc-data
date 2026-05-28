[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / UnitView

# Class: UnitView

Defined in: [data/entities.ts:26](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L26)

A unit, linked to its faction, weapons, and abilities.

## Constructors

### Constructor

> **new UnitView**(`raw`, `ds`): `UnitView`

Defined in: [data/entities.ts:27](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L27)

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

Defined in: [data/entities.ts:29](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L29)

The full generated `Unit` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [data/entities.ts:33](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L33)

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [data/entities.ts:37](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L37)

##### Returns

`string`

***

### faction

#### Get Signature

> **get** **faction**(): [`FactionView`](FactionView.md) \| `undefined`

Defined in: [data/entities.ts:42](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L42)

The unit's faction, or `undefined` if its `faction_id` is unknown.

##### Returns

[`FactionView`](FactionView.md) \| `undefined`

***

### weapons

#### Get Signature

> **get** **weapons**(): [`WeaponView`](WeaponView.md)[]

Defined in: [data/entities.ts:47](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L47)

Weapons referenced by `weapon_ids`; unresolved ids are skipped.

##### Returns

[`WeaponView`](WeaponView.md)[]

***

### abilities

#### Get Signature

> **get** **abilities**(): [`AbilityView`](AbilityView.md)[]

Defined in: [data/entities.ts:52](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L52)

Abilities referenced by `ability_ids`; unresolved ids are skipped.

##### Returns

[`AbilityView`](AbilityView.md)[]

## Methods

### profileAt()

> **profileAt**(`i?`): \{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../../generated/type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \} \| \{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../../generated/type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \}

Defined in: [data/entities.ts:61](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L61)

The stat profile at index `i` (default 0). Returns the schema-generated
profile object directly so callers can feed it straight to the engine
without an intermediate wrapper.

#### Parameters

##### i?

`number` = `0`

#### Returns

##### Type Literal

\{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../../generated/type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \}

##### Index Signature

\[`k`: `string`\]: `unknown`

###### name?

> `optional` **name?**: `string`

Profile name (e.g., 'Wounded' for degrading)

###### M

> **M**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### T

> **T**: `number`

###### W

> **W**: `number`

###### Sv

> **Sv**: `number`

###### invuln\_sv?

> `optional` **invuln\_sv?**: `number` \| `null`

###### Ld

> **Ld**: `number`

###### OC

> **OC**: `number`

***

##### Type Literal

\{\[`k`: `string`\]: `unknown`; `name?`: `string`; `M`: [`StatValue`](../../generated/type-aliases/StatValue.md); `T`: `number`; `W`: `number`; `Sv`: `number`; `invuln_sv?`: `number` \| `null`; `Ld`: `number`; `OC`: `number`; \}

##### Index Signature

\[`k`: `string`\]: `unknown`

###### name?

> `optional` **name?**: `string`

Profile name (e.g., 'Wounded' for degrading)

###### M

> **M**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### T

> **T**: `number`

###### W

> **W**: `number`

###### Sv

> **Sv**: `number`

###### invuln\_sv?

> `optional` **invuln\_sv?**: `number` \| `null`

###### Ld

> **Ld**: `number`

###### OC

> **OC**: `number`
