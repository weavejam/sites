import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "λ=2, x=0.5 — P(X<x)",
    actions: [
      { kind: "fill", label: "Rate Parameter (λ)", value: "2" },
      { kind: "fill", label: "Value (x)", value: "0.5" },
      { kind: "click", label: "P(X < x)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "P(X < x)"] },
  },
  {
    name: "λ=0.1, x=5 — PDF",
    actions: [
      { kind: "fill", label: "Rate Parameter (λ)", value: "0.1" },
      { kind: "fill", label: "Value (x)", value: "5" },
      { kind: "click", label: "PDF f(x)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Mean"] },
  },
];
