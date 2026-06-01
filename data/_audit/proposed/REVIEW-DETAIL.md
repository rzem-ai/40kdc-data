# Stub authoring — full review

Every proposal from the last `author:propose --all`, with what the model produced and why the verifier accepted/rejected it. Source rule text is intentionally absent (IP).

Total 121 · auto-applied 14 · residue 107.

## ✅ Applied (gate passed)

- **Runes of Fortune (Psychic)** `aeldari/runes-of-fortune-psychic` · units: warlock
  - chose: `roll-modifier` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:conditional,condition:{type:charged-this-turn},effect:{type:roll-modifier,target:attacker,modifier:{operation:subt`

- **Tanith Camo-cloaks** `astra-militarum/tanith-camo-cloaks` · units: gaunts-ghosts
  - chose: `keyword-grant` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:keyword-grant,target:unit,modifier:{keywords:[benefit-of-cover]}}`
  - verifier: Core mechanic and scope correct; models keyword grant for entire battle as stated.

- **Bounding Assault** `chaos-daemons/bounding-assault` · units: pox-riders
  - chose: `keyword-grant` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:conditional,condition:{type:charged-this-turn},effect:{type:keyword-grant,target:unit,modifier:{keywords:[lance]}}`

- **Emissary of the Great Mutator (Aura)** `chaos-daemons/emissary-of-the-great-mutator-aura` · units: aetaosraukeres
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:leadership-modifier,target:friendly-within-aura,modifier:{test:battle-shock,operation:re-roll}}`

- **Emissary of the Blood God (Aura)** `chaos-daemons/emissary-of-the-blood-god-aura` · units: anggrath-the-unbound
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:leadership-modifier,target:friendly-within-aura,modifier:{test:battle-shock,operation:re-roll}}`

- **Feculent Despair (Aura, Psychic)** `chaos-space-marines/feculent-despair-aura-psychic` · units: sorcerer-on-palanquin-of-nurgle
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:leadership-modifier,target:enemy-within-aura,modifier:{operation:subtract,value:1}}`

- **Enforcer** `chaos-space-marines/enforcer` · units: renegade-enforcer
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✓
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:charge-after-fallback}}`

- **Devoted to Pain** `drukhari/devoted-to-pain` · units: talos
  - chose: `keyword-grant` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:keyword-grant,target:self,modifier:{keywords:[twin-linked],condition:equipped_with_two_macro_scalpels}}`

- **Serpentine** `emperors-children/serpentine` · units: fulgrim
  - chose: `movement-modifier` · conf medium · schema ✓ · faithful ✓
  - proposed: `{type:movement-modifier,target:self,modifier:{move_type:terrain-crossing,height_limit:4,applies_to_moves:[normal,advance`

- **Haloed in Soulfire (Psychic)** `grey-knights/haloed-in-soulfire-psychic` · units: brotherhood-librarian
  - chose: `attack-restriction` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:attack-restriction,target:unit,modifier:{restriction:wit`

- **The Lord’s Will** `necrons/the-lord-s-will` · units: lord
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:ability-grant,target:unit,modifier:{ability_id:stratagem`

- **Enslaved Star God** `necrons/enslaved-star-god` · units: ctan-shard-of-the-nightbringer, ctan-shard-of-the-void-dragon, ctan-shard-of-the-deceiver, transcendent-ctan
  - chose: `attack-restriction` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:attack-restriction,target:self,modifier:{restriction:cannot-be-warlord}}`

- **C’tan Shard** `necrons/ctan-shard` · units: transcendent-ctan
  - chose: `attack-restriction` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:attack-restriction,target:self,modifier:{restriction:cannot-receive-enhancements}}`

- **Arch-Sorcerer of Tzeentch (Psychic)** `thousand-sons/arch-sorcerer-of-tzeentch-psychic` · units: ahriman
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✓
  - proposed: `{type:leadership-modifier,target:self,modifier:{operation:add,value:1}}`
  - verifier: Core mechanic correct. Leadership-modifier +1 to Psychic test applies implicitly to Ritual attempts. Target, scope, and effect value all match the rule.


## ❌ Residue — grouped by the effect_type the model chose

### `ability-grant` — 29

- **Consecrated Ground** `adepta-sororitas/consecrated-ground` · units: battle-sanctum
  - chose: `ability-grant` · conf medium · schema ✗ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:friendly-within-aura,modifier:{grant_type:additional-act-of-faith}}`
  - verifier: (no issue text)

- **Stabilised Disembarkation** `adeptus-astartes/stabilised-disembarkation` · units: repulsor
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:ability-grant,target:unit,modifier:`
  - verifier: Missing trigger condition: 'each time an enemy unit has shot, if any of those attacks targeted this TRANSPORT.' The DSL grants a generic ability without modeling the specific phase-based trigger or the placement restrict

- **Driven by Fury** `adeptus-astartes/driven-by-fury` · units: death-company-dreadnought
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:ability-grant,target:self,modifier:`
  - verifier: Missing trigger: 'each time an enemy unit has shot, if this model was hit by one or more of those attacks.' Missing restrictions: 'cannot make a Driven by Fury move while it is Battle-shocked or within Engagement Range o

- **Aerial Deployment** `adeptus-astartes/aerial-deployment` · units: thunderhawk-transporter
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:movement}},effect:{type:ability-grant,target:self,modifier:`
  - verifier: Wrong core mechanic. This is a setup/reinforcement rule, not an ability that is granted during the game. Missing precondition: 'If this model starts the game in Hover mode and in Strategic Reserves.' Missing phase limit:

- **Primarch of the First Legion** `adeptus-astartes/primarch-of-the-first-legion` · units: lion-eljonson
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✓ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:command}},effect:{type:ability-grant,target:self,modifier:{`
  - verifier: Duration imprecisely captured. The rule states the abilities last 'until the start of your next Command phase,' but the scope duration is modeled as 'turn.' Depending on the interpretation, this could be shorter than int

- **Mission Tactics** `adeptus-astartes/mission-tactics` · units: decimus-kill-team
  - chose: `ability-grant` · conf low · schema ✓ · faithful ✗
  - proposed: `{type:ability-grant,target:self,modifier:{}}`
  - verifier: No rule provided—cannot validate. The authored DSL is a generic placeholder (empty ability grant) with no rule text to judge against.

- **Towering Wraith Construct** `aeldari/towering-wraith-construct` · units: revenant-titan
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✓ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:increased-stratagem-cost,multiplier:2}}`

- **Burning Lance** `aeldari/burning-lance` · units: fuegan
  - chose: `ability-grant` · conf low · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:ability-grant,target:unit,modifier:{grant_type:weapon-ra`
  - verifier: Core mechanic correct but missing weapon-type qualifier: rule specifies Melta weapons only, DSL applies to all ranged weapons.

- **Hallucinogen Grenades** `aeldari/hallucinogen-grenades` · units: starfangs
  - chose: `ability-grant` · conf high · schema ✗ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:friendly-within-aura,modifier:{ability_id:stealth}}`
  - verifier: (no issue text)

- **Cry of the Wind** `aeldari/cry-of-the-wind` · units: baharroth
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✓ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:unmodified-hit-critical}}`

- **The Path Least Travelled** `aeldari/the-path-least-travelled` · units: amallyn-shadowguide
  - chose: `ability-grant` · conf low · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:redeploy-with-reserves-exception}}`
  - verifier: Scope fundamentally wrong: rule is one-time pre-game repositioning action; DSL models as battle-duration grant. Missing unit-type restriction (Rangers or Shroud Runners only). Timing and constraints both broken.

- **Seed the Garden of Nurgle** `chaos-daemons/seed-the-garden-of-nurgle` · units: horticulous-slimux
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:shadow-of-chaos-terrain-designation}}`
  - verifier: The rule has explicit phase timing ('At the end of your Movement phase') and a spatial condition ('if this model is within one AREA TERRAIN Feature'). The authored DSL omits both: it lacks the phase trigger (Movement pha

- **Grotesque Regeneration** `chaos-daemons/grotesque-regeneration` · units: beasts-of-nurgle
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:full-wound-restoration}}`
  - verifier: The effect type 'ability-grant' is wrong — this rule is a passive healing mechanic that triggers at phase end, not an ability being conferred. The rule also omits: (1) phase timing ('At the end of each phase'), (2) the c

- **Shadow Form Abilities** `chaos-daemons/shadow-form-abilities` · units: belakor
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:shadow-form-selection}}`

- **Supreme Commander** `chaos-daemons/supreme-commander` · units: belakor
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:mandatory-warlord-designation}}`
  - verifier: The effect type 'ability-grant' is mechanically wrong. The rule is an army composition constraint ('it must be your WARLORD'), not an ability or game mechanic that can be granted. This is a designator/constraint, not an 

- **Grav-pinned** `chaos-knights/grav-pinned` · units: chaos-questoris-knight-styrix
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:INFANTRY}},effect:{type:ability-grant,target:de`
  - verifier: The rule explicitly states the effect applies 'if an enemy INFANTRY unit was hit by one or more of those attacks.' The authored DSL models only the INFANTRY keyword check in its condition; it does not model the 'was hit'

- **Fleet Command** `chaos-space-marines/fleet-command` · units: masters-of-the-maelstrom
  - chose: `ability-grant` · conf low · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:special-redeploy-to-reserves}}`
  - verifier: Scope duration is incorrect: the rule is a one-time deployment effect ('After both players have deployed their armies'), not a battle-duration ability. Additionally, multiple stated conditions are missing: 'if this unit 

- **Warmaster** `chaos-space-marines/warmaster` · units: abaddon-the-despoiler
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:warmaster-selection}}`
  - verifier: Scope duration is incorrect: the rule states 'Until the start of your next Command phase', which spans the rest of your turn *plus* your opponent's entire turn. The DSL duration 'turn' (typically one player turn) is too 

- **Vanguard of the Dark City** `drukhari/vanguard-of-the-dark-city` · units: raider
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:command}},effect:{type:ability-grant,target:self,modifier:{`

- **Precognisant** `drukhari/precognisant` · units: lady-malys
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{ability_id:redeploy-to-reserves,selectable_units:3,keyword_filter:DRUKHARI,ign`
  - verifier: Missing critical timing condition: rule explicitly states 'after both players have deployed their armies.' DSL scope duration:'battle' misrepresents this as an ability active throughout the battle, rather than a one-time

- **Archon’s Retinue** `drukhari/archon-s-retinue` · units: hand-of-the-archon
  - chose: `ability-grant` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:conditional,condition:{type:is-attached},effect:{type:ability-grant,target:attached-unit,modifier:{ability_id:scou`
  - verifier: (no issue text)

- **Daemon Primarch of Slaanesh** `emperors-children/daemon-primarch-of-slaanesh` · units: fulgrim
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{}},effect:{type:ability-grant,target:self,modifier:{grant_type:se`
  - verifier: Phase condition is incomplete. The rule specifies 'At the start of your opponent's Command phase', but the authored condition has `"type":"phase-is"` with empty parameters — the phase type and 'opponent' qualifier are no

- **Decoys and Misdirection** `genestealer-cults/decoys-and-misdirection` · units: primus
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:redeploy-and-strategic-reserves}}`
  - verifier: Core mechanic mismatch: rule describes a one-time deployment-phase redeployment action (after both players deploy, select up to 3 GENESTEALER CULTS units and redeploy them), but DSL models it as a persistent ability-gran

- **Underground Egress** `genestealer-cults/underground-egress` · units: tectonic-fragdrill
  - chose: `ability-grant` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:marker-reposition}}`
  - verifier: Core mechanic errors: (1) target should be 'marker' not 'unit' — rule repositions markers, not units; (2) effect type 'ability-grant' does not capture reactive trigger nature — rule is conditional ('Each time marker woul

- **Unhinged Vengeance** `leagues-of-votann/unhinged-vengeance` · units: buri-aegnirssen
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:ability-grant,target:self,modifier:`
  - verifier: Core trigger and conditions missing. Rule requires: (1) 'each time enemy unit has shot' repeating trigger structure, (2) 'this model lost one or more wounds as a result of those attacks' condition. Authored DSL only chec

- **Bodyguard** `orks/bodyguard` · units: boyz
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:multi-leader-attachment}}`
  - verifier: Missing stated conditions: rule gates the ability on Starting Strength = 20 and requires one attached leader to be WARBOSS. DSL does not capture either gate. Also missing secondary rule: DSL should reflect that destroyed

- **Kroot Ambush** `tau-empire/kroot-ambush` · units: kroot-trail-shaper
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:unit,modifier:{grant_type:strategic-reserves-redeployment-override}}`
  - verifier: Two problems: (1) Missing temporal condition 'After both players have deployed their armies'. (2) The rule allows redeploying 'this model's unit and one other friendly KROOT unit' (two units total), but the DSL targets o

- **Bodyguard** `tau-empire/bodyguard` · units: kroot-carnivores
  - chose: `ability-grant` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:ability-grant,target:self,modifier:{grant_type:second-leader-attachment-slot}}`
  - verifier: Two problems: (1) Missing condition 'If this unit has a Starting Strength of 20' — the second-leader-attachment ability is conditional on this stat threshold. (2) Missing the secondary effect: 'If you do, and this unit i

- **Scryer of Fates (Psychic)** `thousand-sons/scryer-of-fates-psychic` · units: ahriman
  - chose: `ability-grant` · conf low · schema ✗ · faithful ✗ · complex
  - proposed: `{type:ability-grant,target:friendly-units,modifier:{grant_type:redeployment}}`
  - verifier: (no issue text)

### `movement-modifier` — 8

- **Warrant of Trade** `agents-of-the-imperium/warrant-of-trade` · units: rogue-trader-entourage
  - chose: `movement-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:movement-modifier,target:unit,modifier:{move_type:strategic-reserves}}`
  - verifier: Core mechanic misses critical conditions and scoping. Rule is army-gated ('if your army includes one or more'), triggers post-deployment ('after both players have deployed'), and affects a random count of units ('select 

- **Scuttling Walker** `chaos-daemons/scuttling-walker` · units: soul-grinder
  - chose: `movement-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:movement-modifier,target:self,modifier:{move_type:normal-and-advance,effect:ignore-obstacles}}`
  - verifier: The rule specifies movement over FRIENDLY MONSTER and VEHICLE models only, plus terrain features 4" or less in height. The authored DSL uses 'ignore-obstacles' which is nonspecific and omits: (1) model-type restriction (

- **Pestilent Fallout (Psychic)** `death-guard/pestilent-fallout-psychic` · units: malignant-plaguecaster
  - chose: `movement-modifier` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:movement-modifier,target:enemy,modifier:{move_type:move,value:-2}}`
  - verifier: (no issue text)

- **Fade Away** `drukhari/fade-away` · units: mandrakes
  - chose: `movement-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:fight}},effect:{type:movement-modifier,target:self,modifier`
  - verifier: Phase ownership is unspecified: rule says 'At the end of your opponent's Fight phase,' but DSL phase condition omits whose phase. In 40K, 'your Fight phase' and 'opponent's Fight phase' are distinct mechanical contexts (

- **Wracking Agonies (Psychic)** `emperors-children/wracking-agonies-psychic` · units: sorcerer
  - chose: `movement-modifier` · conf high · schema ✗ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{}},effect:{type:movement-modifier,target:enemy-unit,modifier:{ope`
  - verifier: (no issue text)

- **Grav-pinned** `imperial-knights/grav-pinned` · units: questoris-knight-styrix
  - chose: `movement-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:movement-modifier,target:defender,modifier:{move_type:characteristic,value:-2}}`
  - verifier: Authored DSL captures only one of two effects: the Move characteristic penalty is present, but the Charge roll penalty (subtract 2 from Charge rolls made for that unit) is entirely missing. Additionally, the authored ent

- **Super-heavy Walker** `tau-empire/super-heavy-walker` · units: taunar-supremacy-armour
  - chose: `movement-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:movement-modifier,target:self,modifier:{move_type:[normal,advance,fall-back],effect:ignore-terrain-and-models-belo`
  - verifier: The exception for TITANIC models is not encoded. The rule says 'excluding TITANIC models', meaning the model can ignore terrain and non-TITANIC models ≤4", but not TITANIC models. The DSL's 'ignore-terrain-and-models-bel

- **Binding Tendrils (Psychic)** `thousand-sons/binding-tendrils-psychic` · units: exalted-sorcerer-on-disc-of-tzeentch
  - chose: `movement-modifier` · conf medium · schema ✗ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:movement-modifier,target:enemy-unit`
  - verifier: (no issue text)

### `re-roll` — 7

- **Litany of Deeds** `adepta-sororitas/litany-of-deeds` · units: imagifier
  - chose: `re-roll` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:re-roll,target:self,modifier:{roll:damage,subset:all-failures}}`
  - verifier: DSL specifies damage roll re-roll. Rule re-rolls the Miracle dice value (D6 result). Wrong roll type. Also frames as range-12 aura; actually a triggered response to a destroyed unit within 12".

- **Point‐blank Devastation** `aeldari/point-blank-devastation` · units: wraithknight
  - chose: `re-roll` · conf low · schema ✓ · faithful ✗
  - proposed: `{type:re-roll,target:self,modifier:{roll:hit,subset:all-failures,qualifier:attack-count,attack_type:ranged}}`
  - verifier: Wrong mechanic type: rule re-rolls attack-count dice; DSL specifies hit roll re-rolls. Missing half-range condition and weapon type qualifier (heavy wraithcannon/suncannon only). Phantom 'all-failures' subset.

- **Cluster caltrops** `aeldari/cluster-caltrops` · units: ynnari-reavers
  - chose: `re-roll` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:re-roll,target:self,modifier:{roll:wound,subset:ones,note:one-die-per-model}}`
  - verifier: Phantom constraint: rule allows re-roll of one die per model (player chooses which); DSL restricts to 'ones' only. Missing Eviscerating Fly-by ability qualifier.

- **Daemonforge** `chaos-space-marines/daemonforge` · units: defiler
  - chose: `re-roll` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:re-roll,target:self,modifier:{roll:wound,subset:ones}}`
  - verifier: Incomplete representation. The authored DSL captures only the basic 're-roll wound rolls of 1' fragment. The rule contains major mechanics missing from the DSL: the overcharge mechanic (once per battle, can modify Leader

- **Cluster caltrops** `drukhari/cluster-caltrops` · units: reavers
  - chose: `re-roll` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:re-roll,target:self,modifier:{roll:wound,subset:all-failures}}`
  - verifier: Re-roll mechanic is incorrect. Rule states 'you can re-roll one D6 for each model in this unit equipped with cluster caltrops' — a fixed per-model allowance. DSL models subset:'all-failures', which allows re-rolling ever

- **Their Number is Legion** `necrons/their-number-is-legion` · units: necron-warriors
  - chose: `re-roll` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:re-roll,target:self,modifier:{roll:damage,subset:all-failures}}`
  - verifier: Core mechanic is incorrectly modeled as a damage roll re-roll. The rule specifies re-rolling 'the dice to see how many wounds are reanimated' — this is a Reanimation Protocols-specific roll, not a damage roll. Additional

- **Coordinated Strike** `tau-empire/coordinated-strike` · units: taunar-supremacy-armour
  - chose: `re-roll` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:re-roll,target:self,modifier:{roll:hit,subset:ones}}`
  - verifier: Two missing conditions. (1) 'While this model **is a Guided unit**' — the DSL doesn't check Guided status. (2) 're-roll a Hit roll of 1' **only applies when attacking 'its Spotted unit'** — the DSL applies the re-roll to

### `resurrection` — 7

- **Unstoppable Champion** `adeptus-astartes/unstoppable-champion` · units: watch-captain-artemis
  - chose: `resurrection` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:resurrection,target:self,modifier:{count:1}}`
  - verifier: Missing trigger: 'The first time this model is destroyed.' Missing roll mechanic: 'roll one D6... On a 2+'—the resurrection should be conditional, not automatic. Missing placement restrictions: 'as close as possible to w

- **Word of the Phoenix (Psychic)** `aeldari/word-of-the-phoenix-psychic` · units: yvraine
  - chose: `resurrection` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:resurrection,target:unit,modifier:{count:D3,base:1}}}`
  - verifier: Missing probabilistic gate: rule requires D6 roll (2+) for resurrection; DSL models as automatic. Also missing Command phase specificity and SUPPORT WEAPON exclusion constraint.

- **Unstoppable Champion** `agents-of-the-imperium/unstoppable-champion` · units: watch-captain-artemis
  - chose: `resurrection` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:resurrection,target:self,modifier:{count:1}}`
  - verifier: Core mechanic incomplete. Rule specifies a once-per-battle, end-of-phase trigger with a D6 roll (2+). DSL models guaranteed resurrection with 1 wound but omits: (1) the die roll and probability threshold (2+, i.e., 83% s

- **Split** `chaos-daemons/split` · units: pink-horrors
  - chose: `resurrection` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:resurrection,target:unit,modifier:{trigger:on-model-destruction,count:conditional-D6-4+,type:replacement-models}}`
  - verifier: The rule's core mechanic is conditional model transformation: PINK HORROR → 2 BLUE HORRORs vs. BLUE HORROR → 1 BRIMSTONE HORROR. The authored DSL encodes only 'conditional-D6-4+' and 'replacement-models' without capturin

- **Curse of the Walking Pox** `death-guard/curse-of-the-walking-pox` · units: poxwalkers
  - chose: `resurrection` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:resurrection,target:self,modifier:{count:1}}`
  - verifier: Core trigger condition missing. The rule activates 'each time a POXWALKER model makes an attack that destroys an enemy model (excluding MONSTER and VEHICLE)', but the DSL captures only the effect (resurrection, target se

- **Nanoscarab Reanimation Beam (Aura)** `necrons/nanoscarab-reanimation-beam-aura` · units: canoptek-reanimator
  - chose: `resurrection` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:resurrection,target:friendly-within-aura,modifier:{count:D3}}`
  - verifier: (no issue text)

- **Parasitic Infection** `tyranids/parasitic-infection` · units: parasite-of-mortrex
  - chose: `resurrection` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:INFANTRY}},effect:{type:resurrection,target:sel`
  - verifier: Effect type is 'resurrection' but the rule creates a new D3-model RIPPER SWARMS unit, not a resurrection. Missing weapon condition: the attack must use 'this model's barbed ovipositor' — the DSL only checks INFANTRY keyw

### `leadership-modifier` — 7

- **Political Overwatch** `astra-militarum/political-overwatch` · units: commissar, death-rider-commissar
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:leadership-modifier,target:unit,modifier:{test:battle-shock,operation:re-roll}}`
  - verifier: Missing critical condition: the rule states 'While another OFFICER model is in the same unit as this model' — this prerequisite gates the entire ability and is absent from the DSL. The authored effect treats re-roll batt

- **Shadow of Khorne (Aura)** `chaos-daemons/shadow-of-khorne-aura` · units: skull-altar
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:leadership-modifier,target:friendly-within-aura,modifier:{test:battle-shock,operation:re-roll}}`
  - verifier: The rule has two distinct effects: (1) 'The area within 6" is Shadow of Chaos' (area/region designation), and (2) Battle-shock re-roll while friendly KHORNE unit is within 6". The authored DSL captures only effect (2) — 

- **Chaos Icon** `chaos-space-marines/chaos-icon` · units: dark-commune
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:leadership-modifier,target:self,modifier:{test:battle-shock,operation:re-roll}}`
  - verifier: Stated condition missing: the rule limits the re-roll to 'Leadership test for the Dark Pacts ability', but the authored DSL specifies `test: battle-shock` without the Dark Pacts trigger. This makes the re-roll apply to *

- **Shoutin’ Pole (Aura)** `orks/shoutin-pole-aura` · units: biged-bossbunka
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:leadership-modifier,target:friendly-within-aura,modifier:{operation:add,value:1}}`
  - verifier: Missing stated keyword filter: rule specifies 'friendly ORKS unit', but DSL target 'friendly-within-aura' does not express the ORKS keyword constraint.

- **Immaterial Flare (Aura)** `thousand-sons/immaterial-flare-aura` · units: mutalith-vortex-beast
  - chose: `leadership-modifier` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:PSYKER}},effect:{type:leadership-modifier,targe`
  - verifier: Condition missing THOUSAND SONS keyword. Rule: 'friendly THOUSAND SONS PSYKER model within 6"'. DSL only checks 'target-has-keyword: PSYKER', omitting the THOUSAND SONS filter. This is a stated condition the rule does NO

- **Lord of the Planet of the Sorcerers (Psychic)** `thousand-sons/lord-of-the-planet-of-the-sorcerers-psychic` · units: magnus-the-red
  - chose: `leadership-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:leadership-modifier,target:self,modifier:{operation:add,value:2}}`
  - verifier: Missing first mechanic: 'can attempt up to two Rituals per turn instead of one'. DSL only models the +2 Psychic test modifier. The rule has two distinct effects; the DSL captures only one.

- **Spirit Snare** `thousand-sons/spirit-snare` · units: daemon-prince-of-tzeentch
  - chose: `leadership-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:leadership-modifier,target:friendly-within-aura,modifier:{operation:add,value:1}}`
  - verifier: Trigger condition and cap missing. Rule is triggered by destruction of a friendly THOUSAND SONS PSYKER with Cabal of Sorcerers ability within 9"; effect persists per-model with a +2 cap. DSL models as a static aura modif

### `resource-gain` — 6

- **Simulacrum Imperialis** `adepta-sororitas/simulacrum-imperialis` · units: sanctifiers
  - chose: `resource-gain` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:command}},effect:{type:resource-gain,target:self,modifier:{`
  - verifier: DSL grants flat 1 Miracle dice unconditionally. Rule requires D6 roll with 4+ threshold to gain 1 dice showing the rolled value. Missing core mechanic: probabilistic resource with success condition.

- **Solemn Procession** `adepta-sororitas/solemn-procession` · units: triumph-of-saint-katherine
  - chose: `resource-gain` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:command}},effect:{type:resource-gain,target:self,modifier:{`
  - verifier: Effect correct (gain 1 dice valued 6). Trigger timing wrong: rule fires 'at start of battle round', not in Command phase. Condition should reference battle-round-start event.

- **Stirring Rhetoric** `adepta-sororitas/stirring-rhetoric` · units: dialogus
  - chose: `resource-gain` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:resource-gain,target:attached-unit,modifier:{pool_id:miracle-dice-pool,amount:1}}`
  - verifier: DSL grants new resource (1 dice). Rule modifies value of one dice used (change to 6). Grants vs. modifies is fundamentally different mechanic.

- **Indomitable Strength of Will** `aeldari/indomitable-strength-of-will` · units: autarch-wayleaper
  - chose: `resource-gain` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:resource-gain,target:unit,modifier:{pool_id:battle-focus`
  - verifier: Missing probabilistic gate: rule requires D6 roll (3+) each time token is spent; DSL models as automatic token return. Core mechanic broken.

- **Torture Device** `drukhari/torture-device` · units: talos
  - chose: `resource-gain` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:resource-gain,target:self,modifier:{pool_id:pain-token-pool,amount:1,trigger:unit-destroys-enemy}}`

- **Pain Adept** `drukhari/pain-adept` · units: haemonculus
  - chose: `resource-gain` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:command}},effect:{type:resource-gain,target:self,modifier:{`
  - verifier: Missing stated prerequisite condition: rule says 'In your Command phase, IF one or more models from your army with this ability are on the battlefield, roll...'. DSL models only the phase condition and roll mechanics, om

### `keyword-grant` — 6

- **Extremis Trigger Word** `adepta-sororitas/extremis-trigger-word` · units: arco-flagellants
  - chose: `keyword-grant` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:fight}},effect:{type:keyword-grant,target:self,modifier:{ke`
  - verifier: DSL only grants [HAZARDOUS]. Rule also modifies arco-flails Attacks to 6. Omits stat modification entirely. Trigger also misframed (phase event vs. 'selected to fight' + choose to invoke).

- **Chapter Master of the Raven Guard** `adeptus-astartes/chapter-master-of-the-raven-guard` · units: aethon-shaan
  - chose: `keyword-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:keyword-grant,target:unit,modifier:{keywords:[captain]}}`
  - verifier: Missing prerequisite condition: 'if your army includes AETHON SHAAN and KAYVAAN SHRIKE.' Missing trigger: 'At the start of the Declare Battle Formations step.' Missing keyword removal: the rule says 'loses its Lone Opera

- **Dark Angels Bodyguard** `adeptus-astartes/dark-angels-bodyguard` · units: lion-eljonson
  - chose: `keyword-grant` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:adeptus-astartes-infantry}},effect:{type:keywor`
  - verifier: (no issue text)

- **Backroom Deals** `agents-of-the-imperium/backroom-deals` · units: rogue-trader-entourage
  - chose: `keyword-grant` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:keyword-grant,target:attached-unit,modifier:{keywords:[i`
  - verifier: (no issue text)

- **The Dark Master (Aura)** `chaos-daemons/the-dark-master-aura` · units: belakor
  - chose: `keyword-grant` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:keyword-grant,target:self,modifier:{keywords:[shadow-of-chaos]}}`
  - verifier: The effect type 'keyword-grant' to 'self' is mechanically wrong. The rule designates an area/region ('The area of the battlefield within 6" is within your army's Shadow of Chaos'), not a keyword property on the model its

- **Daemonic Patrons** `emperors-children/daemonic-patrons` · units: flawless-blades
  - chose: `keyword-grant` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{}},effect:{type:keyword-grant,target:self,modifier:{keywords:[dev`
  - verifier: Two core mechanic failures: (1) Phase condition is incomplete — empty parameters do not specify the 'fight' phase where this unit is selected to fight. (2) The rule states the unit 'can call upon daemonic patrons' — an o

### `objective-control-modifier` — 6

- **Martial Honour** `adeptus-astartes/martial-honour` · units: crusade-ancient
  - chose: `objective-control-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:objective-control-modifier,target:self,modifier:{operation:add,value:5}}`
  - verifier: Missing critical trigger condition: 'The first time a model in this model's unit makes a melee attack that destroys one or more enemy units.' Also missing the state condition: 'while this model's unit is not Battle-shock

- **Terror Troops (Aura)** `adeptus-astartes/terror-troops-aura` · units: reiver-squad
  - chose: `objective-control-modifier` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:not-monster-not-vehicle}},effect:{type:objectiv`
  - verifier: (no issue text)

- **Hunting Hounds** `adeptus-astartes/hunting-hounds` · units: fenrisian-wolves
  - chose: `objective-control-modifier` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:target-has-keyword,parameters:{keyword:space-wolves-character}},effect:{type:objective`
  - verifier: Missing state condition: 'if this unit is not Battle-shocked.' While the aura-6 range correctly captures proximity to SPACE WOLVES CHARACTER, the rule explicitly requires the unit to not be Battle-shocked for the OC modi

- **Rad-saturation (Aura)** `adeptus-mechanicus/rad-saturation-aura` · units: skitarii-vanguard
  - chose: `objective-control-modifier` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:objective-control-modifier,target:enemy-within-aura,modifier:{operation:subtract,value:1}}`
  - verifier: (no issue text)

- **Mind-breaking Mutations (Aura)** `chaos-space-marines/mind-breaking-mutations-aura` · units: chaos-spawn
  - chose: `objective-control-modifier` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:objective-control-modifier,target:enemy-within-aura,modifier:{operation:subtract,value:1}}`
  - verifier: (no issue text)

- **Chittering Swarm** `necrons/chittering-swarm` · units: canoptek-scarab-swarms
  - chose: `objective-control-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:is-attached},effect:{type:objective-control-modifier,target:enemy-within-aura,modifier`
  - verifier: Rule has two distinct effects; only the first is modeled. Missing: the second effect where this unit gains OC 1 while within 6" of friendly CRYPTEK models. Also, condition 'is-attached' doesn't match the actual rule cond

### `stat-modifier` — 6

- **Vengeance for the Omnissiah** `astra-militarum/vengeance-for-the-omnissiah` · units: tech-priest-enginseer
  - chose: `stat-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:stat-modifier,target:self,modifier:{operation:set,stat:A,value:6,attack_type:melee}}`
  - verifier: Missing trigger condition: the rule is conditional on 'a friendly ASTRA MILITARUM VEHICLE model is destroyed within 12"' — this event-based trigger is completely absent. The DSL models it as a permanent standing stat mod

- **Experimental Enhancements** `drukhari/experimental-enhancements` · units: wracks
  - chose: `stat-modifier` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:fight}},effect:{type:stat-modifier,target:self,modifier:{op`

- **Accelerator Mandible** `necrons/accelerator-mandible` · units: canoptek-macrocytes
  - chose: `stat-modifier` · conf high · schema ✗ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:fight}},effect:{type:stat-modifier,target:friendly-within-a`
  - verifier: (no issue text)

- **Tectonic Reverberations** `necrons/tectonic-reverberations` · units: geomancer
  - chose: `stat-modifier` · conf high · schema ✗ · faithful ✗ · complex
  - proposed: `{type:stat-modifier,target:enemy-within-aura,modifier:{operation:subtract,stat:M,value:2}}`
  - verifier: (no issue text)

- **Photon Casters** `tau-empire/photon-casters` · units: xv9-hazard-battlesuits
  - chose: `stat-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:stat-modifier,target:defender,modif`
  - verifier: Multiple missing conditions and incomplete effects. Rule requires: (1) **After this unit has shot** — not in DSL. (2) **If an enemy Infantry unit was hit** — not in DSL. (3) Scope duration 'until the end of your opponent

- **Sacrificial Blessing** `thousand-sons/sacrificial-blessing` · units: tzaangor-shaman
  - chose: `stat-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:model-is-leader},effect:{type:stat-modifier,target:self,modifier:{operation:add,stat:A`
  - verifier: Missing Strength modifier and incomplete trigger/cost. Rule adds D3 to both Attacks AND Strength of Psychic weapons; DSL only models Attacks ('stat: A'). Also missing: destruction of Bodyguard model (cost), phase-gating 

### `attack-restriction` — 5

- **Meteoric Descent** `adeptus-astartes/meteoric-descent` · units: inceptor-squad
  - chose: `attack-restriction` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:movement}},effect:{type:attack-restriction,target:self,modi`
  - verifier: Wrong core mechanic. The rule describes a setup/Deep Strike variant (set up >6" from enemies when using Deep Strike), not a post-setup charge restriction. The DSL models only the charge restriction and misses the Deep St

- **Jump Packs** `adeptus-custodes/jump-packs` · units: venatari-custodians
  - chose: `attack-restriction` · conf low · schema ✓ · faithful ✗ · complex
  - proposed: `{type:attack-restriction,target:self,modifier:{restriction:cannot-embark-venerable-land-raider}}`
  - verifier: Effect type is 'attack-restriction' but the rule describes an embarkation restriction. A unit cannot board a transport — this is fundamentally different from an attack restriction, which modifies combat mechanics. The DS

- **Formless Horror** `chaos-daemons/formless-horror` · units: the-changeling
  - chose: `attack-restriction` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:attack-restriction,target:self,modifier:{restriction:requires-battle-shock-pass-to-target}}`
  - verifier: The authored DSL correctly models the targeting restriction triggered by a Battle-shock test. However, the rule has a nuance: failure results in both Battle-shock status *and* targeting restriction ('in addition to being

- **Obelisk Node Control** `necrons/obelisk-node-control` · units: geomancer
  - chose: `attack-restriction` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:attack-restriction,target:enemy-within-aura,modifier:{restriction:cannot-set-up-from-reserves-within-12}}`
  - verifier: Trigger condition missing: 'while this model is within range of an objective marker you control.' The scope.range 'aura-12' incorrectly models this as a 12" aura activation range, when actually the 12" is the restriction

- **Subterranean Tunnels** `tyranids/subterranean-tunnels` · units: trygon
  - chose: `attack-restriction` · conf medium · schema ✓ · faithful ✓ · complex
  - proposed: `{type:attack-restriction,target:self,modifier:{restriction:cannot-declare-charge}}`
  - verifier: Core mechanic correct: charge restriction on self, duration to turn end. Scope (self-range, turn-duration) proper. No phantom conditions. The 6" placement safety is a setup constraint, not a persistent effect, so rightly

### `deep-strike` — 5

- **Aerial Deployment** `astra-militarum/aerial-deployment` · units: arvus-lighter, aquila-lander
  - chose: `deep-strike` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:movement}},effect:{type:deep-strike,target:self,modifier:{}`
  - verifier: Missing preconditions and phase limitation: the rule requires the model to 'start the game in Hover mode and in Strategic Reserves' (both absent), and restricts setup to 'first, second or third Movement phase' (the phase

- **Swooping Descent** `drukhari/swooping-descent` · units: scourges-with-shardcarbines
  - chose: `deep-strike` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:movement}},effect:{type:deep-strike,target:self,modifier:{}`
  - verifier: Core resource cost is missing: rule requires 'spend 1 Pain token' but DSL has no resource_cost field. Two distance-based conditions are completely absent: (1) 'set up anywhere more than 6" horizontally away from all enem

- **Tunnelling Horrors** `necrons/tunnelling-horrors` · units: ophydian-destroyers
  - chose: `deep-strike` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:deep-strike,target:self,modifier:{}}`
  - verifier: Critical trigger conditions missing: 'at the end of your opponent's turn' and 'if this unit is not within Engagement Range of one or more enemy units.' The 9" distance constraint for setup is not modeled in the modifier.

- **Grand Illusion** `necrons/grand-illusion` · units: ctan-shard-of-the-deceiver
  - chose: `deep-strike` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:deep-strike,target:unit,modifier:{}}`
  - verifier: Missing: (1) deployment-phase trigger ('after both players have deployed'), (2) 'up to three units' limit, (3) NECRONS keyword filter, (4) Strategic Reserves bypass mechanic. DSL is too generic and omits multiple constra

- **Transdimensional Displacement** `necrons/transdimensional-displacement` · units: transcendent-ctan
  - chose: `deep-strike` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:movement}},effect:{type:deep-strike,target:self,modifier:{}`
  - verifier: Wrong trigger condition: rule specifies 'each time this model is selected to Advance' (a specific action), not 'during Movement phase.' Condition should gate on Advance action, not phase. Also missing: 9" distance constr

### `mortal-wounds` — 4

- **Deadly Demise D6+2** `chaos-daemons/deadly-demise-d6-2` · units: anggrath-the-unbound
  - chose: `mortal-wounds` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:mortal-wounds,target:enemy-within-aura,modifier:{count:D6+2,trigger:on-destruction-roll-6+}}`

- **Drain Life** `necrons/drain-life` · units: ctan-shard-of-the-nightbringer
  - chose: `mortal-wounds` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:fight}},effect:{type:mortal-wounds,target:enemy-within-aura`
  - verifier: Missing the D6 roll with 4+ threshold that gates damage. The rule requires 'roll one D6... on a 4+' but the DSL models unconditional D3 mortal wounds. The gating condition is a core part of the mechanic.

- **Matter Absorption** `necrons/matter-absorption` · units: ctan-shard-of-the-void-dragon
  - chose: `mortal-wounds` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:conditional,condition:{type:phase-is,parameters:{phase:shooting}},effect:{type:mortal-wounds,target:enemy-within-a`
  - verifier: Missing: (1) VEHICLE unit type constraint ('select one enemy VEHICLE unit'), (2) D6 roll with 2+ threshold, (3) healing effect entirely absent ('this model regains up to that many lost wounds'). Core mechanic is incomple

- **Deadly Demise D6+3** `tau-empire/deadly-demise-d6-3` · units: taunar-supremacy-armour
  - chose: `mortal-wounds` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:mortal-wounds,target:enemy-within-aura,modifier:{count:D6+3}}`
  - verifier: Missing the roll condition. Rule states 'roll one D6 before removing it from play. **On a 6**, each unit within 6" suffers...'. The DSL applies mortal wounds unconditionally but should encode a `trigger: {type: 'roll', d

### `roll-modifier` — 3

- **The Emperor’s Shield** `adeptus-astartes/the-emperors-shield` · units: lion-eljonson
  - chose: `roll-modifier` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:roll-modifier,target:self,modifier:{operation:subtract,roll:wound,value:1}}`
  - verifier: Missing condition: 'if the Strength characteristic of that attack is greater than the Toughness characteristic of this model.' The DSL applies the wound roll modifier unconditionally to all attacks, but the rule explicit

- **Ramshackle Cover** `orks/ramshackle-cover` · units: biged-bossbunka
  - chose: `roll-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:roll-modifier,target:defender,modifier:{operation:add,roll:save,value:1,attack_type:ranged}}`
  - verifier: Missing stated condition: rule requires 'if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION'. DSL unconditionally applies +1 save without visibility/cover gating.

- **Fortification** `orks/fortification` · units: biged-bossbunka
  - chose: `roll-modifier` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:roll-modifier,target:enemy-within-aura,modifier:{operation:subtract,roll:hit,value:1,attack_type:ranged}}`
  - verifier: Missing stated condition and entire second effect: (1) rule specifies 'unless it is made with a Pistol' exception to -1 Hit modifier, not captured in DSL; (2) rule includes separate effect ('Models in that unit do not ne

### `cp-refund` — 2

- **Primed and Ready** `astra-militarum/primed-and-ready` · units: death-korps-grenadier-squad
  - chose: `cp-refund` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:cp-refund,target:unit,modifier:{amount:0}}`
  - verifier: Missing use-gate condition: the rule states 'provided that unit has not already been the target of that Stratagem this phase' — this per-unit-per-phase limitation prevents double-targeting and is absent from the DSL. The

- **Pouncing Leap** `tyranids/pouncing-leap` · units: von-ryans-leapers
  - chose: `cp-refund` · conf medium · schema ✓ · faithful ✗
  - proposed: `{type:cp-refund,target:self,modifier:{amount:1}}`
  - verifier: Effect type 'cp-refund' is wrong: Heroic Intervention costs 0CP here, not a refund (no CP gained back). Should be 'cp-cost-reduction' or equivalent. Critical missing condition: the rule allows reusing Heroic Intervention

### `undefined` — 1

- **Denuncia oratory** `adepta-sororitas/denuncia-oratory` · units: celestian-insidiants
  - chose: `undefined` · conf undefined · schema ✗ · faithful ✗
  - proposed: `—`
  - verifier: (no issue text)

### `model-destruction` — 1

- **Crewed Platform** `aeldari/crewed-platform` · units: storm-guardians
  - chose: `model-destruction` · conf high · schema ✓ · faithful ✓ · complex
  - proposed: `{type:model-destruction,target:unit,modifier:{trigger:last-storm-guardian-destroyed}}`

### `shoot-on-death` — 1

- **Death Befitting An Officer** `astra-militarum/death-befitting-an-officer` · units: leman-russ-commander
  - chose: `shoot-on-death` · conf high · schema ✓ · faithful ✗ · complex
  - proposed: `{type:shoot-on-death,target:self,modifier:{}}`
  - verifier: Missing probabilistic gate: the rule states 'roll one D6: on a 2+, do not remove it from play' — the D6 roll and the 2+ threshold are the core condition that gates whether the effect triggers. The DSL models guaranteed s

### `fight-first` — 1

- **Fights First** `astra-militarum/fights-first` · units: gaunts-ghosts
  - chose: `fight-first` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:fight-first,target:unit,modifier:{}}`
  - verifier: Missing model-level condition: the rule explicitly states 'provided every model in the unit has this ability' — this is a gating condition that the DSL omits. The authored effect treats it as a unit-wide fight-first gran

### `fallback-and-act` — 1

- **Covert Stealth Team** `astra-militarum/covert-stealth-team` · units: gaunts-ghosts
  - chose: `fallback-and-act` · conf medium · schema ✓ · faithful ✗ · complex
  - proposed: `{type:fallback-and-act,target:unit,modifier:{}}`
  - verifier: Missing engagement-range condition and redeployment range: the rule requires the unit to be 'not within Engagement Range of one or more enemy units' (gate for removal), and when redeployed, 'more than 9" horizontally awa

### `resource-spend` — 1

- **Air Caste Colossus** `tau-empire/air-caste-colossus` · units: manta
  - chose: `resource-spend` · conf high · schema ✓ · faithful ✗
  - proposed: `{type:resource-spend,target:self,modifier:{pool_id:cp,multiplier:3}}`
  - verifier: Missing trigger condition. The rule requires 'Each time you target this model with a Stratagem' — the DSL has no condition encoding when the resource-spend applies. Without a `trigger: {type: 'stratagem-targeting', targe

