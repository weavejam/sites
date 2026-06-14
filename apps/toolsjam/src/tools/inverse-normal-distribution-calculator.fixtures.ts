import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard normal left-tailed P=0.95 → x ≈ 1.6449",
    actions: [
      { kind: "click", label: "Left-Tailed" },
      { kind: "fill", label: "Mean (μ)", value: "0" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "1" },
      { kind: "fill", label: "Cumulative Probability", value: "0.95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "x-value", "Z-Score"] },
  },
  {
    name: "IQ top 2% right-tailed μ=100 σ=15 P=0.02 → x ≈ 130.8",
    actions: [
      { kind: "click", label: "Right-Tailed" },
      { kind: "fill", label: "Mean (μ)", value: "100" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "15" },
      { kind: "fill", label: "Cumulative Probability", value: "0.02" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "x-value"] },
  },
  {
    name: "Two-tailed central 95% μ=0 σ=1 → ±1.96",
    actions: [
      { kind: "click", label: "Two-Tailed (Centre)" },
      { kind: "fill", label: "Mean (μ)", value: "0" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "1" },
      { kind: "fill", label: "Cumulative Probability", value: "0.95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Lower x-value", "Upper x-value"] },
  },
];
