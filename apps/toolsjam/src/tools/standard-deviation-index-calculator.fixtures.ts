import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Class scores 85,92,78,88,90 → results displayed",
    actions: [
      { kind: "fill", label: "Data Set", value: "85, 92, 78, 88, 90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Sample SD", "Mean", "Population SD", "Results"] },
  },
  {
    name: "Stock prices 150.25,152.50,149.75,153.00,151.50 → results displayed",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "150.25, 152.50, 149.75, 153.00, 151.50",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Sample SD", "Mean", "Results"] },
  },
];
