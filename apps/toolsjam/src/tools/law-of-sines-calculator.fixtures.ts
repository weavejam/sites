import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "AAS: A=45°, B=60°, a=10 → all sides and angles",
    actions: [
      { kind: "click", label: "AAS (Angle-Angle-Side)" },
      { kind: "fill", label: "Angle A (°)", value: "45" },
      { kind: "fill", label: "Angle B (°)", value: "60" },
      { kind: "fill", label: "Side a", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Angle C"] },
  },
  {
    name: "SSA ambiguous: a=8, b=10, A=40° → two solutions",
    actions: [
      { kind: "click", label: "SSA (Side-Side-Angle)" },
      { kind: "fill", label: "Side a", value: "8" },
      { kind: "fill", label: "Side b", value: "10" },
      { kind: "fill", label: "Angle A (°)", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Solution 1", "Solution 2"] },
  },
  {
    name: "ASA: A=30°, c=12, B=50° → unique solution",
    actions: [
      { kind: "click", label: "ASA (Angle-Side-Angle)" },
      { kind: "fill", label: "Angle A (°)", value: "30" },
      { kind: "fill", label: "Side c", value: "12" },
      { kind: "fill", label: "Angle B (°)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Angle C"] },
  },
];
