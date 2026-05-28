[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / Collection

# Class: Collection\<T, V\>

Defined in: [data/collection.ts:45](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L45)

A collection of one entity type, exposing id/name/faction lookups.

Iterable: `for (const unit of units) { … }`.

## Type Parameters

### T

`T`

the raw (generated) record type

### V

`V`

the linked view type returned to callers

## Implements

- `Iterable`\<`V`\>

## Constructors

### Constructor

> **new Collection**\<`T`, `V`\>(`cfg`): `Collection`\<`T`, `V`\>

Defined in: [data/collection.ts:53](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L53)

#### Parameters

##### cfg

[`CollectionConfig`](../interfaces/CollectionConfig.md)\<`T`, `V`\>

#### Returns

`Collection`\<`T`, `V`\>

## Accessors

### all

#### Get Signature

> **get** **all**(): `V`[]

Defined in: [data/collection.ts:76](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L76)

Every record, deduplicated by id, in first-seen order.

##### Returns

`V`[]

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [data/collection.ts:81](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L81)

Number of distinct records.

##### Returns

`number`

## Methods

### get()

> **get**(`id`): `V` \| `undefined`

Defined in: [data/collection.ts:86](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L86)

Look up by exact id.

#### Parameters

##### id

`string`

#### Returns

`V` \| `undefined`

***

### has()

> **has**(`id`): `boolean`

Defined in: [data/collection.ts:92](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L92)

Whether a record with this exact id exists.

#### Parameters

##### id

`string`

#### Returns

`boolean`

***

### find()

> **find**(`query`): `V` \| `undefined`

Defined in: [data/collection.ts:106](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L106)

Find one record by id or name. Name matching is diacritic- and
punctuation-insensitive (see [normalizeName](../functions/normalizeName.md)), trying, in order:
exact id → exact normalized name → normalized-name substring. Returns the
first match; names can repeat across factions, so use [findAll](#findall) or
[byFaction](#byfaction) when a query may be ambiguous.

#### Parameters

##### query

`string`

#### Returns

`V` \| `undefined`

#### Example

```ts
units.find("Kharn"); // resolves "Khârn the Betrayer"
```

***

### findAll()

> **findAll**(`query`): `V`[]

Defined in: [data/collection.ts:116](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L116)

All records matching a query, by the same rules as [find](#find). An exact id
match returns just that record; otherwise every normalized-name-exact match
is returned, falling back to every normalized-name-substring match. Useful
to surface (rather than silently collapse) names shared across factions.

#### Parameters

##### query

`string`

#### Returns

`V`[]

***

### byFaction()

> **byFaction**(`factionId`): `V`[]

Defined in: [data/collection.ts:131](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L131)

All records belonging to a faction id (empty if the type has no faction).

#### Parameters

##### factionId

`string`

#### Returns

`V`[]

***

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`V`\>

Defined in: [data/collection.ts:135](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/collection.ts#L135)

#### Returns

`Iterator`\<`V`\>

#### Implementation of

`Iterable.[iterator]`
