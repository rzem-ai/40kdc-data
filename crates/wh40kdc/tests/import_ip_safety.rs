//! Regression guard for the project's IP rule: the importer must never carry
//! reproduced rules/ability prose into its output.
//!
//! A payload whose `rules[].description` and ability `$text` fields contain
//! unmistakable canary strings is imported; the serialized roster must contain
//! none of them. This proves the ListForge adapter's field allowlist
//! (`tools/src/import/listforge.ts` / `src/import/listforge.rs`) leaks no
//! copyrighted prose. Rust mirror of `tools/test/import/ip-safety.test.ts`.

#![cfg(feature = "import")]

use wh40kdc::import::import_roster;
use wh40kdc::Dataset;

const CANARIES: [&str; 3] = [
    "CANARY_RULE_DESCRIPTION_SHOULD_NOT_APPEAR",
    "CANARY_ABILITY_TEXT_SHOULD_NOT_APPEAR",
    "CANARY_PROFILE_CHARACTERISTIC_TEXT",
];

fn payload_with_prose() -> serde_json::Value {
    serde_json::json!({
        "name": "Prose Test",
        "generatedBy": "List Forge",
        "roster": {
            "name": "Prose Test",
            "costs": [{ "name": "pts", "value": 90 }],
            "forces": [{
                "id": "f1",
                "name": "Army Roster",
                "selections": [{
                    "id": "u-crowe",
                    "name": "Castellan Crowe",
                    "type": "model",
                    "number": 1,
                    "categories": [{ "name": "Faction: Grey Knights" }, { "name": "Character" }],
                    "costs": [{ "name": "pts", "value": 90 }],
                    "rules": [
                        { "id": "r1", "name": "Deep Strike", "description": CANARIES[0], "hidden": false }
                    ],
                    "profiles": [
                        {
                            "id": "p1",
                            "name": "Some Ability",
                            "typeName": "Abilities",
                            "characteristics": [{ "name": "Description", "$text": CANARIES[1] }]
                        },
                        {
                            "id": "p2",
                            "name": "Storm bolter",
                            "typeName": "Ranged Weapons",
                            "characteristics": [{ "name": "Keywords", "$text": CANARIES[2] }]
                        }
                    ],
                    "selections": [{
                        "id": "w1",
                        "name": "Storm bolter",
                        "type": "upgrade",
                        "number": 1,
                        "categories": [{ "name": "Ranged Weapon" }],
                        "rules": [{ "id": "r2", "name": "Rapid Fire", "description": CANARIES[0] }]
                    }]
                }]
            }]
        }
    })
}

#[test]
fn never_emits_reproduced_rules_or_ability_prose() {
    let roster = import_roster(&payload_with_prose(), Dataset::embedded()).unwrap();
    let serialized = serde_json::to_string(&roster).unwrap();
    for canary in CANARIES {
        assert!(
            !serialized.contains(canary),
            "canary {canary:?} leaked into the serialized roster"
        );
    }
}

#[test]
fn still_resolves_the_unit_despite_prose_laden_payload() {
    let roster = import_roster(&payload_with_prose(), Dataset::embedded()).unwrap();
    assert_eq!(
        roster.units[0].ref_.id.as_deref(),
        Some("castellan-crowe"),
        "the unit still resolves through the prose-free allowlist"
    );
}
