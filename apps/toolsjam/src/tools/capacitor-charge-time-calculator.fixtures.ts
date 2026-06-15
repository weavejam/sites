import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C=1mF, R=10kΩ, Vs=12V, Vc=7.56V → t≈10s",
    actions: [
      { kind: "fill", label: "Capacitance (F)", value: "0.001" },
      { kind: "fill", label: "Resistance (Ω)", value: "10000" },
      { kind: "fill", label: "Supply Voltage (V)", value: "12" },
      { kind: "fill", label: "Target Voltage (V)", value: "7.56" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "10"] },
  },
  {
    name: "C=100μF, R=47kΩ, Vs=5V, Vc=4.75V → t≈14.1s",
    actions: [
      { kind: "fill", label: "Capacitance (F)", value: "0.0001" },
      { kind: "fill", label: "Resistance (Ω)", value: "47000" },
      { kind: "fill", label: "Supply Voltage (V)", value: "5" },
      { kind: "fill", label: "Target Voltage (V)", value: "4.75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "τ"] },
  },
];
