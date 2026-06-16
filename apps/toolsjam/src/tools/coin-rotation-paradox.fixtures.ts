import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Equal coins 2 and 2 → 2 rotations",
    actions: [
      { kind: "click", label: "Load equal coins example" },
      { kind: "click", label: "Calculate Rotations" }
    ],
    expect: { text: ["Calculation Results", "2"] }
  },
  {
    name: "Smaller moving coin 1 and 3 → 4 rotations",
    actions: [
      { kind: "fill", label: "Radius of Moving Coin (R₁)", value: "1" },
      { kind: "fill", label: "Radius of Fixed Coin (R₂)", value: "3" },
      { kind: "click", label: "Calculate Rotations" }
    ],
    expect: { text: ["Calculation Results", "4"] }
  },
  {
    name: "Larger moving coin 5 and 2 → 1.4 rotations",
    actions: [
      { kind: "fill", label: "Radius of Moving Coin (R₁)", value: "5" },
      { kind: "fill", label: "Radius of Fixed Coin (R₂)", value: "2" },
      { kind: "click", label: "Calculate Rotations" }
    ],
    expect: { text: ["Calculation Results", "1.4"] }
  }
];

