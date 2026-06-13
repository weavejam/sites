import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(x+3)(x+2) = x^2+5x+6",
    actions: [
      { kind: "fill", label: "First Polynomial", value: "x + 3" },
      { kind: "fill", label: "Second Polynomial", value: "x + 2" },
      { kind: "click", label: "Multiply" },
    ],
    expect: { text: ["Product", "x^2"] },
  },
  {
    name: "(2x+1)(3x-4) = 6x^2-5x-4",
    actions: [
      { kind: "fill", label: "First Polynomial", value: "2x + 1" },
      { kind: "fill", label: "Second Polynomial", value: "3x - 4" },
      { kind: "click", label: "Multiply" },
    ],
    expect: { text: ["Product", "6x^2"] },
  },
  {
    name: "Example button (x+3)(x+2)",
    actions: [
      { kind: "click", label: "(x+3)(x+2)" },
      { kind: "click", label: "Multiply" },
    ],
    expect: { text: "Product" },
  },
];
