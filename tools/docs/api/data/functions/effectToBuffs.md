[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / effectToBuffs

# Function: effectToBuffs()

> **effectToBuffs**(`effect`, `source`, `context`, `perspective?`): [`EffectTranslation`](../type-aliases/EffectTranslation.md)

Defined in: [cruncher/from-dsl.ts:77](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/cruncher/from-dsl.ts#L77)

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
