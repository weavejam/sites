import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve for final pressure: P1=1 V1=2 V2=1 → P2=2",
    actions: [
      { kind: "click", label: "Final Pressure (P₂)" },
      { kind: "fill", label: "Initial Pressure (P₁) (atm)", value: "1.0" },
      { kind: "fill", label: "Initial Volume (V₁) (L)", value: "2.0" },
      { kind: "fill", label: "Final Volume (V₂) (L)", value: "1.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2.0000"] },
  },
  {
    name: "Solve for final volume: P1=2 V1=1.5 P2=4 → V2=0.75",
    actions: [
      { kind: "click", label: "Final Volume (V₂)" },
      { kind: "fill", label: "Initial Pressure (P₁) (atm)", value: "2.0" },
      { kind: "fill", label: "Initial Volume (V₁) (L)", value: "1.5" },
      { kind: "fill", label: "Final Pressure (P₂) (atm)", value: "4.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.7500"] },
  },
];
