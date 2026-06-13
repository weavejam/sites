import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Bearing failure analysis k=2.1, λ=8500, x=7000",
    actions: [
      { kind: "fill", label: "Shape (k)", value: "2.1" },
      { kind: "fill", label: "Scale (λ)", value: "8500" },
      { kind: "fill", label: "Value (x)", value: "7000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "PDF", "CDF"] },
  },
  {
    name: "Wind speed k=1.8, λ=12, x=15",
    actions: [
      { kind: "fill", label: "Shape (k)", value: "1.8" },
      { kind: "fill", label: "Scale (λ)", value: "12" },
      { kind: "fill", label: "Value (x)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "CDF", "Mean"] },
  },
];
