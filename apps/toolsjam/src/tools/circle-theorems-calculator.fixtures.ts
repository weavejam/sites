import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Inscribed angle from central angle 80°",
    actions: [
      { kind: "click", label: "Inscribed Angle" },
      { kind: "click", label: "Find Inscribed Angle" },
      { kind: "fill", label: "Central Angle (°)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Inscribed Angle", "40°"] },
  },
  {
    name: "Cyclic quadrilateral opposite angle: 110° → 70°",
    actions: [
      { kind: "click", label: "Cyclic Quadrilateral" },
      { kind: "fill", label: "Known Angle (°)", value: "110" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Opposite Angle", "70°"] },
  },
  {
    name: "Angle in semicircle is always 90°",
    actions: [
      { kind: "click", label: "Angle in Semicircle" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["90°"] },
  },
];
