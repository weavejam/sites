import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Comfortable indoor air: T=22°C, RH=50%",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "22" },
      { kind: "fill", label: "Relative Humidity (%)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Absolute Humidity Results", "g/m³"] },
  },
  {
    name: "Humid summer day: T=30°C, RH=80%",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "30" },
      { kind: "fill", label: "Relative Humidity (%)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Absolute Humidity Results", "g/m³", "Dew Point"] },
  },
  {
    name: "Dry winter air: T=18°C, RH=25%",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "18" },
      { kind: "fill", label: "Relative Humidity (%)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Absolute Humidity Results", "Water Vapor Pressure"] },
  },
];
