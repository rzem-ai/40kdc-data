[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / effectToBuffs

# Function: effectToBuffs()

> **effectToBuffs**(`effect`, `source`, `context`, `perspective?`): [`EffectTranslation`](../type-aliases/EffectTranslation.md)

Defined in: [cruncher/from-dsl.ts:119](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/cruncher/from-dsl.ts#L119)

Walk an ability DSL `effect` tree and produce the buff stack it contributes
against `context` from the given `perspective`, plus an `unsupported` list
naming any branches the buff layer can't express today.

## Parameters

### effect

`unknown`

### source

[`BuffSource`](../type-aliases/BuffSource.md)

### context

[`EngineContext`](../type-aliases/EngineContext.md)

### perspective?

[`TranslationPerspective`](../type-aliases/TranslationPerspective.md) = `"attacker"`

## Returns

[`EffectTranslation`](../type-aliases/EffectTranslation.md)
