[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / crunch

# Function: crunch()

> **crunch**(`input`, `dataset?`): [`EngineOutput`](../type-aliases/EngineOutput.md)

Defined in: [cruncher/engine.ts:53](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/engine.ts#L53)

Compute the expected per-stage projection for one (attacker, target, buffs)
triple. The dataset defaults to the embedded one — pass an alternate when
crunching against a different bundle (e.g. tests).

## Parameters

### input

[`EngineInput`](../type-aliases/EngineInput.md)

### dataset?

[`Dataset`](../classes/Dataset.md)

## Returns

[`EngineOutput`](../type-aliases/EngineOutput.md)
