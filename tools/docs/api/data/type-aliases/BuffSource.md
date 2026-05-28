[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / BuffSource

# Type Alias: BuffSource

> **BuffSource** = \{ `kind`: `"weapon-keyword"`; `weaponId`: `string`; `keywordId`: `string`; \} \| \{ `kind`: `"ability"`; `abilityId`: `string`; `abilityKind`: `"army"` \| `"detachment"` \| `"detachment-stratagem"` \| `"unit"` \| `"leader"` \| `"support"`; \} \| \{ `kind`: `"manual"`; `label`: `string`; \}

Defined in: [cruncher/buffs.ts:16](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L16)

Where a buff originated. Drives stable tie-breaking inside `resolveBuffs`.
