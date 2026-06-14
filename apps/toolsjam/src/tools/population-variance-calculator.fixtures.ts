import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Classic dataset: 2,4,4,4,5,5,7,9 → variance=4",
    actions: [
      { kind: "fill", label: "Data Set", value: "2, 4, 4, 4, 5, 5, 7, 9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Population Variance"] },
  },
  {
    name: "Simple 5-value dataset: 10,20,30,40,50",
    actions: [
      { kind: "fill", label: "Data Set", value: "10, 20, 30, 40, 50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Mean"] },
  },
  {
    name: "Single-value dataset: 42",
    actions: [
      { kind: "fill", label: "Data Set", value: "42" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results"] },
  },
];
