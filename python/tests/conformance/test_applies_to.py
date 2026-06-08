"""unit_matches_applies_to (roster-highlighting scope) against the applies-to
corpus. Exact equality on matchedIds — input order is load-bearing.
"""

from __future__ import annotations

from typing import Any

import pytest

from wh40kdc.scope import unit_matches_applies_to

from ..conftest import load_corpus_json


def _cases() -> list[dict[str, Any]]:
    return load_corpus_json("applies-to", "cases.json")


@pytest.mark.parametrize("case", _cases(), ids=lambda c: c["caseId"])
def test_applies_to(case: dict[str, Any]) -> None:
    matched = [
        u["id"]
        for u in case["units"]
        if unit_matches_applies_to(
            case["applies_to"],
            [*(u.get("keywords") or []), *(u.get("faction_keywords") or [])],
        )
    ]
    assert matched == case["expected"]["matchedIds"]
