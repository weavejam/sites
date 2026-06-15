import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simple inequality x > 3 → (3, ∞)",
    actions: [
      { kind: "fill", label: "Inequality", value: "x > 3" },
      { kind: "click", label: "Graph Inequality" },
    ],
    expect: { text: ["Graph", "(3, ∞)"] },
  },
  {
    name: "Compound inequality -1 < x <= 4 → (-1, 4]",
    actions: [
      { kind: "fill", label: "Inequality", value: "-1 < x <= 4" },
      { kind: "click", label: "Graph Inequality" },
    ],
    expect: { text: ["Graph", "(-1, 4]"] },
  },
  {
    name: "Simple inequality y <= -2 → (−∞, -2]",
    actions: [
      { kind: "fill", label: "Inequality", value: "y <= -2" },
      { kind: "click", label: "Graph Inequality" },
    ],
    expect: { text: ["Graph"] },
  },
];
