import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Quiz scores 8,7,9,8,10,7,8,9,6,8,7,9,8,5,9 — shows dot plot",
    actions: [
      {
        kind: "fill",
        label: "Data Set (comma-separated numbers)",
        value: "8, 7, 9, 8, 10, 7, 8, 9, 6, 8, 7, 9, 8, 5, 9",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Dot Plot", "Mean", "Mode"],
    },
  },
  {
    name: "Temperature readings — shows negative values in dot plot",
    actions: [
      {
        kind: "fill",
        label: "Data Set (comma-separated numbers)",
        value: "2, 1, -1, 0, 2, -1, -2, -1, 0, 1, 2, 3, 0, -1",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Summary Statistics", "Median", "Range"],
    },
  },
];
