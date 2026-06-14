import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "European Straight Up $10 → $360 total, $350 net, 35:1 odds",
    actions: [
      { kind: "fill", label: "Bet Amount ($)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "$360.00", "$350.00", "35:1"] },
  },
  {
    name: "European Straight Up $50 → $1,800 total, $1,750 net",
    actions: [
      { kind: "fill", label: "Bet Amount ($)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "$1,800.00", "$1,750.00", "35:1"] },
  },
];
