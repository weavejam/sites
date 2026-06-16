import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Quarter circle r=4, 90° → ≈6.2832",
    actions: [
      { kind: "fill", label: "Radius", value: "4" },
      { kind: "fill", label: "Central Angle", value: "90" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arc Length" },
    ],
    expect: { text: ["Result", "Arc length"] },
  },
  {
    name: "r=5, θ=1 radian → 5",
    actions: [
      { kind: "fill", label: "Radius", value: "5" },
      { kind: "fill", label: "Central Angle", value: "1" },
      { kind: "click", label: "Radians" },
      { kind: "click", label: "Calculate Arc Length" },
    ],
    expect: { text: ["Result", "Arc length = 5"] },
  },
  {
    name: "Semicircle r=10, 180° → ≈31.4159",
    actions: [
      { kind: "fill", label: "Radius", value: "10" },
      { kind: "fill", label: "Central Angle", value: "180" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arc Length" },
    ],
    expect: { text: ["Result", "Arc length"] },
  },
];
