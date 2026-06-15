import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Positive correlation: X=1..5, Y=2,4,5,4,6",
    actions: [
      { kind: "fill", label: "X-Values (Independent Variable)", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Y-Values (Dependent Variable)", value: "2, 4, 5, 4, 6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression Results", "Regression Equation"] },
  },
  {
    name: "Study hours vs scores: slope ~4.47",
    actions: [
      { kind: "fill", label: "X-Values (Independent Variable)", value: "2, 3, 5, 7, 8" },
      { kind: "fill", label: "Y-Values (Dependent Variable)", value: "65, 70, 78, 85, 92" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression Results", "Slope (m)"] },
  },
];
