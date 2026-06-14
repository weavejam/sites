import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "95% CL, 5% MoE, p=0.5, infinite pop → n=385",
    actions: [
      { kind: "fill", label: "Margin of Error (%)", value: "5" },
      { kind: "fill", label: "Population Proportion (0–1)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Recommended Sample Size", "385"] },
  },
  {
    name: "95% CL, 3% MoE, p=0.5, pop=1000 → finite correction",
    actions: [
      { kind: "fill", label: "Margin of Error (%)", value: "3" },
      { kind: "fill", label: "Population Proportion (0–1)", value: "0.5" },
      { kind: "fill", label: "Population Size (optional)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Recommended Sample Size"] },
  },
];
