import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "computes half-angle values for 90 degrees",
    actions: [
      { kind: "fill", label: "Angle", value: "90" },
      { kind: "click", label: "Calculate Half Angles" },
    ],
    expect: { text: ["Half-Angle Results", "sin(θ/2) = 0.707107", "cos(θ/2) = 0.707107", "tan(θ/2) = 1.000000"] },
  },
  {
    name: "computes half-angle values for 120 degrees",
    actions: [
      { kind: "fill", label: "Angle", value: "120" },
      { kind: "click", label: "Calculate Half Angles" },
    ],
    expect: { text: ["sin(θ/2) = 0.866025", "cos(θ/2) = 0.500000", "tan(θ/2) = 1.732051"] },
  },
];
