import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Comfortable indoor: T=22°C RH=45% → Td≈9.5°C",
    actions: [
      { kind: "fill", label: "Air Temperature (°C)", value: "22" },
      { kind: "fill", label: "Relative Humidity (%)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Dew Point Results", "Dew Point", "°C"] },
  },
  {
    name: "Humid summer: T=30°C RH=75% → Td≈25.1°C",
    actions: [
      { kind: "fill", label: "Air Temperature (°C)", value: "30" },
      { kind: "fill", label: "Relative Humidity (%)", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Dew Point Results", "Absolute Humidity", "g/m³"] },
  },
  {
    name: "Near saturation: T=18°C RH=95% → Td≈17.2°C",
    actions: [
      { kind: "fill", label: "Air Temperature (°C)", value: "18" },
      { kind: "fill", label: "Relative Humidity (%)", value: "95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Dew Point Results", "hPa"] },
  },
];
