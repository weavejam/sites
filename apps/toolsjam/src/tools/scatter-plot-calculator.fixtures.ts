import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Perfect negative correlation: X=1,2,3,4,5 Y=5,4,3,2,1",
    actions: [
      { kind: "fill", label: "X-Axis Values", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Y-Axis Values", value: "5, 4, 3, 2, 1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression & Correlation Results", "r"] },
  },
  {
    name: "Strong positive correlation",
    actions: [
      { kind: "fill", label: "X-Axis Values", value: "2, 4, 6, 8, 10" },
      { kind: "fill", label: "Y-Axis Values", value: "3, 7, 8, 13, 15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression & Correlation Results", "Regression equation"] },
  },
  {
    name: "Moderate positive correlation",
    actions: [
      { kind: "fill", label: "X-Axis Values", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Y-Axis Values", value: "2, 4, 5, 4, 5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression & Correlation Results", "Number of points (n)"] },
  },
];
