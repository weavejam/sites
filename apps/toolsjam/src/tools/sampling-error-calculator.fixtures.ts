import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Proportion: p=0.5, n=400, 95% CL → SE=0.025, MoE=±0.049",
    actions: [
      { kind: "click", label: "Proportion" },
      { kind: "fill", label: "Sample Proportion (p)", value: "0.5" },
      { kind: "fill", label: "Sample Size (n)", value: "400" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.0250"] },
  },
  {
    name: "Mean: mean=75, SD=10, n=100, 95% CL → SE=1.0, MoE=±1.96",
    actions: [
      { kind: "click", label: "Mean" },
      { kind: "fill", label: "Sample Mean (x̄)", value: "75" },
      { kind: "fill", label: "Sample Standard Deviation (s)", value: "10" },
      { kind: "fill", label: "Sample Size (n)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.0000"] },
  },
];
