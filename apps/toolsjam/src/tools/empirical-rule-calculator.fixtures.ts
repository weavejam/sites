import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "IQ scores μ=100 σ=15 → 68% range 85-115",
    actions: [
      { kind: "fill", label: "Mean (μ)", value: "100" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["68.27%", "85.0000", "115.0000"],
    },
  },
  {
    name: "Adult height μ=175 σ=7 → 68% range 168-182",
    actions: [
      { kind: "fill", label: "Mean (μ)", value: "175" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["68.27%", "168.0000", "182.0000", "95.45%"],
    },
  },
  {
    name: "Exam scores μ=78 σ=6 → 3σ range 60-96",
    actions: [
      { kind: "fill", label: "Mean (μ)", value: "78" },
      { kind: "fill", label: "Standard Deviation (σ)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["99.73%", "60.0000", "96.0000"],
    },
  },
];
