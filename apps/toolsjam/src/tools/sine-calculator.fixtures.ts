import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "sin(30 degrees) = 0.5",
    actions: [
      { kind: "fill", label: "Angle (x)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "sin(30 Degrees) = 0.5"] },
  },
  {
    name: "sin(90 degrees) = 1",
    actions: [
      { kind: "fill", label: "Angle (x)", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "sin(90 Degrees) = 1"] },
  },
  {
    name: "sin(-45 degrees) ≈ -0.7071",
    actions: [
      { kind: "fill", label: "Angle (x)", value: "-45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Result" },
  },
];
