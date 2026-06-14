import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "P(X̄ < 78) with μ=80, σ=10, n=30",
    actions: [
      { kind: "click", label: "P(X̄ < x)" },
      { kind: "fill", label: "Population Mean (μ)", value: "80" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "10" },
      { kind: "fill", label: "Sample Size (n)", value: "30" },
      { kind: "fill", label: "Sample Mean (x₁)", value: "78" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SE)", "Probability"] },
  },
  {
    name: "P(X̄ > 1010) with μ=1000, σ=50, n=40",
    actions: [
      { kind: "click", label: "P(X̄ > x)" },
      { kind: "fill", label: "Population Mean (μ)", value: "1000" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "50" },
      { kind: "fill", label: "Sample Size (n)", value: "40" },
      { kind: "fill", label: "Sample Mean (x₁)", value: "1010" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SE)", "Probability"] },
  },
  {
    name: "P(2.9 < X̄ < 3.1) with μ=3, σ=0.5, n=50",
    actions: [
      { kind: "click", label: "P(x₁ < X̄ < x₂)" },
      { kind: "fill", label: "Population Mean (μ)", value: "3" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "0.5" },
      { kind: "fill", label: "Sample Size (n)", value: "50" },
      { kind: "fill", label: "Sample Mean (x₁)", value: "2.9" },
      { kind: "fill", label: "Sample Mean (x₂)", value: "3.1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SE)", "Probability"] },
  },
];
