import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "n1=10, s1=2, n2=15, s2=3 → pooled SD",
    actions: [
      { kind: "fill", label: "Sample Size (n₁)", value: "10" },
      { kind: "fill", label: "Sample Mean (x̄₁)", value: "50" },
      { kind: "fill", label: "Sample Standard Deviation (s₁)", value: "2" },
      { kind: "fill", label: "Sample Size (n₂)", value: "15" },
      { kind: "fill", label: "Sample Mean (x̄₂)", value: "55" },
      { kind: "fill", label: "Sample Standard Deviation (s₂)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Pooled SD"] },
  },
  {
    name: "Equal samples n1=n2=20",
    actions: [
      { kind: "fill", label: "Sample Size (n₁)", value: "20" },
      { kind: "fill", label: "Sample Mean (x̄₁)", value: "30" },
      { kind: "fill", label: "Sample Standard Deviation (s₁)", value: "4" },
      { kind: "fill", label: "Sample Size (n₂)", value: "20" },
      { kind: "fill", label: "Sample Mean (x̄₂)", value: "35" },
      { kind: "fill", label: "Sample Standard Deviation (s₂)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Degrees of Freedom"] },
  },
];
