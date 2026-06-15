import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Slope + Point: m=2, (1,5) → b=3",
    actions: [
      { kind: "click", label: "Slope + Point" },
      { kind: "fill", label: "Slope (m)", value: "2" },
      { kind: "fill", label: "Point X", value: "1" },
      { kind: "fill", label: "Point Y", value: "5" },
      { kind: "click", label: "Calculate Y-Intercept" },
    ],
    expect: { text: ["Result", "3"] },
  },
  {
    name: "Two Points: (1,3) and (4,9) → b=1",
    actions: [
      { kind: "click", label: "Two Points" },
      { kind: "fill", label: "x₁", value: "1" },
      { kind: "fill", label: "y₁", value: "3" },
      { kind: "fill", label: "x₂", value: "4" },
      { kind: "fill", label: "y₂", value: "9" },
      { kind: "click", label: "Calculate Y-Intercept" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
