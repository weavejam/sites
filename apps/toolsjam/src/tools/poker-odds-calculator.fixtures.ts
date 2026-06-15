import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Flush draw, 4 players, pot $150, bet $30 → Call",
    actions: [
      { kind: "click", label: "Flush Draw (9 outs)" },
      { kind: "fill", label: "Number of Players", value: "4" },
      { kind: "fill", label: "Pot Size ($)", value: "150" },
      { kind: "fill", label: "Bet Amount ($)", value: "30" },
      { kind: "click", label: "Calculate Odds" },
    ],
    expect: { text: ["Poker Odds Results", "Winning Probability", "Pot Odds"] },
  },
  {
    name: "Gutshot, 2 players, pot $120, bet $40 → shows outs 4",
    actions: [
      { kind: "click", label: "Gutshot Straight Draw (4 outs)" },
      { kind: "fill", label: "Number of Players", value: "2" },
      { kind: "fill", label: "Pot Size ($)", value: "120" },
      { kind: "fill", label: "Bet Amount ($)", value: "40" },
      { kind: "click", label: "Calculate Odds" },
    ],
    expect: { text: ["Poker Odds Results", "Outs", "Recommendation"] },
  },
];
