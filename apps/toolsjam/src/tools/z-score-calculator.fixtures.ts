import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Student exam: X=90, μ=75, σ=10 → Z=1.5",
    actions: [
      { kind: "fill", label: "Raw Data Score (X)", value: "90" },
      { kind: "fill", label: "Mean (μ)", value: "75" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "10" },
      { kind: "click", label: "Calculate Z-Score" },
    ],
    expect: {
      text: ["Z = 1.5", "above the mean"],
    },
  },
  {
    name: "Blood pressure: X=140, μ=120, σ=8 → Z=2.5",
    actions: [
      { kind: "fill", label: "Raw Data Score (X)", value: "140" },
      { kind: "fill", label: "Mean (μ)", value: "120" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "8" },
      { kind: "click", label: "Calculate Z-Score" },
    ],
    expect: {
      text: ["Z = 2.5", "above the mean"],
    },
  },
  {
    name: "Below mean: X=60, μ=75, σ=10 → Z=-1.5",
    actions: [
      { kind: "fill", label: "Raw Data Score (X)", value: "60" },
      { kind: "fill", label: "Mean (μ)", value: "75" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "10" },
      { kind: "click", label: "Calculate Z-Score" },
    ],
    expect: {
      text: ["Z = -1.5", "below the mean"],
    },
  },
];
