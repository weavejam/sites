import type { ToolFixture } from "@/tools/fixture";

// All items default to 0 (worst score = High Fall Risk).
// Load-example buttons set all items to max (Low Risk) or min (High Risk).
export const fixtures: ToolFixture[] = [
  {
    name: "All items at minimum score — total 0, high fall risk",
    actions: [
      { kind: "click", label: "Calculate Tinetti Score" },
    ],
    expect: { text: ["0 / 16", "0 / 12", "0 / 28", "High Fall Risk"] },
  },
  {
    name: "Load low fall risk — all items at maximum, total 28",
    actions: [
      { kind: "click", label: "Load Low Fall Risk" },
    ],
    expect: { text: ["16 / 16", "12 / 12", "28 / 28", "Low Fall Risk"] },
  },
];
