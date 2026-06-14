import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel beam: 20°C → 150°C, α=12e-6, E=200GPa, ν=0.3",
    actions: [
      { kind: "fill", label: "Initial Temperature (°C)", value: "20" },
      { kind: "fill", label: "Final Temperature (°C)", value: "150" },
      { kind: "fill", label: "Thermal Expansion Coefficient (1/°C)", value: "0.000012" },
      { kind: "fill", label: "Young's Modulus (GPa)", value: "200" },
      { kind: "fill", label: "Poisson's Ratio", value: "0.3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "312"] },
  },
  {
    name: "Aluminum plate cooling: 200°C → 0°C, α=23e-6, E=70GPa, ν=0.33",
    actions: [
      { kind: "fill", label: "Initial Temperature (°C)", value: "200" },
      { kind: "fill", label: "Final Temperature (°C)", value: "0" },
      { kind: "fill", label: "Thermal Expansion Coefficient (1/°C)", value: "0.000023" },
      { kind: "fill", label: "Young's Modulus (GPa)", value: "70" },
      { kind: "fill", label: "Poisson's Ratio", value: "0.33" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "MPa"] },
  },
];
