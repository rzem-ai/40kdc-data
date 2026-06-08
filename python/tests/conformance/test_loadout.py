"""Loadout totals against the `loadout` conformance corpus.

Pins the damage-level totaling (sum after-FNP across weapons → kills once).
±5e-4 on both fields; the ts↔py differ enforces the same goldens cross-impl.
"""

from __future__ import annotations

import json
from typing import Any

import pytest

from wh40kdc.compare import LoadoutLine, loadout_cell

from ..conftest import CORPUS

_DIR = CORPUS / "loadout"
_CASES = sorted(p.name for p in _DIR.glob("*.json")) if _DIR.exists() else []

TOLERANCE = 5e-4


@pytest.mark.skipif(not _CASES, reason="conformance corpus not available")
@pytest.mark.parametrize("case_file", _CASES)
def test_loadout_case(dataset: Any, case_file: str) -> None:
    case = json.loads((_DIR / case_file).read_text(encoding="utf-8"))
    lines = [
        LoadoutLine(
            weapon_id=line["weaponId"],
            count=line["count"],
            profile_index=line.get("profileIndex", 0),
        )
        for line in case["lines"]
    ]
    cell = loadout_cell(
        dataset,
        lines=lines,
        target_profile_id=case["targetProfileId"],
        distance=case["distance"],
        phase=case["phase"],
    )
    assert cell["damage"] == pytest.approx(case["expected"]["damage"], abs=TOLERANCE), case_file
    assert cell["kills"] == pytest.approx(case["expected"]["kills"], abs=TOLERANCE), case_file
