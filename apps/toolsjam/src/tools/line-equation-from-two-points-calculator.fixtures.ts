import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard case: (1,2) and (3,6) → y = 2x",
    actions: [
      { kind: "fill", label: "X₁", value: "1" },
      { kind: "fill", label: "Y₁", value: "2" },
      { kind: "fill", label: "X₂", value: "3" },
      { kind: "fill", label: "Y₂", value: "6" },
      { kind: "click", label: "Calculate Equation" },
    ],
    expect: { text: ["Line Equation Results", "Slope-Intercept Form"] },
  },
  {
    name: "Horizontal line: (2,4) and (5,4) → y = 4",
    actions: [
      { kind: "fill", label: "X₁", value: "2" },
      { kind: "fill", label: "Y₁", value: "4" },
      { kind: "fill", label: "X₂", value: "5" },
      { kind: "fill", label: "Y₂", value: "4" },
      { kind: "click", label: "Calculate Equation" },
    ],
    expect: { text: ["Line Equation Results", "Slope-Intercept Form"] },
  },
];
