import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single outlier at 50",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "10, 12, 14, 15, 16, 18, 20, 50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Q1 (First Quartile)", "Outlier Count"] },
  },
  {
    name: "No outliers in uniform data",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "10, 20, 30, 40, 50, 60, 70, 80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "No outliers found"] },
  },
  {
    name: "Multiple outliers at both ends",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "1, 25, 28, 30, 32, 35, 38, 100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "IQR"] },
  },
];
