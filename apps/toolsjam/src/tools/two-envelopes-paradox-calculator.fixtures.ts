import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Amount $100 → EV switch 125, EV keep 100",
    actions: [
      { kind: "fill", label: "Amount in Your Envelope (X)", value: "100" },
      { kind: "click", label: "Analyze" },
    ],
    expect: { text: ["125", "100"] },
  },
  {
    name: "Amount $50 → EV switch 62.5",
    actions: [
      { kind: "fill", label: "Amount in Your Envelope (X)", value: "50" },
      { kind: "click", label: "Analyze" },
    ],
    expect: { text: ["62.5"] },
  },
];
