import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Student test scores: 20 scores, 5 classes → frequency table",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "82,90,75,68,88,75,95,100,72,85,91,78,84,88,77,95,65,80,73,86",
      },
      { kind: "fill", label: "Number of Classes (Bins)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Class Interval", "Frequency", "Mean (grouped)"] },
  },
  {
    name: "Plant heights: 20 values, 5 classes → frequency table",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "35,42,38,50,45,48,36,39,47,41,43,46,40,37,44,49,38,42,45,36",
      },
      { kind: "fill", label: "Number of Classes (Bins)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relative Frequency", "Cumulative Frequency"] },
  },
];
