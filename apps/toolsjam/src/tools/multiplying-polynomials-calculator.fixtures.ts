import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(1+2x)(3+4x) = 3 + 10x + 8x²",
    actions: [
      { kind: "fill", label: "First Polynomial", value: "1, 2" },
      { kind: "fill", label: "Second Polynomial", value: "3, 4" },
      { kind: "click", label: "Calculate Product" },
    ],
    expect: { text: ["Product", "3 + 10x + 8x²"] },
  },
  {
    name: "(1+x²)(1+x) = 1 + x + x² + x³",
    actions: [
      { kind: "fill", label: "First Polynomial", value: "1, 0, 1" },
      { kind: "fill", label: "Second Polynomial", value: "1, 1" },
      { kind: "click", label: "Calculate Product" },
    ],
    expect: { text: ["Product", "1 + x + x² + x³"] },
  },
  {
    name: "(1+x)(1-x) = 1 - x²",
    actions: [
      { kind: "fill", label: "First Polynomial", value: "1, 1" },
      { kind: "fill", label: "Second Polynomial", value: "1, -1" },
      { kind: "click", label: "Calculate Product" },
    ],
    expect: { text: ["Product", "1 - x²"] },
  },
];
