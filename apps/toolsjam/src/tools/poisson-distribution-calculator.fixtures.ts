import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "λ=3, x=2 → P(X=x)≈0.224",
    actions: [
      { kind: "fill", label: "Average Rate (λ)", value: "3" },
      { kind: "fill", label: "Number of Events (x)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "P(X = x)"] },
  },
  {
    name: "λ=5, x=4 → shows all probabilities",
    actions: [
      { kind: "fill", label: "Average Rate (λ)", value: "5" },
      { kind: "fill", label: "Number of Events (x)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["P(X ≤ x)", "P(X ≥ x)"] },
  },
  {
    name: "λ=0, x=0 → P(X=x)=1",
    actions: [
      { kind: "fill", label: "Average Rate (λ)", value: "0" },
      { kind: "fill", label: "Number of Events (x)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results"] },
  },
];
