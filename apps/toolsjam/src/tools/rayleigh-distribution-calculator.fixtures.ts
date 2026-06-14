import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "σ=1 x=1 → PDF≈0.606531",
    actions: [
      { kind: "fill", label: "Scale Parameter (σ)", value: "1" },
      { kind: "fill", label: "Value (x)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "PDF f(x)", "0.606531"] },
  },
  {
    name: "σ=10 x=12 → CDF≈0.513",
    actions: [
      { kind: "fill", label: "Scale Parameter (σ)", value: "10" },
      { kind: "fill", label: "Value (x)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "CDF F(x)"] },
  },
  {
    name: "σ=5 x=0 → PDF=0",
    actions: [
      { kind: "fill", label: "Scale Parameter (σ)", value: "5" },
      { kind: "fill", label: "Value (x)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "PDF f(x)"] },
  },
];
