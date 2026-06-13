import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "3 groups → significant difference between groups 1 and 3",
    actions: [
      { kind: "fill", label: "Group 1", value: "23, 25, 28, 30" },
      { kind: "fill", label: "Group 2", value: "22, 24, 26, 28" },
      { kind: "fill", label: "Group 3", value: "35, 38, 40, 42" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["ANOVA", "Significant"] },
  },
  {
    name: "2 groups with similar means → not significant",
    actions: [
      { kind: "fill", label: "Group 1", value: "10, 11, 12, 13, 14" },
      { kind: "fill", label: "Group 2", value: "10, 12, 11, 13, 12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["ANOVA", "Not significant"] },
  },
];
