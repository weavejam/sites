import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Water direct PV: K≈2 GPa",
    actions: [
      { kind: "click", label: "Pressure-Volume" },
      { kind: "fill", label: "Initial Volume (m³)", value: "0.001" },
      { kind: "fill", label: "Final Volume (m³)", value: "0.000995" },
      { kind: "fill", label: "Initial Pressure (Pa)", value: "101325" },
      { kind: "fill", label: "Final Pressure (Pa)", value: "10100000" },
      { kind: "click", label: "Calculate Bulk Modulus" },
    ],
    expect: { text: ["Bulk Modulus Results", "GPa"] },
  },
  {
    name: "Steel Young+Poisson: K≈167 GPa",
    actions: [
      { kind: "click", label: "Young's Modulus & Poisson's Ratio" },
      { kind: "fill", label: "Young's Modulus (Pa)", value: "200000000000" },
      { kind: "fill", label: "Poisson's Ratio (ν)", value: "0.3" },
      { kind: "click", label: "Calculate Bulk Modulus" },
    ],
    expect: { text: ["Bulk Modulus Results", "GPa"] },
  },
];
