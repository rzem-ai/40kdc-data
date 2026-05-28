[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / parseKeywordGrant

# Function: parseKeywordGrant()

> **parseKeywordGrant**(`raw`): [`WeaponKeywordRef`](../type-aliases/WeaponKeywordRef.md) \| `null`

Defined in: [cruncher/from-dsl.ts:521](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/from-dsl.ts#L521)

Parse a printed weapon-keyword string (e.g. `"Sustained Hits 1"`,
`"Anti-INFANTRY 4+"`, `"Lethal Hits"`) into a `{keyword_id, parameters?}`
catalog reference, or `null` if the form is unrecognised.

Reverses the conventions baked into the M0 catalog: kebab-case ids,
trailing number → `value`, embedded keyword + threshold → `target_keyword`
+ `threshold`.

## Parameters

### raw

`string`

## Returns

[`WeaponKeywordRef`](../type-aliases/WeaponKeywordRef.md) \| `null`
