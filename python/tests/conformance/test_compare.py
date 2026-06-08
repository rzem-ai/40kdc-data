"""Fleet-comparison cells against the `compare` conformance corpus.

`expectedKills` tolerance is ±5e-4 (CONFORMANCE.md); the booleans and model
count are exact. The ts↔py differ pairing enforces the same goldens across
implementations — this is the Python half.
"""

from __future__ import annotations

import json
from typing import Any

import pytest

from wh40kdc.compare import compare_cell

from ..conftest import CORPUS

_COMPARE_DIR = CORPUS / "compare"
_CASES = sorted(p.name for p in _COMPARE_DIR.glob("*.json")) if _COMPARE_DIR.exists() else []

TOLERANCE = 5e-4


@pytest.mark.skipif(not _CASES, reason="conformance corpus not available")
@pytest.mark.parametrize("case_file", _CASES)
def test_compare_case(dataset: Any, case_file: str) -> None:
    case = json.loads((_COMPARE_DIR / case_file).read_text(encoding="utf-8"))
    attacker = case["attacker"]
    cell = compare_cell(
        dataset,
        faction_id=attacker["factionId"],
        unit_id=attacker["unitId"],
        weapon_id=attacker["weaponId"],
        profile_index=attacker["profileIndex"],
        target_profile_id=case["targetProfileId"],
        distance=case["distance"],
        phase=case["phase"],
        models_firing=case.get("modelsFiring", 1),
    )
    expected = case["expected"]
    assert cell["reaches"] == expected["reaches"], case_file
    assert cell["withinHalfRange"] == expected["withinHalfRange"], case_file
    assert cell["modelCount"] == expected["modelCount"], case_file
    assert cell["expectedKills"] == pytest.approx(expected["expectedKills"], abs=TOLERANCE), (
        case_file
    )
