import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Extreme: 35°C, 30min, full sun, dark car, no tint → extreme danger",
    actions: [
      { kind: "fill", label: "Outside Temperature", value: "35" },
      { kind: "fill", label: "Parking Time (minutes)", value: "30" },
      { kind: "click", label: "Calculate Temperature" },
    ],
    expect: { text: ["Hot Car Temperature Estimate", "°C"] },
  },
  {
    name: "Mild: 25°C, 20min, partial sun, dark car → danger zone",
    actions: [
      { kind: "fill", label: "Outside Temperature", value: "25" },
      { kind: "fill", label: "Parking Time (minutes)", value: "20" },
      { kind: "click", label: "Calculate Temperature" },
    ],
    expect: { text: ["Hot Car Temperature Estimate", "°C"] },
  },
];
