import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "One-sample: IQ study x̄=105, μ=100, σ=15, n=30 — not significant",
    actions: [
      { kind: "click", label: "One-Sample" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "105" },
      { kind: "fill", label: "Population Mean (μ)", value: "100" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "15" },
      { kind: "fill", label: "Sample Size (n)", value: "30" },
      { kind: "click", label: "Two-Tailed" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Z-Statistic", "p-Value", "Fail to reject H₀"],
    },
  },
  {
    name: "One-sample: manufacturing x̄=10.01, μ=10, σ=0.02, n=50 — significant",
    actions: [
      { kind: "click", label: "One-Sample" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "10.01" },
      { kind: "fill", label: "Population Mean (μ)", value: "10" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "0.02" },
      { kind: "fill", label: "Sample Size (n)", value: "50" },
      { kind: "click", label: "Two-Tailed" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Z-Statistic", "Reject H₀"],
    },
  },
];
