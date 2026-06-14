import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Manufacturing precision: Var1=0.34 n1=25, Var2=0.29 n2=25 → result shown",
    actions: [
      { kind: "fill", label: "Group 1 Variance (s²)", value: "0.34" },
      { kind: "fill", label: "Group 1 Sample Size (n)", value: "25" },
      { kind: "fill", label: "Group 2 Variance (s²)", value: "0.29" },
      { kind: "fill", label: "Group 2 Sample Size (n)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "F-Statistic"] },
  },
  {
    name: "Stock volatility: Var1=5.2 n1=100, Var2=4.8 n2=100 → result shown",
    actions: [
      { kind: "fill", label: "Group 1 Variance (s²)", value: "5.2" },
      { kind: "fill", label: "Group 1 Sample Size (n)", value: "100" },
      { kind: "fill", label: "Group 2 Variance (s²)", value: "4.8" },
      { kind: "fill", label: "Group 2 Sample Size (n)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["p-Value (two-tailed)", "Critical F-Value"] },
  },
];
