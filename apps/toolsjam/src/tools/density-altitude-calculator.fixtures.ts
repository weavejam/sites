import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard sea level: PA=0 OAT=15°C RH=0% → DA≈0 ft",
    actions: [
      { kind: "fill", label: "Pressure Altitude (ft)", value: "0" },
      { kind: "fill", label: "Outside Air Temperature (°C)", value: "15" },
      { kind: "fill", label: "Relative Humidity (%)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Density Altitude Results", "ft"] },
  },
  {
    name: "High altitude hot: PA=8000 OAT=30°C RH=40% → high DA",
    actions: [
      { kind: "fill", label: "Pressure Altitude (ft)", value: "8000" },
      { kind: "fill", label: "Outside Air Temperature (°C)", value: "30" },
      { kind: "fill", label: "Relative Humidity (%)", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Density Altitude Results", "kg/m³"] },
  },
  {
    name: "Cold dry: PA=3000 OAT=-10°C RH=20% → DA well below PA",
    actions: [
      { kind: "fill", label: "Pressure Altitude (ft)", value: "3000" },
      { kind: "fill", label: "Outside Air Temperature (°C)", value: "-10" },
      { kind: "fill", label: "Relative Humidity (%)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Density Altitude Results", "Air Density"] },
  },
];
