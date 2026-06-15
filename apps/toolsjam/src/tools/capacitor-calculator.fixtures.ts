import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Q=CV mode: C=100μF=0.0001F, V=12V → Q=0.0012C",
    actions: [
      { kind: "click", label: "Charge / Voltage (Q = CV)" },
      { kind: "fill", label: "Capacitance (F)", value: "0.0001" },
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.0012"] },
  },
  {
    name: "Q=CV mode: Q=50μC=0.00005C, V=5V → C=0.00001F",
    actions: [
      { kind: "click", label: "Charge / Voltage (Q = CV)" },
      { kind: "fill", label: "Voltage (V)", value: "5" },
      { kind: "fill", label: "Charge (C)", value: "0.00005" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "1.0000e-5"] },
  },
];
