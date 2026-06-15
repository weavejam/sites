import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Helsinki-like cold December: high probability",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "-5" },
      { kind: "fill", label: "Humidity (%)", value: "80" },
      { kind: "fill", label: "Altitude (m)", value: "26" },
      { kind: "fill", label: "Latitude (degrees)", value: "60" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["White Christmas Probability", "%"] },
  },
  {
    name: "London-like mild December: low probability",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "4" },
      { kind: "fill", label: "Humidity (%)", value: "85" },
      { kind: "fill", label: "Altitude (m)", value: "10" },
      { kind: "fill", label: "Latitude (degrees)", value: "51" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["White Christmas Probability", "%"] },
  },
  {
    name: "Mountain station: high altitude boosts probability",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "-2" },
      { kind: "fill", label: "Humidity (%)", value: "70" },
      { kind: "fill", label: "Altitude (m)", value: "1500" },
      { kind: "fill", label: "Latitude (degrees)", value: "47" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["White Christmas Probability", "%"] },
  },
];
