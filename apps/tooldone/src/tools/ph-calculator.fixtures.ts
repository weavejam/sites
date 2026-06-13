import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Strong acid HCl 0.01 mol/L → pH 2.00",
    actions: [
      { kind: "click", label: "Strong Acid" },
      { kind: "fill", label: "Concentration (mol/L)", value: "0.01" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "pH", "2.00"] },
  },
  {
    name: "Buffer 0.1/0.1 pKa 4.76 → pH 4.76",
    actions: [
      { kind: "click", label: "Buffer Solution" },
      { kind: "fill", label: "pKa", value: "4.76" },
      { kind: "fill", label: "Acid (HA) Conc. (mol/L)", value: "0.1" },
      { kind: "fill", label: "Base (A−) Conc. (mol/L)", value: "0.1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "4.76" },
  },
];
