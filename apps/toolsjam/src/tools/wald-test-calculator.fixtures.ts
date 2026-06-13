import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic significance test: z=2.27, reject H0",
    actions: [
      { kind: "fill", label: "Parameter Estimate (β̂)", value: "2.5" },
      { kind: "fill", label: "Hypothesized Value (β₀)", value: "0" },
      { kind: "fill", label: "Standard Error (SE)", value: "1.1" },
      { kind: "fill", label: "Significance Level (α)", value: "0.05" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Wald Statistic"] },
  },
  {
    name: "Education on wages: z=4, reject H0",
    actions: [
      { kind: "fill", label: "Parameter Estimate (β̂)", value: "0.08" },
      { kind: "fill", label: "Hypothesized Value (β₀)", value: "0" },
      { kind: "fill", label: "Standard Error (SE)", value: "0.02" },
      { kind: "fill", label: "Significance Level (α)", value: "0.05" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "p-Value"] },
  },
];
