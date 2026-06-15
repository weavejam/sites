import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "x²-4x+3 > 0 → two intervals outside roots 1 and 3",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Coefficient b", value: "-4" },
      { kind: "fill", label: "Coefficient c", value: "3" },
      { kind: "click", label: "> (greater than)" },
      { kind: "click", label: "Graph Inequality" },
    ],
    expect: { text: ["Analysis", "Solution Set"] },
  },
  {
    name: "-x²+2x+3 ≤ 0 → solution outside roots",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "-1" },
      { kind: "fill", label: "Coefficient b", value: "2" },
      { kind: "fill", label: "Coefficient c", value: "3" },
      { kind: "click", label: "≤ (less than or equal to)" },
      { kind: "click", label: "Graph Inequality" },
    ],
    expect: { text: ["Analysis", "Solution Set"] },
  },
];
