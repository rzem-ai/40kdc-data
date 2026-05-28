[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / buffsFromKeyword

# Function: buffsFromKeyword()

> **buffsFromKeyword**(`args`): [`Buff`](../type-aliases/Buff.md)[]

Defined in: [cruncher/from-keyword.ts:41](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/from-keyword.ts#L41)

Convert a single weapon-keyword reference (catalog effect + reference-site
parameters) into the buff contributions it makes against `context`.

## Parameters

### args

#### keywordId

`string`

#### weaponId

`string`

#### effect

`unknown`

#### parameters?

`Record`\<`string`, `unknown`\>

#### context

[`EngineContext`](../type-aliases/EngineContext.md)

## Returns

[`Buff`](../type-aliases/Buff.md)[]
