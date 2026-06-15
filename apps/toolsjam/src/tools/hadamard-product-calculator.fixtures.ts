import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "multiplies matching vectors element by element",
    actions: [
      { kind: "fill", label: "First Vector (A)", value: "1, 2, 3" },
      { kind: "fill", label: "Second Vector (B)", value: "4, 5, 6" },
      { kind: "click", label: "Calculate Hadamard Product" },
    ],
    expect: { text: ["Hadamard Product", "[4, 10, 18]"] },
  },
  {
    name: "multiplies two-element vectors with decimals",
    actions: [
      { kind: "fill", label: "First Vector (A)", value: "2, 0.5" },
      { kind: "fill", label: "Second Vector (B)", value: "3, 4" },
      { kind: "click", label: "Calculate Hadamard Product" },
    ],
    expect: { text: ["Hadamard Product", "[6, 2]"] },
  },
];
