[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / ResolvedModifiers

# Type Alias: ResolvedModifiers

> **ResolvedModifiers** = `object`

Defined in: [cruncher/buffs.ts:101](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L101)

Read-out of a resolved buff stack, with provenance per field.

## Properties

### hitMod

> **hitMod**: `object`

Defined in: [cruncher/buffs.ts:102](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L102)

#### value

> **value**: `number`

#### dominantSource

> **dominantSource**: [`BuffSource`](BuffSource.md) \| `null`

***

### woundMod

> **woundMod**: `object`

Defined in: [cruncher/buffs.ts:103](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L103)

#### value

> **value**: `number`

#### dominantSource

> **dominantSource**: [`BuffSource`](BuffSource.md) \| `null`

***

### saveMod

> **saveMod**: `object`

Defined in: [cruncher/buffs.ts:104](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L104)

#### value

> **value**: `number`

#### sources

> **sources**: [`BuffSource`](BuffSource.md)[]

***

### cover

> **cover**: `object`

Defined in: [cruncher/buffs.ts:105](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L105)

#### active

> **active**: `boolean`

#### source

> **source**: [`BuffSource`](BuffSource.md) \| `null`

***

### rerolls

> **rerolls**: `Partial`\<`Record`\<`"hit"` \| `"wound"` \| `"save"` \| `"damage"`, \{ `subset`: `"ones"` \| `"all-failures"`; `dominantSource`: [`BuffSource`](BuffSource.md); \}\>\>

Defined in: [cruncher/buffs.ts:106](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L106)

***

### extraKeywords

> **extraKeywords**: `object`[]

Defined in: [cruncher/buffs.ts:112](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L112)

#### keywordRef

> **keywordRef**: [`WeaponKeywordRef`](WeaponKeywordRef.md)

#### source

> **source**: [`BuffSource`](BuffSource.md)

***

### feelNoPain

> **feelNoPain**: \{ `threshold`: `number`; `dominantSource`: [`BuffSource`](BuffSource.md); \} \| `null`

Defined in: [cruncher/buffs.ts:113](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L113)

***

### damageMod

> **damageMod**: `object`

Defined in: [cruncher/buffs.ts:114](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L114)

#### value

> **value**: `number`

#### sources

> **sources**: [`BuffSource`](BuffSource.md)[]

***

### attacksMod

> **attacksMod**: `object`

Defined in: [cruncher/buffs.ts:115](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L115)

#### value

> **value**: `number`

#### sources

> **sources**: [`BuffSource`](BuffSource.md)[]

***

### strengthMod

> **strengthMod**: `object`

Defined in: [cruncher/buffs.ts:116](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L116)

#### value

> **value**: `number`

#### sources

> **sources**: [`BuffSource`](BuffSource.md)[]

***

### toughnessMod

> **toughnessMod**: `object`

Defined in: [cruncher/buffs.ts:117](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L117)

#### value

> **value**: `number`

#### sources

> **sources**: [`BuffSource`](BuffSource.md)[]
