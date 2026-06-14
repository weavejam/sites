import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Manufacturing bolts: s1²=0.34 n1=25, s2²=0.29 n2=25 → result shown",
    actions: [
      { kind: "fill", label: "Group 1 Sample Variance (s²)", value: "0.34" },
      { kind: "fill", label: "Group 1 Sample Size (n)", value: "25" },
      { kind: "fill", label: "Group 2 Sample Variance (s²)", value: "0.29" },
      { kind: "fill", label: "Group 2 Sample Size (n)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "F-Statistic"] },
  },
  {
    name: "Stock volatility: s1²=1.5 n1=30, s2²=1.2 n2=30 → result shown",
    actions: [
      { kind: "fill", label: "Group 1 Sample Variance (s²)", value: "1.5" },
      { kind: "fill", label: "Group 1 Sample Size (n)", value: "30" },
      { kind: "fill", label: "Group 2 Sample Variance (s²)", value: "1.2" },
      { kind: "fill", label: "Group 2 Sample Size (n)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["p-Value (two-tailed)", "Critical F-Value"] },
  },
];
