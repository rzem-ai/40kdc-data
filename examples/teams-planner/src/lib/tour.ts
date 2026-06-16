/**
 * Guided product tour for the planner, driven by driver.js. Steps anchor to the
 * `data-tour` attributes scattered across PlanView / CoverageMatrix / App.
 * `startTour()` is fired right after the example plan is loaded, so every anchor
 * (matrix rows, a real lock toggle, the players list) points at populated UI.
 */
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

const STEPS: DriveStep[] = [
  {
    popover: {
      title: "Teams Planner",
      description:
        "Plan a team's Force Disposition coverage: who can field what, and who commits to each one. Here is the quick tour.",
    },
  },
  {
    element: '[data-tour="size"]',
    popover: {
      title: "Team size",
      description:
        "Sets the per-disposition lock cap. Teams of 3 to 5 take each disposition once; 6 to 8 take it twice.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: '[data-tour="matrix"]',
    popover: {
      title: "Coverage matrix",
      description:
        "Rows are players, columns are the five Force Dispositions. The symbol shows desire: ○ could, ● prefer, ★ want.",
      side: "top",
    },
  },
  {
    element: '[data-tour="lock"]',
    popover: {
      title: "Lock a disposition",
      description:
        "Each cell is a toggle. Lock a player into one disposition and the rest of their row greys out (one disposition per player).",
      side: "top",
    },
  },
  {
    element: '[data-tour="coverage-footer"]',
    popover: {
      title: "Coverage tally",
      description:
        "How many players can field each disposition, any GAPs, and how many are locked in (🔒 n of cap).",
      side: "top",
    },
  },
  {
    element: '[data-tour="player"]',
    popover: {
      title: "Build the pool",
      description:
        "Give each player their factions and a pool of prospective armies. Coverage is derived from what those armies can field.",
      side: "top",
    },
  },
  {
    element: '[data-tour="sim"]',
    popover: {
      title: "Pairings practice",
      description: "Dry-run the event's pairing sequence against your plan before you reach the table.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: '[data-tour="share"]',
    popover: {
      title: "Share or go live",
      description: "Pack the plan into a link, or go live so the whole team edits it together.",
      side: "bottom",
      align: "end",
    },
  },
];

export function startTour(): void {
  driver({
    showProgress: true,
    allowClose: true,
    popoverClass: "tp-tour",
    nextBtnText: "Next",
    prevBtnText: "Back",
    doneBtnText: "Done",
    stageRadius: 4,
    steps: STEPS,
  }).drive();
}
