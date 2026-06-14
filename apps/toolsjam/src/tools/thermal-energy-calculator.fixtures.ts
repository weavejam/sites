import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Boiling water: 1kg water, 25→100°C, latent heat included",
    actions: [
      { kind: "fill", label: "Mass (kg)", value: "1" },
      { kind: "fill", label: "Specific Heat Capacity (J/kg°C)", value: "4186" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "25" },
      { kind: "fill", label: "Final Temperature (°C)", value: "100" },
      { kind: "fill", label: "Latent Heat (J/kg) (optional)", value: "2260000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "313,950"] },
  },
  {
    name: "Heating aluminum: 2kg, 20→150°C",
    actions: [
      { kind: "fill", label: "Mass (kg)", value: "2" },
      { kind: "fill", label: "Specific Heat Capacity (J/kg°C)", value: "900" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "20" },
      { kind: "fill", label: "Final Temperature (°C)", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "234,000"] },
  },
];
