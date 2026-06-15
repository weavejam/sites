import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "98.7654 rounded to 2 decimal places = 98.77",
    actions: [
      { kind: "fill", label: "Number to Round", value: "98.7654" },
      { kind: "click", label: "2 Decimal Places" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "98.77"] },
  },
  {
    name: "2.5 round half up = 3",
    actions: [
      { kind: "fill", label: "Number to Round", value: "2.5" },
      { kind: "click", label: "Round Half Up" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3"] },
  },
  {
    name: "156 rounded to nearest 100 = 200",
    actions: [
      { kind: "fill", label: "Number to Round", value: "156" },
      { kind: "click", label: "Nearest 100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "200"] },
  },
];
