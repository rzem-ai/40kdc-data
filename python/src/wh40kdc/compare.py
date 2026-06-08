"""Fleet comparison: expected kills of attacker units against target profiles.

A *cross product*. Given a set of attacker units (a whole faction, or an
explicit list), a set of :class:`~wh40kdc._types.TargetProfile` archetypes, a
distance, and a phase, this builds a matrix whose every cell is the expected
number of models the attacker kills in that target with its best-performing
weapon at that range.

Target profiles **reference real dataset units** (``faction_id`` + ``unit_id``)
rather than copying stat lines, so the cell math resolves the live unit and
feeds it straight to :func:`~wh40kdc.cruncher.crunch`. The target's defensive
abilities (Feel No Pain, ability-granted invulns, save/toughness mods) are
resolved via :meth:`Dataset.defensive_buffs_for` and stacked onto the crunch —
the same path the salvo example app uses for dataset targets.

Rapid Fire / Melta come for free: the engine reads ``withinHalfRange`` out of
the context, so each cell passes ``distance <= range / 2``.

Run as ``python -m wh40kdc.compare --attacker-faction world-eaters --range 15``.
The numbers reported are **per model firing one instance of the weapon**
(``models_firing`` defaults to 1) — exact for single-model units like the
Forgefiend, and a per-weapon-per-model figure for squads.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import sys
from dataclasses import asdict, dataclass
from typing import Any, Literal

from wh40kdc.cruncher import crunch
from wh40kdc.data.dataset import Dataset

Phase = Literal["shooting", "fight"]


def weapon_type_for_phase(phase: Phase) -> str:
    """Which weapon type fires in a phase: shooting → ranged, fight → melee.

    Mirror of the TS ``weaponTypeForPhase`` in salvo's store.
    """
    return "melee" if phase == "fight" else "ranged"


@dataclass
class WeaponResult:
    """One attacker weapon profile evaluated against one target."""

    weapon_id: str
    weapon_name: str
    profile_index: int
    profile_name: str
    range: int | None  # inches; None for melee
    reaches: bool
    within_half_range: bool
    expected_kills: float


@dataclass
class Cell:
    """One (attacker unit, target profile) pair across all the unit's weapons."""

    attacker_unit_id: str
    attacker_unit_name: str
    target_profile_id: str
    target_profile_name: str
    weapons: list[WeaponResult]
    best: WeaponResult | None  # highest expected_kills among reaching weapons
    unit_total: float  # sum over reaching weapons (see CLI --metric caveat)

    def metric(self, metric: Literal["best-weapon", "unit-total"]) -> float:
        if metric == "unit-total":
            return self.unit_total
        return self.best.expected_kills if self.best else 0.0


@dataclass
class ResolvedTarget:
    """A target profile resolved to its live dataset unit."""

    profile: dict[str, Any]
    unit_raw: dict[str, Any]
    model_count: int


def resolve_target(ds: Dataset, profile: dict[str, Any]) -> ResolvedTarget:
    """Resolve a target profile to its referenced unit.

    Faction-scoped (``get_in_faction``) because shared units — Rhino,
    Forgefiend, Predator — reuse one unit id across factions. Raises with a
    clear message if the referenced unit is absent, rather than silently
    producing an empty comparison.
    """
    unit = ds.units.get_in_faction(profile["unit_id"], profile["faction_id"])
    if unit is None:
        raise ValueError(
            f"target profile {profile['id']!r} references unit "
            f"{profile['unit_id']!r} in faction {profile['faction_id']!r}, "
            "which is not in the dataset"
        )
    override = profile.get("model_count_override")
    model_count = override if override else (unit.raw.get("model_count") or {}).get("min", 1)
    return ResolvedTarget(profile=profile, unit_raw=unit.raw, model_count=model_count)


def expected_kills(
    ds: Dataset,
    *,
    weapon_raw: dict[str, Any],
    profile_index: int,
    target: ResolvedTarget,
    distance: float,
    phase: Phase,
    models_firing: int,
    within_half_range: bool,
) -> float:
    """Expected models killed for one (weapon profile, target) at a distance.

    Resolves the target's defensive abilities and stacks them onto the crunch,
    then reads the ``models-killed`` stage. The single unit of computation the
    matrix and the conformance corpus are both built on.
    """
    ctx: dict[str, Any] = {"phase": phase, "withinHalfRange": within_half_range}
    buffs = ds.defensive_buffs_for(
        {"unitId": target.unit_raw["id"], "factionId": target.unit_raw["faction_id"]},
        ctx,
    )
    out = crunch(
        {
            "attacker": {"weapon": weapon_raw, "profileIndex": profile_index},
            "target": {
                "unit": target.unit_raw,
                "profileIndex": 0,
                "modelCount": target.model_count,
            },
            "modelsFiring": models_firing,
            "buffs": buffs,
            "context": ctx,
        },
        ds,
    )
    for stage in out["stages"]:
        if stage["name"] == "models-killed":
            return float(stage["expected"])
    return 0.0  # unreachable: crunch always emits a models-killed stage


def compare_cell(
    ds: Dataset,
    *,
    faction_id: str,
    unit_id: str,
    weapon_id: str,
    profile_index: int,
    target_profile_id: str,
    distance: float,
    phase: Phase,
    models_firing: int = 1,
) -> dict[str, Any]:
    """Evaluate one (attacker weapon profile, target profile) cell.

    The single-cell entry point shared by the CLI internals and the conformance
    runner. Returns ``{expectedKills, reaches, withinHalfRange, modelCount}``.
    Raises ``ValueError`` / ``KeyError`` for unknown ids so the runner can map
    them to the closed error enum.
    """
    profile = ds.target_profiles.get(target_profile_id)
    if profile is None:
        raise KeyError(f"unknown target profile {target_profile_id!r}")
    target = resolve_target(ds, profile)
    weapon_view = ds.weapons.get(weapon_id)
    if weapon_view is None:
        raise KeyError(f"unknown weapon {weapon_id!r}")
    weapon_raw = weapon_view.raw
    wprofile = weapon_raw["profiles"][profile_index]
    rng = wprofile.get("range")
    is_ranged = isinstance(rng, int) and not isinstance(rng, bool)
    reaches = True if not is_ranged else rng >= distance
    within_half = bool(is_ranged and distance <= rng / 2)
    kills = (
        expected_kills(
            ds,
            weapon_raw=weapon_raw,
            profile_index=profile_index,
            target=target,
            distance=distance,
            phase=phase,
            models_firing=models_firing,
            within_half_range=within_half,
        )
        if reaches
        else 0.0
    )
    return {
        "expectedKills": kills,
        "reaches": reaches,
        "withinHalfRange": within_half,
        "modelCount": target.model_count,
    }


def unit_vs_target(
    ds: Dataset,
    attacker_unit: Any,  # UnitView
    target: ResolvedTarget,
    *,
    distance: float,
    phase: Phase,
    models_firing: int,
) -> Cell:
    """Evaluate every phase-appropriate weapon profile of one attacker unit
    against one target, returning the per-weapon results plus the best."""
    want_type = weapon_type_for_phase(phase)
    results: list[WeaponResult] = []
    for weapon in attacker_unit.weapons:
        wraw = weapon.raw
        if wraw.get("type") != want_type:
            continue
        for idx, wprofile in enumerate(wraw["profiles"]):
            rng = wprofile.get("range")
            is_ranged = isinstance(rng, int)
            # Melee always "reaches" (you are in engagement); a ranged profile
            # reaches when its range covers the distance.
            reaches = True if not is_ranged else rng >= distance
            within_half = bool(is_ranged and distance <= rng / 2)
            kills = (
                expected_kills(
                    ds,
                    weapon_raw=wraw,
                    profile_index=idx,
                    target=target,
                    distance=distance,
                    phase=phase,
                    models_firing=models_firing,
                    within_half_range=within_half,
                )
                if reaches
                else 0.0
            )
            results.append(
                WeaponResult(
                    weapon_id=wraw["id"],
                    weapon_name=weapon.name,
                    profile_index=idx,
                    profile_name=wprofile.get("name") or weapon.name,
                    range=rng if is_ranged else None,
                    reaches=reaches,
                    within_half_range=within_half,
                    expected_kills=kills,
                )
            )
    reaching = [r for r in results if r.reaches]
    best = max(reaching, key=lambda r: r.expected_kills, default=None)
    unit_total = sum(r.expected_kills for r in reaching)
    return Cell(
        attacker_unit_id=attacker_unit.id,
        attacker_unit_name=attacker_unit.name,
        target_profile_id=target.profile["id"],
        target_profile_name=target.profile["name"],
        weapons=results,
        best=best,
        unit_total=unit_total,
    )


def build_matrix(
    ds: Dataset,
    *,
    attacker_units: list[Any],  # list[UnitView]
    targets: list[ResolvedTarget],
    distance: float,
    phase: Phase,
    models_firing: int,
) -> list[list[Cell]]:
    """The cross product: one row per attacker unit, one column per target."""
    return [
        [
            unit_vs_target(
                ds, unit, target, distance=distance, phase=phase, models_firing=models_firing
            )
            for target in targets
        ]
        for unit in attacker_units
    ]


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def _select_attackers(ds: Dataset, faction_id: str | None, unit_ids: list[str] | None) -> list[Any]:
    if unit_ids:
        if not faction_id:
            raise ValueError("--attacker-units requires --attacker-faction to scope the ids")
        out = []
        for uid in unit_ids:
            u = ds.units.get_in_faction(uid, faction_id)
            if u is None:
                raise ValueError(f"unit {uid!r} not found in faction {faction_id!r}")
            out.append(u)
        return out
    if faction_id:
        return sorted(ds.units.by_faction(faction_id), key=lambda u: u.name)
    raise ValueError("specify --attacker-faction (optionally with --attacker-units)")


def _select_targets(ds: Dataset, profile_ids: list[str] | None) -> list[ResolvedTarget]:
    profiles = (
        [_require_profile(ds, pid) for pid in profile_ids]
        if profile_ids
        else sorted(ds.target_profiles.all, key=lambda p: p["name"])
    )
    return [resolve_target(ds, p) for p in profiles]


def _require_profile(ds: Dataset, pid: str) -> dict[str, Any]:
    p = ds.target_profiles.get(pid)
    if p is None:
        known = ", ".join(sorted(p["id"] for p in ds.target_profiles.all))
        raise ValueError(f"unknown target profile {pid!r}; known: {known}")
    return p


def _csv_list(value: str) -> list[str]:
    return [v.strip() for v in value.split(",") if v.strip()]


def _cell_value(cell: Cell, metric: Literal["best-weapon", "unit-total"]) -> float:
    return cell.metric(metric)


def render_table(
    matrix: list[list[Cell]],
    targets: list[ResolvedTarget],
    metric: Literal["best-weapon", "unit-total"],
) -> str:
    """Markdown table, Discord-paste ready. Cells with ≥1.0 kills are bolded."""
    headers = ["Unit", *(t.profile["name"] for t in targets)]
    lines = ["| " + " | ".join(headers) + " |", "|" + "|".join(["---"] * len(headers)) + "|"]
    for row in matrix:
        unit_name = row[0].attacker_unit_name if row else ""
        cells = []
        for cell in row:
            v = _cell_value(cell, metric)
            text = f"{v:.2f}" if v else "—"
            if v >= 1.0:
                text = f"**{text}**"
            cells.append(text)
        lines.append("| " + " | ".join([unit_name, *cells]) + " |")
    return "\n".join(lines)


def render_csv(
    matrix: list[list[Cell]],
    targets: list[ResolvedTarget],
    metric: Literal["best-weapon", "unit-total"],
) -> str:
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(["unit_id", "unit_name", *(t.profile["id"] for t in targets)])
    for row in matrix:
        if not row:
            continue
        writer.writerow(
            [
                row[0].attacker_unit_id,
                row[0].attacker_unit_name,
                *(f"{_cell_value(cell, metric):.4f}" for cell in row),
            ]
        )
    return buf.getvalue().rstrip("\n")


def render_json(
    matrix: list[list[Cell]],
    targets: list[ResolvedTarget],
    metric: Literal["best-weapon", "unit-total"],
) -> str:
    """Full detail: every cell's per-weapon breakdown, not just the headline."""
    rows = []
    for row in matrix:
        if not row:
            continue
        rows.append(
            {
                "unit_id": row[0].attacker_unit_id,
                "unit_name": row[0].attacker_unit_name,
                "cells": [
                    {
                        "target_profile_id": cell.target_profile_id,
                        "value": _cell_value(cell, metric),
                        "best_weapon": asdict(cell.best) if cell.best else None,
                        "weapons": [asdict(w) for w in cell.weapons],
                    }
                    for cell in row
                ],
            }
        )
    return json.dumps(
        {
            "metric": metric,
            "targets": [t.profile["id"] for t in targets],
            "rows": rows,
        },
        indent=2,
    )


def _sort_and_cap(
    matrix: list[list[Cell]], metric: Literal["best-weapon", "unit-total"], top: int | None
) -> list[list[Cell]]:
    """Sort attacker rows by their peak value across targets, descending."""
    ordered = sorted(
        matrix,
        key=lambda row: max((_cell_value(c, metric) for c in row), default=0.0),
        reverse=True,
    )
    return ordered[:top] if top else ordered


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="python -m wh40kdc.compare",
        description="Rank attacker units by expected kills against target-profile archetypes "
        "(a cross product: attacker set × target set).",
    )
    p.add_argument("--attacker-faction", help="attacker set = all units in this faction")
    p.add_argument(
        "--attacker-units",
        type=_csv_list,
        help="comma-separated unit ids (scoped by --attacker-faction)",
    )
    p.add_argument(
        "--targets",
        type=_csv_list,
        help="comma-separated target-profile ids (default: all profiles)",
    )
    p.add_argument("--range", type=float, default=12.0, help="distance in inches (default 12)")
    p.add_argument(
        "--phase", choices=["shooting", "fight"], default="shooting", help="default shooting"
    )
    p.add_argument(
        "--metric",
        choices=["best-weapon", "unit-total"],
        default="best-weapon",
        help="best-weapon (default) = the unit's single best reaching weapon; "
        "unit-total = sum over all reaching weapon profiles (counts alternative "
        "loadouts together — a rough aggregate, not a single physical loadout)",
    )
    p.add_argument(
        "--models-firing",
        type=int,
        default=1,
        help="models firing one instance of each weapon (default 1)",
    )
    p.add_argument("--top", type=int, help="cap to the top N attacker rows by peak value")
    p.add_argument(
        "--format", choices=["table", "csv", "json"], default="table", help="default table"
    )
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_arg_parser().parse_args(argv)
    ds = Dataset.embedded()
    try:
        attackers = _select_attackers(ds, args.attacker_faction, args.attacker_units)
        targets = _select_targets(ds, args.targets)
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    matrix = build_matrix(
        ds,
        attacker_units=attackers,
        targets=targets,
        distance=args.range,
        phase=args.phase,
        models_firing=args.models_firing,
    )
    matrix = _sort_and_cap(matrix, args.metric, args.top)

    if args.format == "csv":
        out = render_csv(matrix, targets, args.metric)
    elif args.format == "json":
        out = render_json(matrix, targets, args.metric)
    else:
        out = render_table(matrix, targets, args.metric)
    print(out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
