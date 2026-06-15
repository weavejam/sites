import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "sin(45 + 30) degrees ≈ 0.9659",
    actions: [
      { kind: "click", label: "Sine (sin)" },
      { kind: "click", label: "Sum (A + B)" },
      { kind: "fill", label: "Angle A", value: "45" },
      { kind: "fill", label: "Angle B", value: "30" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.9659"] },
  },
  {
    name: "cos(60 - 45) degrees ≈ 0.9659",
    actions: [
      { kind: "click", label: "Cosine (cos)" },
      { kind: "click", label: "Difference (A − B)" },
      { kind: "fill", label: "Angle A", value: "60" },
      { kind: "fill", label: "Angle B", value: "45" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.9659"] },
  },
];
