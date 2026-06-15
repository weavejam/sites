import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard atmosphere: T=15°C, P=1013.25 hPa, RH=60%, alt=0 → ρ≈1.2248 kg/m³",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "15" },
      { kind: "fill", label: "Atmospheric Pressure (hPa)", value: "1013.25" },
      { kind: "fill", label: "Relative Humidity (%)", value: "60" },
      { kind: "fill", label: "Altitude (m)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Air Density (ρ)", "1.22"] },
  },
  {
    name: "Hot humid day: T=35°C, P=1005 hPa, RH=80% → lower density",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "35" },
      { kind: "fill", label: "Atmospheric Pressure (hPa)", value: "1005" },
      { kind: "fill", label: "Relative Humidity (%)", value: "80" },
      { kind: "fill", label: "Altitude (m)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Air Density (ρ)"] },
  },
];
