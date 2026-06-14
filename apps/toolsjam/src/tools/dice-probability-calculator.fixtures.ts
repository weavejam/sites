import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2 dice d6 exact sum 7 → 16.6667%",
    actions: [
      { kind: "click", label: "Exact Sum" },
      { kind: "fill", label: "Number of Dice", value: "2" },
      { kind: "fill", label: "Target Sum", value: "7" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: {
      text: ["16.6667%", "6/36"],
    },
  },
  {
    name: "1 die d6 exact sum 4 → 16.6667%",
    actions: [
      { kind: "click", label: "Exact Sum" },
      { kind: "fill", label: "Number of Dice", value: "1" },
      { kind: "fill", label: "Target Sum", value: "4" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: {
      text: ["16.6667%"],
    },
  },
  {
    name: "3 dice d6 at least 16 → 4.6296%",
    actions: [
      { kind: "click", label: "At Least" },
      { kind: "fill", label: "Number of Dice", value: "3" },
      { kind: "fill", label: "Target Sum", value: "16" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: {
      text: ["4.6296%"],
    },
  },
];
