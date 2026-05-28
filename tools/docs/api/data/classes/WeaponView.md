[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / WeaponView

# Class: WeaponView

Defined in: [data/entities.ts:140](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L140)

A weapon, linked to the units that carry it.

## Constructors

### Constructor

> **new WeaponView**(`raw`, `ds`): `WeaponView`

Defined in: [data/entities.ts:141](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L141)

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

Defined in: [data/entities.ts:143](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L143)

The full generated `Weapon` record.

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [data/entities.ts:147](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L147)

##### Returns

`string`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [data/entities.ts:151](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L151)

##### Returns

`string`

***

### units

#### Get Signature

> **get** **units**(): [`UnitView`](UnitView.md)[]

Defined in: [data/entities.ts:156](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L156)

Units that list this weapon in their `weapon_ids`.

##### Returns

[`UnitView`](UnitView.md)[]

## Methods

### profileAt()

> **profileAt**(`i?`): \{ `name`: `string`; `range?`: `number` \| `"Melee"`; `stats`: \{\[`k`: `string`\]: `unknown`; `A`: [`StatValue`](../../generated/type-aliases/StatValue.md); `BS?`: `number` \| `null`; `WS?`: `number` \| `null`; `S`: [`StatValue`](../../generated/type-aliases/StatValue.md); `AP`: `number`; `D`: [`StatValue`](../../generated/type-aliases/StatValue.md); \}; `keywords?`: `object`[]; \} \| \{ `name`: `string`; `range?`: `number` \| `"Melee"`; `stats`: \{\[`k`: `string`\]: `unknown`; `A`: [`StatValue`](../../generated/type-aliases/StatValue.md); `BS?`: `number` \| `null`; `WS?`: `number` \| `null`; `S`: [`StatValue`](../../generated/type-aliases/StatValue.md); `AP`: `number`; `D`: [`StatValue`](../../generated/type-aliases/StatValue.md); \}; `keywords?`: `object`[]; \}

Defined in: [data/entities.ts:161](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L161)

The stat profile at index `i` (default 0).

#### Parameters

##### i?

`number` = `0`

#### Returns

##### Type Literal

\{ `name`: `string`; `range?`: `number` \| `"Melee"`; `stats`: \{\[`k`: `string`\]: `unknown`; `A`: [`StatValue`](../../generated/type-aliases/StatValue.md); `BS?`: `number` \| `null`; `WS?`: `number` \| `null`; `S`: [`StatValue`](../../generated/type-aliases/StatValue.md); `AP`: `number`; `D`: [`StatValue`](../../generated/type-aliases/StatValue.md); \}; `keywords?`: `object`[]; \}

###### name

> **name**: `string`

###### range?

> `optional` **range?**: `number` \| `"Melee"`

###### stats

> **stats**: `object`

###### Index Signature

\[`k`: `string`\]: `unknown`

###### stats.A

> **A**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### stats.BS?

> `optional` **BS?**: `number` \| `null`

###### stats.WS?

> `optional` **WS?**: `number` \| `null`

###### stats.S

> **S**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### stats.AP

> **AP**: `number`

###### stats.D

> **D**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### keywords?

> `optional` **keywords?**: `object`[]

References into the weapon-keyword catalog. Each entry names the catalog id and supplies parameter values (e.g. `Sustained Hits 1` → `{keyword_id: 'sustained-hits', parameters: {value: 1}}`).

***

##### Type Literal

\{ `name`: `string`; `range?`: `number` \| `"Melee"`; `stats`: \{\[`k`: `string`\]: `unknown`; `A`: [`StatValue`](../../generated/type-aliases/StatValue.md); `BS?`: `number` \| `null`; `WS?`: `number` \| `null`; `S`: [`StatValue`](../../generated/type-aliases/StatValue.md); `AP`: `number`; `D`: [`StatValue`](../../generated/type-aliases/StatValue.md); \}; `keywords?`: `object`[]; \}

###### name

> **name**: `string`

###### range?

> `optional` **range?**: `number` \| `"Melee"`

###### stats

> **stats**: `object`

###### Index Signature

\[`k`: `string`\]: `unknown`

###### stats.A

> **A**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### stats.BS?

> `optional` **BS?**: `number` \| `null`

###### stats.WS?

> `optional` **WS?**: `number` \| `null`

###### stats.S

> **S**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### stats.AP

> **AP**: `number`

###### stats.D

> **D**: [`StatValue`](../../generated/type-aliases/StatValue.md)

###### keywords?

> `optional` **keywords?**: `object`[]

References into the weapon-keyword catalog. Each entry names the catalog id and supplies parameter values (e.g. `Sustained Hits 1` → `{keyword_id: 'sustained-hits', parameters: {value: 1}}`).

***

### keywordsAt()

> **keywordsAt**(`i?`): `object`[]

Defined in: [data/entities.ts:175](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L175)

Catalog views for each keyword referenced by profile `i`, paired with the
reference-site parameters. Unresolved keyword ids are skipped.

#### Parameters

##### i?

`number` = `0`

#### Returns

`object`[]

***

### profileBuffs()

> **profileBuffs**(`i`, `context`): [`Buff`](../type-aliases/Buff.md)[]

Defined in: [data/entities.ts:197](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/entities.ts#L197)

Buffs contributed by profile `i`'s intrinsic keywords against `context` —
the natural "what does this profile bring on its own?" call the engine
makes automatically before adding ability/manual buffs.

#### Parameters

##### i

`number` \| `undefined`

##### context

[`EngineContext`](../type-aliases/EngineContext.md)

#### Returns

[`Buff`](../type-aliases/Buff.md)[]
