[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / WeaponKeyword

# Interface: WeaponKeyword

Defined in: [generated.ts:1136](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1136)

Catalog entry for a weapon keyword (Lethal Hits, Sustained Hits N, Anti-X N+, etc.). Each weapon profile references entries here via {keyword_id, parameters?} instead of carrying free-text strings. The optional `effect` describes the keyword's game mechanic in the Ability DSL; null when the behaviour is faction-specific flavour not yet modelled.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "weapon-keyword".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:1137](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1137)

***

### name

> **name**: `string`

Defined in: [generated.ts:1138](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1138)

***

### required\_parameters

> **required\_parameters**: \[\] \| \[`"value"` \| `"threshold"` \| `"target_keyword"`\] \| \[`"value"` \| `"threshold"` \| `"target_keyword"`, `"value"` \| `"threshold"` \| `"target_keyword"`\] \| \[`"value"` \| `"threshold"` \| `"target_keyword"`, `"value"` \| `"threshold"` \| `"target_keyword"`, `"value"` \| `"threshold"` \| `"target_keyword"`\]

Defined in: [generated.ts:1144](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1144)

Parameter keys that must be supplied at each reference site, in the order they would appear in a printed datasheet (e.g. Anti-INFANTRY 4+ → ['target_keyword', 'threshold']).

#### Max Items

3

***

### effect

> **effect**: [`AbilityEffect1`](../type-aliases/AbilityEffect1.md) \| `null`

Defined in: [generated.ts:1156](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1156)

Mechanical effect of this keyword. Null when the behaviour is faction-specific flavour not yet expressible in the DSL — engines treat such references as no-op buffs and may surface them as 'cannot auto-apply'.

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:1157](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L1157)
