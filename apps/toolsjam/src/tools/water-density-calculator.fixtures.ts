import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Measured + theoretical: 100g/100mL, T=20°C, S=0%, P=1 atm",
    actions: [
      { kind: "fill", label: "Mass (g)", value: "100" },
      { kind: "fill", label: "Volume (mL)", value: "100" },
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "fill", label: "Salinity (%)", value: "0" },
      { kind: "fill", label: "Pressure (atm)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Water Density Results", "Measured Density"] },
  },
  {
    name: "Theoretical only: seawater T=25°C, S=3.5%, P=1 atm",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "25" },
      { kind: "fill", label: "Salinity (%)", value: "3.5" },
      { kind: "fill", label: "Pressure (atm)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Water Density Results", "Theoretical Density"] },
  },
];

