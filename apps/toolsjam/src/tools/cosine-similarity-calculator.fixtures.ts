import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "identical direction vectors → 1.0",
    actions: [
      { kind: "fill", label: "First Vector (A)", value: "1, 2, 3" },
      { kind: "fill", label: "Second Vector (B)", value: "2, 4, 6" },
      { kind: "click", label: "Calculate Similarity" },
    ],
    expect: { text: ["Cosine Similarity", "1"] },
  },
  {
    name: "orthogonal vectors → 0",
    actions: [
      { kind: "fill", label: "First Vector (A)", value: "1, 0" },
      { kind: "fill", label: "Second Vector (B)", value: "0, 1" },
      { kind: "click", label: "Calculate Similarity" },
    ],
    expect: { text: ["Cosine Similarity", "0"] },
  },
  {
    name: "opposite direction vectors → -1",
    actions: [
      { kind: "fill", label: "First Vector (A)", value: "1, 0" },
      { kind: "fill", label: "Second Vector (B)", value: "-1, 0" },
      { kind: "click", label: "Calculate Similarity" },
    ],
    expect: { text: ["Cosine Similarity", "-1"] },
  },
];
