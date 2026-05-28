[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / SecondaryCard

# Interface: SecondaryCard

Defined in: [generated.ts:727](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L727)

An 11e mission card. The deck-level rule (draw 2 per turn, keep unscored cards) is separate and not modelled here. This is the per-card shape: an optional on-draw deck operation, an optional player action, and zero or more VP-award blocks. Primary mission cards reuse this shape via card_type. Mechanic blocks reference the Ability DSL; prose is community-authored (no reproduced rules text).

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "secondary-card".

## Properties

### id

> **id**: `string`

Defined in: [generated.ts:728](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L728)

***

### name

> **name**: `string`

Defined in: [generated.ts:729](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L729)

***

### card\_type?

> `optional` **card\_type?**: `"secondary"` \| `"primary"`

Defined in: [generated.ts:733](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L733)

Whether this is a secondary card or a primary mission card (which reuses this shape).

***

### subtype?

> `optional` **subtype?**: `string`

Defined in: [generated.ts:737](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L737)

Finer classification within the deck (e.g. a category or tactical/fixed split). Free-form — not enum-locked until 11e categories are confirmed.

***

### when\_drawn?

> `optional` **when\_drawn?**: `object`

Defined in: [generated.ts:741](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L741)

Optional deck operation performed when this card is drawn (e.g. redraw, swap). Distinct from combat effects — deck operations have no combat target, so they are not modelled via the Ability DSL effect language. If `condition` is present, the operation fires only when the predicate holds.

#### operation

> **operation**: `"replace"` \| `"reshuffle"` \| `"redraw"` \| `"draw-extra"` \| `"swap"`

The deck manipulation this card triggers on draw.

#### card\_ids?

> `optional` **card\_ids?**: `string`[]

Other cards this operation references, by id.

#### condition?

> `optional` **condition?**: [`ArmyCompositionPredicate1`](ArmyCompositionPredicate1.md)

***

### action?

> `optional` **action?**: `object`

Defined in: [generated.ts:755](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L755)

Optional player action the card enables.

#### starts?

> `optional` **starts?**: `"command"` \| `"movement"` \| `"shooting"` \| `"charge"` \| `"fight"`

The five official game phases. Unchanged between 10th and 11th edition — 11e reorders Pile In timing within the Fight phase but adds no top-level phase.

#### player\_turn?

> `optional` **player\_turn?**: [`PlayerTurn`](../type-aliases/PlayerTurn.md)

#### units?

> `optional` **units?**: [`AbilityCondition`](../type-aliases/AbilityCondition.md)

#### use\_limit?

> `optional` **use\_limit?**: `number`

Maximum number of times the action may be performed.

#### completes?

> `optional` **completes?**: [`AbilityCondition1`](../type-aliases/AbilityCondition1.md)

#### effect?

> `optional` **effect?**: `unknown`

***

### awards?

> `optional` **awards?**: \[\{\[`k`: `string`\]: `unknown`; \} \| \{\[`k`: `string`\]: `unknown`; \}, ...(\{ \[k: string\]: unknown \} \| \{ \[k: string\]: unknown \})\[\]\]

Defined in: [generated.ts:774](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L774)

VP-award blocks: each scores when `trigger` fires and the optional `when` condition holds. An award scores either a flat `vp` or a count-scaled `vp_per` (VP per instance of the thing named by `per`). Awards accrue independently and sum; a card's '+ ... CUMULATIVE' rows are modelled as separate awards flagged `cumulative` for faithful round-trip.

#### Min Items

1

***

### text?

> `optional` **text?**: `string`

Defined in: [generated.ts:795](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L795)

Community-authored card description (original prose only — no reproduced rules text).

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:796](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L796)
