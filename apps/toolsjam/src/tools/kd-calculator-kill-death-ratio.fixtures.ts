import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Average player: 150 kills, 120 deaths, 18 wins, 30 matches → KD 1.25",
    actions: [
      { kind: "fill", label: "Total Kills", value: "150" },
      { kind: "fill", label: "Total Deaths", value: "120" },
      { kind: "fill", label: "Total Wins", value: "18" },
      { kind: "fill", label: "Total Matches", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Performance Stats", "1.25", "60.0%"] },
  },
  {
    name: "Pro player: 300 kills, 150 deaths, 28 wins, 35 matches → KD 2.00",
    actions: [
      { kind: "fill", label: "Total Kills", value: "300" },
      { kind: "fill", label: "Total Deaths", value: "150" },
      { kind: "fill", label: "Total Wins", value: "28" },
      { kind: "fill", label: "Total Matches", value: "35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Performance Stats", "2.00"] },
  },
];
