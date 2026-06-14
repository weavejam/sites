import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "p=0.6, n=100 → mean=0.6, SE≈0.0490, normality passed",
    actions: [
      { kind: "fill", label: "Population Proportion (p)", value: "0.6" },
      { kind: "fill", label: "Sample Size (n)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.6000", "Passed"] },
  },
  {
    name: "p=0.4, n=200, p̂=0.45 → Z-score and probabilities",
    actions: [
      { kind: "fill", label: "Population Proportion (p)", value: "0.4" },
      { kind: "fill", label: "Sample Size (n)", value: "200" },
      { kind: "fill", label: "Sample Proportion (p̂) — optional", value: "0.45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.4000"] },
  },
];
