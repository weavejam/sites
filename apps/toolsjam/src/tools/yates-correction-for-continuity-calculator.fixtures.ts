import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Vaccine trial: a=3,b=22,c=11,d=14 → χ²≈4.86, p≈0.027, significant",
    actions: [
      { kind: "fill", label: "Group A, Outcome 1 (a)", value: "3" },
      { kind: "fill", label: "Group A, Outcome 2 (b)", value: "22" },
      { kind: "fill", label: "Group B, Outcome 1 (c)", value: "11" },
      { kind: "fill", label: "Group B, Outcome 2 (d)", value: "14" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "Results",
        "Yates χ² Statistic",
        "p-Value",
        "Significant association detected",
      ],
    },
  },
  {
    name: "A/B ad test: a=25,b=975,c=15,d=985 → not significant",
    actions: [
      { kind: "fill", label: "Group A, Outcome 1 (a)", value: "25" },
      { kind: "fill", label: "Group A, Outcome 2 (b)", value: "975" },
      { kind: "fill", label: "Group B, Outcome 1 (c)", value: "15" },
      { kind: "fill", label: "Group B, Outcome 2 (d)", value: "985" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Degrees of Freedom", "No significant association"],
    },
  },
];
