import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "SE=500, Estimate=50000 → RSE=1.00% (high precision)",
    actions: [
      { kind: "fill", label: "Standard Error (SE)", value: "500" },
      { kind: "fill", label: "Estimate (Mean)", value: "50000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.00%"] },
  },
  {
    name: "SE=25, Estimate=100 → RSE=25.00% (acceptable precision)",
    actions: [
      { kind: "fill", label: "Standard Error (SE)", value: "25" },
      { kind: "fill", label: "Estimate (Mean)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25.00%"] },
  },
  {
    name: "SE=40, Estimate=80 → RSE=50.00% (unreliable)",
    actions: [
      { kind: "fill", label: "Standard Error (SE)", value: "40" },
      { kind: "fill", label: "Estimate (Mean)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "50.00%"] },
  },
];
