import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Vector method: (3,4) and (1,0) → ~53.13°",
    actions: [
      { kind: "click", label: "Angle Between Vectors" },
      { kind: "fill", label: "Ax", value: "3" },
      { kind: "fill", label: "Ay", value: "4" },
      { kind: "fill", label: "Bx", value: "1" },
      { kind: "fill", label: "By", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Angle (Degrees)", "Angle (Radians)"] },
  },
  {
    name: "Slope method: (1,1) → 45°",
    actions: [
      { kind: "click", label: "Angle from Slope" },
      { kind: "fill", label: "x", value: "1" },
      { kind: "fill", label: "y", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Angle (Degrees)", "45"] },
  },
  {
    name: "Three-point method: perpendicular angle at B",
    actions: [
      { kind: "click", label: "Angle at Three Points" },
      { kind: "fill", label: "x₁", value: "0" },
      { kind: "fill", label: "y₁", value: "0" },
      { kind: "fill", label: "x₂", value: "1" },
      { kind: "fill", label: "y₂", value: "0" },
      { kind: "fill", label: "x₃", value: "1" },
      { kind: "fill", label: "y₃", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Angle (Degrees)", "Angle (Radians)"] },
  },
];
