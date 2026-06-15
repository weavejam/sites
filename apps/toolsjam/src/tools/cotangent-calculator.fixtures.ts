import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "cot(45°) = 1",
    actions: [
      { kind: "click", label: "Angle" },
      { kind: "fill", label: "Angle", value: "45" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Cotangent" },
    ],
    expect: { text: ["cot(θ) =", "1"] },
  },
  {
    name: "cot(30°) ≈ 1.732",
    actions: [
      { kind: "click", label: "Angle" },
      { kind: "fill", label: "Angle", value: "30" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Cotangent" },
    ],
    expect: { text: ["cot(θ) =", "1.732"] },
  },
  {
    name: "coordinates X=3 Y=4 → cot=0.75",
    actions: [
      { kind: "click", label: "Coordinates" },
      { kind: "fill", label: "X Coordinate (adjacent)", value: "3" },
      { kind: "fill", label: "Y Coordinate (opposite)", value: "4" },
      { kind: "click", label: "Calculate Cotangent" },
    ],
    expect: { text: ["cot(θ) =", "0.75"] },
  },
];
