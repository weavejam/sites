import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "95% CI: mean=75, s=5, n=100 → (74.02, 75.98)",
    actions: [
      { kind: "click", label: "Summary Statistics" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "75" },
      { kind: "fill", label: "Sample Std Dev (s)", value: "5" },
      { kind: "fill", label: "Sample Size (n)", value: "100" },
      { kind: "click", label: "95%" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["95% Confidence Interval", "74.02", "75.98"] },
  },
  {
    name: "99% CI: mean=250, s=10, n=50 → (246.36, 253.64)",
    actions: [
      { kind: "click", label: "Summary Statistics" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "250" },
      { kind: "fill", label: "Sample Std Dev (s)", value: "10" },
      { kind: "fill", label: "Sample Size (n)", value: "50" },
      { kind: "click", label: "99%" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["99% Confidence Interval", "246", "253"] },
  },
  {
    name: "90% CI raw data: 22,25,21,24,23,26,20",
    actions: [
      { kind: "click", label: "Raw Data" },
      { kind: "fill", label: "Raw Data (comma-separated)", value: "22, 25, 21, 24, 23, 26, 20" },
      { kind: "click", label: "90%" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["90% Confidence Interval"] },
  },
];
