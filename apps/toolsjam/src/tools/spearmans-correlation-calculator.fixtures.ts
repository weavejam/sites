import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Perfect positive correlation ρ = 1.0000",
    actions: [
      { kind: "fill", label: "Data Set X", value: "10, 20, 30, 40, 50" },
      { kind: "fill", label: "Data Set Y", value: "2, 4, 6, 8, 10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["ρ (Rho)", "Spearman's Correlation Results"] },
  },
  {
    name: "Strong negative correlation",
    actions: [
      {
        kind: "fill",
        label: "Data Set X",
        value: "105, 120, 90, 150, 135",
      },
      {
        kind: "fill",
        label: "Data Set Y",
        value: "4.5, 3.2, 5.0, 2.1, 2.9",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["ρ (Rho)", "Spearman's Correlation Results"] },
  },
];
