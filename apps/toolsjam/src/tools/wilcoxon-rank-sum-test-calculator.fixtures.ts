import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Drug efficacy: S1=[7,8,8,9,10,12] vs S2=[9,11,12,13,14,15] → U=4, reject H0",
    actions: [
      { kind: "fill", label: "Sample 1 Data", value: "7, 8, 8, 9, 10, 12" },
      { kind: "fill", label: "Sample 2 Data", value: "9, 11, 12, 13, 14, 15" },
      { kind: "click", label: "Two-Tailed" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "U Statistic", "p-Value", "Reject H₀"],
    },
  },
  {
    name: "Teaching method: S1 higher scores → right-tailed, reject H0",
    actions: [
      { kind: "fill", label: "Sample 1 Data", value: "85, 90, 78, 92, 88, 76" },
      { kind: "fill", label: "Sample 2 Data", value: "72, 80, 81, 75, 68, 79" },
      { kind: "click", label: "Right-Tailed" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Z-Score", "Reject H₀"],
    },
  },
];
