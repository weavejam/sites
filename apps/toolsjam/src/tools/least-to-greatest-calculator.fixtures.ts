import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sort 5 numbers and show statistics",
    actions: [
      { kind: "fill", label: "Enter Numbers", value: "5, 3, 8, 1, 9, 2, 7, 4, 6" },
      { kind: "click", label: "Sort & Analyze" },
    ],
    expect: {
      text: ["Sorted (Least to Greatest)", "1", "9", "Count", "Sum", "Mean", "Median"],
    },
  },
  {
    name: "Sort with decimals and negatives",
    actions: [
      { kind: "fill", label: "Enter Numbers", value: "-3.5, 0, 2.1, -1, 4.7" },
      { kind: "click", label: "Sort & Analyze" },
    ],
    expect: {
      text: ["Sorted (Least to Greatest)", "Count", "Min", "Max", "Range"],
    },
  },
];
