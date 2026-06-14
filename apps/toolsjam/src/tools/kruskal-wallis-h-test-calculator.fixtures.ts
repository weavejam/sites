import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Three groups with clear differences → significant H",
    actions: [
      { kind: "fill", label: /Group 1/, value: "2, 3, 4, 5, 6" },
      { kind: "fill", label: /Group 2/, value: "10, 12, 14, 16, 18" },
      { kind: "fill", label: /Group 3/, value: "20, 22, 24, 26, 28" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "H Statistic", "Degrees of Freedom", "p-value"],
    },
  },
  {
    name: "Two groups similar values → not significant",
    actions: [
      { kind: "fill", label: /Group 1/, value: "5, 6, 7, 8, 9" },
      { kind: "fill", label: /Group 2/, value: "5, 6, 7, 8, 10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "H Statistic", "Fail to Reject"],
    },
  },
];
