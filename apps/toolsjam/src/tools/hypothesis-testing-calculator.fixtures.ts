import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Z-test mean: quality control bolts, two-tailed → reject H₀",
    actions: [
      { kind: "click", label: "Z-Test (Mean, σ known)" },
      { kind: "click", label: "Two-Tailed (≠)" },
      { kind: "fill", label: "Null Hypothesis Value (μ₀ or p₀)", value: "10" },
      { kind: "fill", label: "Significance Level (α)", value: "0.05" },
      { kind: "fill", label: "Sample Size (n)", value: "50" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "10.01" },
      { kind: "fill", label: "Population Std Dev (σ)", value: "0.03" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Test Statistic", "p-Value", "Reject H₀"] },
  },
  {
    name: "T-test mean: drug trial right-tailed → reject H₀",
    actions: [
      { kind: "click", label: "T-Test (Mean, σ unknown)" },
      { kind: "click", label: "Right-Tailed (>)" },
      { kind: "fill", label: "Null Hypothesis Value (μ₀ or p₀)", value: "10" },
      { kind: "fill", label: "Significance Level (α)", value: "0.05" },
      { kind: "fill", label: "Sample Size (n)", value: "30" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "12" },
      { kind: "fill", label: "Sample Std Dev (s)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Degrees of Freedom", "Reject H₀"] },
  },
  {
    name: "Z-test proportion: A/B testing right-tailed → reject H₀",
    actions: [
      { kind: "click", label: "Z-Test (Proportion)" },
      { kind: "click", label: "Right-Tailed (>)" },
      { kind: "fill", label: "Null Hypothesis Value (μ₀ or p₀)", value: "0.08" },
      { kind: "fill", label: "Significance Level (α)", value: "0.05" },
      { kind: "fill", label: "Sample Size (n)", value: "1000" },
      { kind: "fill", label: "Sample Proportion (p̂)", value: "0.095" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "p-Value", "Reject H₀"] },
  },
];
