[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / BuffApplicability

# Type Alias: BuffApplicability

> **BuffApplicability** = `object`

Defined in: [cruncher/buffs.ts:59](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L59)

Optional gating; the resolver drops buffs whose gate fails.

## Properties

### phases?

> `optional` **phases?**: [`Phase`](../../generated/type-aliases/Phase.md)[]

Defined in: [cruncher/buffs.ts:60](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L60)

***

### rollType?

> `optional` **rollType?**: `"hit"` \| `"wound"` \| `"save"` \| `"damage"`

Defined in: [cruncher/buffs.ts:61](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L61)

***

### requiresTargetKeyword?

> `optional` **requiresTargetKeyword?**: `string`

Defined in: [cruncher/buffs.ts:63](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L63)

Target must carry this keyword (case-insensitive).

***

### requiresAttackerKeyword?

> `optional` **requiresAttackerKeyword?**: `string`

Defined in: [cruncher/buffs.ts:65](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L65)

Attacker must carry this keyword (case-insensitive).
