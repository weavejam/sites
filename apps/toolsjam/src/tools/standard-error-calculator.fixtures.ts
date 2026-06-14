import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Raw data test scores → SE displayed",
    actions: [
      { kind: "click", label: "Raw Data" },
      {
        kind: "fill",
        label: "Data (comma-separated numbers)",
        value: "85, 92, 88, 78, 90",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SE)", "Results", "Mean"] },
  },
  {
    name: "Summary stats mean=500, SD=5, n=100 → SE=0.5",
    actions: [
      { kind: "click", label: "Summary Statistics" },
      { kind: "fill", label: "Mean", value: "500" },
      { kind: "fill", label: "Standard Deviation (SD)", value: "5" },
      { kind: "fill", label: "Sample Size (n)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SE)", "Results"] },
  },
];
