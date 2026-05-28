[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Footprint

# Type Alias: Footprint

> **Footprint** = \{ `type`: `"rectangle"`; `width`: `number`; `height`: `number`; \} \| \{ `type`: `"right-triangle"`; `width`: `number`; `height`: `number`; \} \| \{ `type`: `"polygon"`; `points`: \[[`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), `...Vec2[]`\]; \}

Defined in: [generated.ts:140](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L140)

A terrain piece's 2D footprint, relative to the piece's `position`. Axis-aligned rectangle, right triangle (right angle at the local origin, legs along +x/+y), or an explicit polygon. GW's standard templates (e.g. 7"×11.5" rectangles, 8"×11.5" right triangles, 6"×4" rectangles, 10"×2.5" and 6"×2" lines) are all expressible here; lines are thin rectangles.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "footprint".

## Union Members

### Type Literal

\{ `type`: `"rectangle"`; `width`: `number`; `height`: `number`; \}

***

### Type Literal

\{ `type`: `"right-triangle"`; `width`: `number`; `height`: `number`; \}

***

### Type Literal

\{ `type`: `"polygon"`; `points`: \[[`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), `...Vec2[]`\]; \}

#### type

> **type**: `"polygon"`

#### points

> **points**: \[[`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), [`Vec2`](../interfaces/Vec2.md), `...Vec2[]`\]

##### Min Items

3
