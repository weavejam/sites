import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Educational intervention: d ≈ 0.52 (medium)",
    actions: [
      { kind: "fill", label: "Mean (M₁)", value: "85" },
      { kind: "fill", label: "Standard Deviation (s₁)", value: "10" },
      { kind: "fill", label: "Sample Size (n₁)", value: "30" },
      { kind: "fill", label: "Mean (M₂)", value: "80" },
      { kind: "fill", label: "Standard Deviation (s₂)", value: "9" },
      { kind: "fill", label: "Sample Size (n₂)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Cohen's d"] },
  },
  {
    name: "Medical trial: d ≈ -0.65 (medium)",
    actions: [
      { kind: "fill", label: "Mean (M₁)", value: "120" },
      { kind: "fill", label: "Standard Deviation (s₁)", value: "15" },
      { kind: "fill", label: "Sample Size (n₁)", value: "50" },
      { kind: "fill", label: "Mean (M₂)", value: "130" },
      { kind: "fill", label: "Standard Deviation (s₂)", value: "16" },
      { kind: "fill", label: "Sample Size (n₂)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Cohen's d"] },
  },
];
