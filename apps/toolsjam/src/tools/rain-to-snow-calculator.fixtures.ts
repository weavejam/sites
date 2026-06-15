import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cold winter: -10 °C, 20 mm, 70 % RH → moderate snow",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "-10" },
      { kind: "fill", label: "Precipitation (mm)", value: "20" },
      { kind: "fill", label: "Relative Humidity (%)", value: "70" },
      { kind: "fill", label: "Elevation (m)", value: "500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "cm"] },
  },
  {
    name: "Wet snow: -2 °C, 15 mm, 90 % RH → wet snow type",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "-2" },
      { kind: "fill", label: "Precipitation (mm)", value: "15" },
      { kind: "fill", label: "Relative Humidity (%)", value: "90" },
      { kind: "fill", label: "Elevation (m)", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Wet, Heavy Snow"] },
  },
  {
    name: "Mountain: -15 °C, 30 mm → powder snow type",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "-15" },
      { kind: "fill", label: "Precipitation (mm)", value: "30" },
      { kind: "fill", label: "Relative Humidity (%)", value: "60" },
      { kind: "fill", label: "Elevation (m)", value: "2500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Powder Snow"] },
  },
];
