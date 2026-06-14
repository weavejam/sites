import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic even dataset 2,4,4,5,6,7,8,9 → IQR=3.5",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "2, 4, 4, 5, 6, 7, 8, 9" },
      { kind: "click", label: "Calculate IQR" },
    ],
    expect: { text: ["Results", "IQR (Q3 − Q1)", "Q1 (25th Percentile)", "No outliers detected."] },
  },
  {
    name: "Dataset with outliers → outliers flagged",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49, 78, 108" },
      { kind: "click", label: "Calculate IQR" },
    ],
    expect: { text: ["Results", "Outliers", "108"] },
  },
  {
    name: "Test scores 11 values → no outliers",
    actions: [
      { kind: "fill", label: "Data Set (comma-separated numbers)", value: "88, 92, 80, 78, 95, 84, 76, 90, 81, 85, 93" },
      { kind: "click", label: "Calculate IQR" },
    ],
    expect: { text: ["Results", "IQR (Q3 − Q1)", "No outliers detected."] },
  },
];
