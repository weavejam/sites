import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Blood pressure before/after medication — W=0, significant reduction",
    actions: [
      {
        kind: "fill",
        label: "Sample 1 Data (e.g., Before Treatment)",
        value: "140, 135, 150, 160, 130, 145, 155, 138, 148, 152",
      },
      {
        kind: "fill",
        label: "Sample 2 Data (e.g., After Treatment)",
        value: "132, 130, 142, 151, 125, 137, 145, 130, 140, 148",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "W Statistic", "p-Value (two-tailed)", "Reject H₀"],
    },
  },
  {
    name: "Anxiety scores before/after therapy — significant improvement",
    actions: [
      {
        kind: "fill",
        label: "Sample 1 Data (e.g., Before Treatment)",
        value: "8, 7, 6, 9, 8, 7, 8, 9",
      },
      {
        kind: "fill",
        label: "Sample 2 Data (e.g., After Treatment)",
        value: "6, 5, 5, 7, 6, 6, 7, 7",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "W⁺ (positive ranks sum)", "Reject H₀"],
    },
  },
];
