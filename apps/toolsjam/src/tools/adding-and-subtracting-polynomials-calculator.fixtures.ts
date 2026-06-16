import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "add two quadratics: (2x^2 + 3x - 5) + (x^2 - 2x + 4)",
    actions: [
      { kind: "click", label: "Add (+)" },
      { kind: "fill", label: "First Polynomial", value: "2x^2+3x-5" },
      { kind: "fill", label: "Second Polynomial", value: "x^2-2x+4" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Result"] },
  },
  {
    name: "subtract polynomials: (3x^2 + 7x - 2) - (2x^2 + x + 5)",
    actions: [
      { kind: "click", label: "Subtract (−)" },
      { kind: "fill", label: "First Polynomial", value: "3x^2+7x-2" },
      { kind: "fill", label: "Second Polynomial", value: "2x^2+x+5" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Result"] },
  },
];
