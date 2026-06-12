/**
 * Terrain sets: editor-only macros that stamp a recurring area + parented
 * feature composition in one action. Definitions are mined from the committed
 * layouts (the consensus local placements across 4+ layouts), so a stamped set
 * matches how the same furniture is already arranged on real boards. Feature
 * positions are in the parent area's centroid-local frame — the convention the
 * resolver and `parent_area_id` use — so the whole set moves/rotates with the
 * area after stamping. Purely an authoring affordance: the exported JSON is
 * ordinary pieces, indistinguishable from hand-placed ones.
 */
import type { Mirror, Vec2 } from "./model.js";

export interface SetFeatureDef {
  template: string;
  /** Centroid in the parent area's centroid-local frame. */
  position: Vec2;
  rotation: number;
  mirror?: Mirror;
}

export interface TerrainSetDef {
  id: string;
  name: string;
  area: { template: string; rotation?: number };
  features: SetFeatureDef[];
}

export const TERRAIN_SETS: TerrainSetDef[] = [
  {
    id: "gantry-line",
    name: "Gantry strip",
    area: { template: "area-long-line" },
    features: [
      { template: "gantry", position: { x: 0, y: 0 }, rotation: 0 },
      { template: "barricade", position: { x: 2.93, y: 0 }, rotation: 180 },
      { template: "barricade", position: { x: -2.93, y: 0 }, rotation: 180 },
    ],
  },
  {
    id: "catwalk-line",
    name: "Catwalk strip",
    area: { template: "area-short-line" },
    features: [{ template: "catwalk", position: { x: 0, y: 0 }, rotation: 0 }],
  },
  {
    id: "pipe-line",
    name: "Pipe strip",
    area: { template: "area-short-line" },
    features: [{ template: "pipe", position: { x: 0, y: 0 }, rotation: 0 }],
  },
  {
    id: "generator-pad",
    name: "Generator pad",
    area: { template: "area-medium" },
    features: [{ template: "generator", position: { x: 0, y: 0 }, rotation: 90 }],
  },
  {
    id: "ruin-corners-medium",
    name: "Medium ruin corners",
    area: { template: "area-medium" },
    features: [
      { template: "corner-short", position: { x: -2.05, y: -0.6 }, rotation: 0 },
      { template: "corner-short", position: { x: 2.05, y: 0.6 }, rotation: 180 },
    ],
  },
  // Large-ruin variants, mined from the committed layouts: an `area-large` slab
  // wears different corner-piece pairings on real boards, so each recurring
  // arrangement (present in ≥2 layouts) is its own stamp. Feature placements are
  // taken verbatim from a representative committed instance, so a stamped set
  // reproduces a real ruin; rotate the area after stamping to face it any way.
  {
    id: "ruin-large-left-short",
    name: "Large ruin — left + short",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-left", position: { x: -2.9, y: 2.31 }, rotation: 270 },
      { template: "corner-short", position: { x: 4.77, y: -1.97 }, rotation: 0, mirror: "horizontal" },
    ],
  },
  {
    id: "ruin-large-bal-right-short",
    name: "Large ruin — balanced-right + short",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-balanced-right", position: { x: -3.83, y: 1.87 }, rotation: 180 },
      { template: "corner-short", position: { x: 4.77, y: -2.02 }, rotation: 0, mirror: "horizontal" },
    ],
  },
  {
    id: "ruin-large-bal-right-right",
    name: "Large ruin — balanced-right + right",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-balanced-right", position: { x: -4.07, y: -1.52 }, rotation: 270 },
      { template: "corner-ruin-right", position: { x: 2.83, y: 2.32 }, rotation: 90 },
    ],
  },
  {
    id: "ruin-large-bal-left-right",
    name: "Large ruin — balanced-left + right",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-right", position: { x: -2.91, y: -2.39 }, rotation: 270 },
      { template: "corner-ruin-balanced-left", position: { x: 3.62, y: 1.68 }, rotation: 180 },
    ],
  },
  {
    id: "ruin-large-left-right",
    name: "Large ruin — left + right",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-left", position: { x: 4.67, y: 0.89 }, rotation: 180 },
      { template: "corner-ruin-right", position: { x: -2.88, y: -2.36 }, rotation: 270 },
    ],
  },
  {
    id: "ruin-large-single",
    name: "Large ruin — single corner",
    area: { template: "area-large" },
    features: [
      { template: "corner-ruin-left", position: { x: -2.98, y: 2.43 }, rotation: 270 },
    ],
  },
];
