import { describe, it, expect } from "vitest";
import { buildNotes, type BuildNotesInput } from "./notes.js";

const BASE: BuildNotesInput = {
  name: "",
  id: "",
  bounds: null,
  units: [],
  freeform: "",
};

describe("buildNotes", () => {
  it("returns an empty string when nothing is filled in", () => {
    expect(buildNotes(BASE)).toBe("");
  });

  it("emits name + id on one header line", () => {
    expect(buildNotes({ ...BASE, name: "Battle Hauler Chassis", id: "battle-hauler-chassis" })).toBe(
      "Hull shape: Battle Hauler Chassis (battle-hauler-chassis)",
    );
  });

  it("labels an unnamed-but-identified hull", () => {
    expect(buildNotes({ ...BASE, id: "rhino-chassis" })).toBe("Hull shape: (unnamed) (rhino-chassis)");
  });

  it("omits the id parenthetical when only a name is present", () => {
    expect(buildNotes({ ...BASE, name: "Rhino" })).toBe("Hull shape: Rhino");
  });

  it("formats bounds to two decimals with inch marks", () => {
    expect(buildNotes({ ...BASE, bounds: { width: 5.2, height: 3.14159 } })).toBe(
      'Bounds: 5.20″ × 3.14″',
    );
  });

  it("lists tagged units in order, with faction when present", () => {
    const out = buildNotes({
      ...BASE,
      units: [
        { id: "land-raider", name: "Land Raider", faction: "Space Marines" },
        { id: "mystery", name: "Mystery Hull" },
      ],
    });
    expect(out).toBe(
      ["Used by:", "- Land Raider (land-raider) — Space Marines", "- Mystery Hull (mystery)"].join(
        "\n",
      ),
    );
  });

  it("assembles a full block with blank-line separators between sections", () => {
    const out = buildNotes({
      name: "Rhino",
      id: "rhino-chassis",
      bounds: { width: 4, height: 2 },
      units: [{ id: "rhino", name: "Rhino", faction: "Space Marines" }],
      freeform: "Measured from the hull, not the dozer blade.",
    });
    expect(out).toBe(
      [
        "Hull shape: Rhino (rhino-chassis)",
        'Bounds: 4.00″ × 2.00″',
        "",
        "Used by:",
        "- Rhino (rhino) — Space Marines",
        "",
        "Notes:",
        "Measured from the hull, not the dozer blade.",
      ].join("\n"),
    );
  });

  it("trims whitespace-only fields rather than emitting empty headers", () => {
    expect(buildNotes({ ...BASE, name: "   ", id: "  ", freeform: "   " })).toBe("");
  });
});
