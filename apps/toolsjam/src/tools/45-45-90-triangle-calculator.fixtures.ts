import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Leg = 5 → hypotenuse ≈ 7.071",
    actions: [
      { kind: "click", label: "Leg (equal sides)" },
      { kind: "fill", label: "Side Length", value: "5" },
      { kind: "click", label: "Calculate Triangle" },
    ],
    expect: { text: ["Triangle Sides", "5"] },
  },
  {
    name: "Hypotenuse = 10 → legs ≈ 7.071",
    actions: [
      { kind: "click", label: "Hypotenuse (opposite 90°)" },
      { kind: "fill", label: "Side Length", value: "10" },
      { kind: "click", label: "Calculate Triangle" },
    ],
    expect: { text: ["Triangle Sides", "10"] },
  },
  {
    name: "Leg = 1 → hypotenuse ≈ 1.414",
    actions: [
      { kind: "click", label: "Leg (equal sides)" },
      { kind: "fill", label: "Side Length", value: "1" },
      { kind: "click", label: "Calculate Triangle" },
    ],
    expect: { text: ["Triangle Sides", "1"] },
  },
];
