import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(5x-4)/(x^2-x-2) → A/(x-2) + B/(x+1)",
    actions: [
      { kind: "fill", label: "Numerator P(x)", value: "5x - 4" },
      { kind: "fill", label: "Denominator Q(x)", value: "x^2 - x - 2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Partial Fraction Decomposition"] },
  },
  {
    name: "1/(x^2+x) → 1/x - 1/(x+1)",
    actions: [
      { kind: "fill", label: "Numerator P(x)", value: "1" },
      { kind: "fill", label: "Denominator Q(x)", value: "x^2 + x" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Partial Fraction Decomposition"] },
  },
];
