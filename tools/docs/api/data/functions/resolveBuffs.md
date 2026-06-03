[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / resolveBuffs

# Function: resolveBuffs()

> **resolveBuffs**(`buffs`, `ctx`): [`ResolvedModifiers`](../type-aliases/ResolvedModifiers.md)

Defined in: [cruncher/buffs.ts:235](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/cruncher/buffs.ts#L235)

Collapse a flat buff stack into a [ResolvedModifiers](../type-aliases/ResolvedModifiers.md) read-out. Pure
function; the engine — and any UI that wants to render the resolved table
before crunching — both go through this.

## Parameters

### buffs

[`Buff`](../type-aliases/Buff.md)[]

### ctx

[`EngineContext`](../type-aliases/EngineContext.md)

## Returns

[`ResolvedModifiers`](../type-aliases/ResolvedModifiers.md)
