# Blessings of Khorne — Three-Way Comparison

DSL JSON · DSL→English · GW BSData text, per blessing option.

Outer ability: `faction | activated` — roll 8D6 at the start of the battle round, activate up to 2 blessings.

---

## 1. Unbridled Bloodlust

**DSL JSON**
```json
{
  "requirement": { "type": "pair", "min_value": 1 },
  "effect": {
    "type": "charge-roll-modifier",
    "target": "all-friendly",
    "modifier": { "operation": "add", "value": 1 }
  }
}
```

**DSL→EN**
```
need pair of 1+ -> all friendly units get +1 to Charge rolls
```

**GW (BSData)**
> Roll: Double 1+
> Effect: You can re-roll Charge rolls made for this unit.

> [!WARNING]
> **Authoring bug** — DSL encodes `charge-roll-modifier +1`; GW text says full reroll. Should be `re-roll` effect with `subset: "all-failures"`.

---

## 2. Rage-Fuelled Invigoration

**DSL JSON**
```json
{
  "requirement": { "type": "pair", "min_value": 2 },
  "effect": {
    "type": "movement-modifier",
    "target": "all-friendly",
    "modifier": { "move_type": "pile-in-consolidation", "value": 6, "replaces_default": true }
  }
}
```

**DSL→EN**
```
need pair of 2+ -> all friendly units have the Pile in Consolidation 6" ability
```

**GW (BSData)**
> Roll: Double 2+
> Effect: Each time a model in this unit makes a Pile-In or Consolidation move, it can move up to 6" instead of up to 3".

✅ Clean match.

---

## 3. Total Carnage

**DSL JSON**
```json
{
  "requirement": { "type": "pair", "min_value": 3 },
  "effect": {
    "type": "conditional",
    "condition": {
      "operator": "and",
      "operands": [
        { "type": "destroyed-by-attack-type", "parameters": { "attack_type": "melee" } },
        { "type": "has-fought-this-phase", "negated": true }
      ]
    },
    "effect": {
      "type": "dice-gated",
      "dice": "D6",
      "threshold": 4,
      "on_success": { "type": "fight-on-death", "target": "self", "modifier": {} },
      "on_fail": null
    }
  }
}
```

**DSL→EN**
```
need pair of 3+ -> when destroyed by a melee attack, if not has fought this phase,
roll one D6: on a 4+, each time this model is destroyed, it can fight before being
removed from play
```

**GW (BSData)**
> Roll: Double 3+
> Effect: Each time a model in this unit is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking **model's unit** has finished making its attacks, and is then removed from play.

> [!NOTE]
> **Minor gap** — DSL omits the "after the attacking model's unit finishes" timing precision. Mechanically equivalent but less faithful.

---

## 4. Martial Excellence

**DSL JSON**
```json
{
  "requirement": { "type": "pair", "min_value": 4 },
  "effect": {
    "type": "keyword-grant",
    "target": "all-friendly",
    "modifier": { "keyword": "Sustained Hits 1", "weapon_type": "melee" }
  }
}
```

**DSL→EN**
```
need pair of 4+ -> all friendly units' melee weapons gain [SUSTAINED HITS 1]
```

**GW (BSData)**
> Roll: Double 4+ **or Triple 1+**
> Effect: Melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.

> [!WARNING]
> **Authoring gap** — DSL `requirement` only encodes `pair 4+`. The alternate `triple 1+` path is missing. The `requirement` schema needs a second entry or an `or` form.

---

## 5. Warp Blades

**DSL JSON**
```json
{
  "requirement": { "type": "pair", "min_value": 5 },
  "effect": {
    "type": "keyword-grant",
    "target": "all-friendly",
    "modifier": { "keyword": "Lethal Hits", "weapon_type": "melee" }
  }
}
```

**DSL→EN**
```
need pair of 5+ -> all friendly units' melee weapons gain [LETHAL HITS]
```

**GW (BSData)**
> Roll: Double 5+ **or Triple 2+**
> Effect: Melee weapons equipped by models in this unit have the [LETHAL HITS] ability.

> [!WARNING]
> **Authoring gap** — Same issue as Martial Excellence. `triple 2+` alternate is missing from the requirement.

---

## 6. Decapitating Strikes

**DSL JSON**
```json
{
  "requirement": { "type": "triple", "min_value": 6 },
  "effect": {
    "type": "conditional",
    "condition": {
      "operator": "and",
      "operands": [
        { "type": "target-has-keyword", "parameters": { "keyword": "Infantry" } },
        { "type": "attack-is-type", "parameters": { "attack_type": "melee" } }
      ]
    },
    "effect": {
      "type": "keyword-grant",
      "target": "all-friendly",
      "modifier": { "keyword": "Devastating Wounds" }
    }
  }
}
```

**DSL→EN**
```
need triple of 6+ -> against Infantry targets, with melee attacks, all friendly
units' weapons gain [DEVASTATING WOUNDS]
```

**GW (BSData)**
> Roll: **Double 6+ or Triple 3+**
> Effect: Each time a model in this unit makes a melee attack that targets an Infantry unit, that attack has the [DEVASTATING WOUNDS] ability.

> [!WARNING]
> **Authoring bug** — DSL says `triple 6+`; GW says `Double 6+ or Triple 3+`. Wrong requirement type (`triple` instead of `pair`) and wrong value (6 instead of 6 for pair, 3 instead of 6 for triple). The most broken of the three.

---

## Issues Summary

| Blessing | Status | Issue |
|---|---|---|
| Unbridled Bloodlust | ⚠️ Bug | `charge-roll-modifier +1` should be `re-roll all-failures` |
| Rage-Fuelled Invigoration | ✅ | — |
| Total Carnage | 🔸 Minor | Missing "after attacking model's unit finishes" timing |
| Martial Excellence | ⚠️ Gap | Missing `triple 1+` alternate requirement |
| Warp Blades | ⚠️ Gap | Missing `triple 2+` alternate requirement |
| Decapitating Strikes | ⚠️ Bug | Wrong requirement: `triple 6+` → should be `pair 6+` or `triple 3+` |
