import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Roll 2 d6 dice 100 times — shows statistics",
    actions: [
      { kind: "fill", label: "Number of Dice", value: "2" },
      { kind: "fill", label: "Number of Rolls", value: "100" },
      { kind: "click", label: "Roll Dice" },
    ],
    expect: {
      text: ["Roll Statistics", "Mean", "Std Dev"],
    },
  },
  {
    name: "Roll 1 d20 die 200 times — shows frequency distribution",
    actions: [
      { kind: "fill", label: "Number of Dice", value: "1" },
      { kind: "fill", label: "Number of Rolls", value: "200" },
      { kind: "click", label: "Roll Dice" },
    ],
    expect: {
      text: ["Frequency Distribution", "Sum", "Count"],
    },
  },
];
