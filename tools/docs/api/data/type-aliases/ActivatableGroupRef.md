[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / ActivatableGroupRef

# Type Alias: ActivatableGroupRef

> **ActivatableGroupRef** = `object`

Defined in: [cruncher/from-dsl.ts:46](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/cruncher/from-dsl.ts#L46)

A mutually-limited pool of [ActivatableBuff](ActivatableBuff.md) levers. Dice-pool
allocations cap how many options fire at once (`max_activations`); a `choice`
lets the player pick exactly one. Levers sharing a `group.id` are subject to
that cap — the SPA greys out further checkboxes once it's reached, and an
optimizer enumerates subsets within it.

## Properties

### id

> **id**: `string`

Defined in: [cruncher/from-dsl.ts:47](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/cruncher/from-dsl.ts#L47)

***

### maxActivations

> **maxActivations**: `number`

Defined in: [cruncher/from-dsl.ts:48](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/cruncher/from-dsl.ts#L48)
