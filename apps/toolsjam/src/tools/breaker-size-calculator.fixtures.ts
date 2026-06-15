import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single phase non-continuous 120V 1800W PF=0.95 25°C → 20A breaker",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "120" },
      { kind: "fill", label: "Power (W)", value: "1800" },
      { kind: "fill", label: "Power Factor", value: "0.95" },
      { kind: "fill", label: "Ambient Temperature (°C)", value: "25" },
      { kind: "click", label: "Non-Continuous" },
      { kind: "click", label: "Single Phase" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "20"] },
  },
  {
    name: "Single phase continuous 240V 3000W PF=1.0 30°C → 20A breaker",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "240" },
      { kind: "fill", label: "Power (W)", value: "3000" },
      { kind: "fill", label: "Power Factor", value: "1.0" },
      { kind: "fill", label: "Ambient Temperature (°C)", value: "30" },
      { kind: "click", label: "Continuous" },
      { kind: "click", label: "Single Phase" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "20"] },
  },
  {
    name: "Three phase continuous 480V 15000W PF=0.85 35°C → 30A breaker",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "480" },
      { kind: "fill", label: "Power (W)", value: "15000" },
      { kind: "fill", label: "Power Factor", value: "0.85" },
      { kind: "fill", label: "Ambient Temperature (°C)", value: "35" },
      { kind: "click", label: "Continuous" },
      { kind: "click", label: "Three Phase" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "30"] },
  },
];
