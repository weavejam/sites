import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Slope from (2,3) to (5,9) = 2",
    actions: [
      { kind: "click", label: "From Two Points" },
      { kind: "fill", label: "x₁", value: "2" },
      { kind: "fill", label: "y₁", value: "3" },
      { kind: "fill", label: "x₂", value: "5" },
      { kind: "fill", label: "y₂", value: "9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Slope (m) = 2"] },
  },
  {
    name: "Slope from (-1,5) to (3,1) = -1",
    actions: [
      { kind: "click", label: "From Two Points" },
      { kind: "fill", label: "x₁", value: "-1" },
      { kind: "fill", label: "y₁", value: "5" },
      { kind: "fill", label: "x₂", value: "3" },
      { kind: "fill", label: "y₂", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Slope (m) = -1"] },
  },
  {
    name: "Slope from equation y = -2.5x + 7",
    actions: [
      { kind: "click", label: "From Line Equation" },
      { kind: "fill", label: "Line Equation", value: "y = -2.5x + 7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Result" },
  },
];
