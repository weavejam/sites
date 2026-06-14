import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Blood pressure study: significant reduction",
    actions: [
      {
        kind: "fill",
        label: "Group 1 Data (e.g. Before Treatment)",
        value: "140, 135, 150, 155, 130, 142, 138, 147, 152, 133",
      },
      {
        kind: "fill",
        label: "Group 2 Data (e.g. After Treatment)",
        value: "132, 130, 145, 148, 125, 135, 130, 140, 145, 128",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "t-Statistic", "Reject H₀"] },
  },
  {
    name: "Tutoring program: significant improvement",
    actions: [
      {
        kind: "fill",
        label: "Group 1 Data (e.g. Before Treatment)",
        value: "75, 80, 82, 70, 88, 65, 90, 78",
      },
      {
        kind: "fill",
        label: "Group 2 Data (e.g. After Treatment)",
        value: "85, 85, 88, 78, 92, 75, 95, 85",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Degrees of Freedom", "P-Value"] },
  },
];
