[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / maximalLoadout

# Function: maximalLoadout()

> **maximalLoadout**(`unit`, `modelCount`, `options`): [`Loadout`](../interfaces/Loadout.md)

Defined in: [data/loadout.ts:80](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/data/loadout.ts#L80)

The maximal loadout: every base weapon on every model, then each option
applied at its full [optionCap](optionCap.md) (choices take their first branch). Swaps
move count from the replaced id to the added id; add-ons only add.

## Parameters

### unit

[`Unit`](../../generated/interfaces/Unit.md)

### modelCount

`number`

### options

readonly [`WargearOption`](../../generated/interfaces/WargearOption.md)[]

## Returns

[`Loadout`](../interfaces/Loadout.md)
