import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Flip 10 fair coins",
    actions: [
      { kind: "fill", label: "Number of Flips", value: "10" },
      { kind: "click", label: "Fair Coin (50/50)" },
      { kind: "click", label: "Flip Coins" },
    ],
    expect: { text: ["Results", "Heads", "Tails"] },
  },
  {
    name: "Flip 50 biased coins (70% heads)",
    actions: [
      { kind: "fill", label: "Number of Flips", value: "50" },
      { kind: "click", label: "Biased Coin" },
      { kind: "fill", label: "Heads Probability (%)", value: "70" },
      { kind: "click", label: "Flip Coins" },
    ],
    expect: { text: ["Results", "Heads", "Tails"] },
  },
];
