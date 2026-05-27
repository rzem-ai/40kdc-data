[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / ArmyCompositionPredicate1

# Interface: ArmyCompositionPredicate1

Defined in: [generated.ts:571](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L571)

Draw-time army-composition predicate gating the operation (e.g. redraw when the opponent lacks a qualifying unit).

## Properties

### subject

> **subject**: `"self"` \| `"opponent"`

Defined in: [generated.ts:575](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L575)

Whose army list the predicate inspects.

***

### quantifier

> **quantifier**: `"any"` \| `"none"`

Defined in: [generated.ts:579](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L579)

Whether the army must contain ('any') or lack ('none') a unit matching unit_filter for the predicate to hold.

***

### unit\_filter

> **unit\_filter**: `object`

Defined in: [generated.ts:583](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L583)

Criteria a unit in the army must satisfy to match. All present criteria must hold (logical AND).

#### model\_count\_min?

> `optional` **model\_count\_min?**: `number`

#### model\_count\_max?

> `optional` **model\_count\_max?**: `number`

#### wounds\_min?

> `optional` **wounds\_min?**: `number`

#### keywords?

> `optional` **keywords?**: [`KeywordList`](../type-aliases/KeywordList.md)
