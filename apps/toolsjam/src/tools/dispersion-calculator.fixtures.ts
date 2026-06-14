import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Test scores 85,92,78,88,76,95,89,72 — shows all dispersion metrics",
    actions: [
      {
        kind: "fill",
        label: "Data (comma-separated numbers)",
        value: "85, 92, 78, 88, 76, 95, 89, 72",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Dispersion Results", "Sample Variance", "IQR"],
    },
  },
  {
    name: "Quality control data — shows low CV",
    actions: [
      {
        kind: "fill",
        label: "Data (comma-separated numbers)",
        value: "502, 499, 505, 498, 501, 503, 497, 500",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Dispersion Results", "Coefficient of Variation", "Range"],
    },
  },
];
