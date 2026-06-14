import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Aluminum 27g / 10cm³ at 20°C → SG ≈ 2.70",
    actions: [
      { kind: "fill", label: "Substance Mass (g)", value: "27.0" },
      { kind: "fill", label: "Substance Volume (cm³)", value: "10.0" },
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Specific Gravity"] },
  },
  {
    name: "Ethanol 15.6g / 20cm³ at 25°C → SG < 1 (floats)",
    actions: [
      { kind: "fill", label: "Substance Mass (g)", value: "15.6" },
      { kind: "fill", label: "Substance Volume (cm³)", value: "20.0" },
      { kind: "fill", label: "Temperature (°C)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "floats"] },
  },
  {
    name: "Copper direct density 8.96 g/cm³ → SG ≈ 8.97 (sinks)",
    actions: [
      { kind: "fill", label: "Substance Density (g/cm³)", value: "8.96" },
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "sinks"] },
  },
];
