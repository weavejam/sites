import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find k when x=4, y=12 → k=3",
    actions: [
      { kind: "click", label: "Find Constant k" },
      { kind: "fill", label: "x value", value: "4" },
      { kind: "fill", label: "y value", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "k = 3"] },
  },
  {
    name: "Find y when k=3.5, x=8 → y=28",
    actions: [
      { kind: "click", label: "Find y Value" },
      { kind: "fill", label: "Constant k", value: "3.5" },
      { kind: "fill", label: "x value", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "y = 28"] },
  },
  {
    name: "Find x when k=2.4, y=14.4 → x=6",
    actions: [
      { kind: "click", label: "Find x Value" },
      { kind: "fill", label: "Constant k", value: "2.4" },
      { kind: "fill", label: "y value", value: "14.4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "x = 6"] },
  },
];
