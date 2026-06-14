import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Z-test two-tailed Z=2.5 → p≈0.0124 (significant at α=0.05)",
    actions: [
      { kind: "fill", label: "Test Statistic", value: "2.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "P-Value", "Significant (reject H₀)"] },
  },
  {
    name: "Z-test two-tailed Z=1.2 → not significant at α=0.05",
    actions: [
      { kind: "fill", label: "Test Statistic", value: "1.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "P-Value", "Not Significant (fail to reject H₀)"] },
  },
];
