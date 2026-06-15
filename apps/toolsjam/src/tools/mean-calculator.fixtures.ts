import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mean of 4, 8, 15, 16, 23, 42 → 18",
    actions: [
      { kind: "fill", label: "Numbers", value: "4, 8, 15, 16, 23, 42" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "18"] },
  },
  {
    name: "Mean of -10, -5, 0, 5, 10 → 0",
    actions: [
      { kind: "fill", label: "Numbers", value: "-10, -5, 0, 5, 10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0"] },
  },
  {
    name: "Mean of 100, 200, 300 → 200",
    actions: [
      { kind: "fill", label: "Numbers", value: "100, 200, 300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "200"] },
  },
];
