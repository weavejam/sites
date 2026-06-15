import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1000 m altitude, 15°C, 1013.25 hPa → ~899 hPa",
    actions: [
      { kind: "fill", label: "Altitude", value: "1000" },
      { kind: "fill", label: "Surface Temperature", value: "15" },
      { kind: "fill", label: "Surface Pressure", value: "1013.25" },
      { kind: "fill", label: "Relative Humidity (%)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "899"] },
  },
  {
    name: "Sea level (0 m) → same pressure as surface",
    actions: [
      { kind: "fill", label: "Altitude", value: "0" },
      { kind: "fill", label: "Surface Temperature", value: "15" },
      { kind: "fill", label: "Surface Pressure", value: "1013.25" },
      { kind: "fill", label: "Relative Humidity (%)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "1013"] },
  },
  {
    name: "5000 m altitude, 15°C, 1013.25 hPa → ~540 hPa",
    actions: [
      { kind: "fill", label: "Altitude", value: "5000" },
      { kind: "fill", label: "Surface Temperature", value: "15" },
      { kind: "fill", label: "Surface Pressure", value: "1013.25" },
      { kind: "fill", label: "Relative Humidity (%)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Air Density"] },
  },
];
