[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / BuffContribution

# Type Alias: BuffContribution

> **BuffContribution** = \{ `type`: `"hit-mod"`; `value`: `number`; \} \| \{ `type`: `"wound-mod"`; `value`: `number`; \} \| \{ `type`: `"save-mod"`; `value`: `number`; \} \| \{ `type`: `"cover"`; \} \| \{ `type`: `"reroll"`; `roll`: `"hit"` \| `"wound"` \| `"save"` \| `"damage"`; `subset`: `"ones"` \| `"all-failures"`; \} \| \{ `type`: `"extra-keyword"`; `keywordRef`: [`WeaponKeywordRef`](WeaponKeywordRef.md); \} \| \{ `type`: `"feel-no-pain"`; `threshold`: `number`; \} \| \{ `type`: `"damage-mod"`; `value`: `number`; \} \| \{ `type`: `"attacks-mod"`; `value`: `number`; \} \| \{ `type`: `"strength-mod"`; `value`: `number`; \} \| \{ `type`: `"toughness-mod"`; `value`: `number`; \}

Defined in: [cruncher/buffs.ts:38](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/buffs.ts#L38)

One typed contribution; the engine reads `ResolvedModifiers` for the rest.

## Union Members

### Type Literal

\{ `type`: `"hit-mod"`; `value`: `number`; \}

***

### Type Literal

\{ `type`: `"wound-mod"`; `value`: `number`; \}

***

### Type Literal

\{ `type`: `"save-mod"`; `value`: `number`; \}

***

### Type Literal

\{ `type`: `"cover"`; \}

***

### Type Literal

\{ `type`: `"reroll"`; `roll`: `"hit"` \| `"wound"` \| `"save"` \| `"damage"`; `subset`: `"ones"` \| `"all-failures"`; \}

***

### Type Literal

\{ `type`: `"extra-keyword"`; `keywordRef`: [`WeaponKeywordRef`](WeaponKeywordRef.md); \}

***

### Type Literal

\{ `type`: `"feel-no-pain"`; `threshold`: `number`; \}

***

### Type Literal

\{ `type`: `"damage-mod"`; `value`: `number`; \}

***

### Type Literal

\{ `type`: `"attacks-mod"`; `value`: `number`; \}

Additive modifier to the attacker's per-model attack count (A stat).

***

### Type Literal

\{ `type`: `"strength-mod"`; `value`: `number`; \}

Additive modifier to the attacker's Strength stat.

***

### Type Literal

\{ `type`: `"toughness-mod"`; `value`: `number`; \}

Additive modifier to the defender's Toughness stat.
