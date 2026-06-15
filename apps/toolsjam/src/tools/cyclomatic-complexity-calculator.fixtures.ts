import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Graph method: E=9 N=8 P=1 → M=3",
    actions: [
      { kind: "click", label: "Graph-based (M = E − N + 2P)" },
      { kind: "fill", label: "Edges (E)", value: "9" },
      { kind: "fill", label: "Nodes (N)", value: "8" },
      { kind: "fill", label: "Connected components (P)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "M = 3"] },
  },
  {
    name: "Decision method: D=4 → M=5",
    actions: [
      { kind: "click", label: "Decision-based (M = D + 1)" },
      { kind: "fill", label: "Decision points (D)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "M = 5"] },
  },
];
