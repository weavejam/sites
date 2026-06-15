import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C=1000μF=0.001F, V=400V → E=80J",
    actions: [
      { kind: "fill", label: "Capacitance (F)", value: "0.001" },
      { kind: "fill", label: "Voltage (V)", value: "400" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "80"] },
  },
  {
    name: "C=100μF=0.0001F, V=12V → E=7.2mJ",
    actions: [
      { kind: "fill", label: "Capacitance (F)", value: "0.0001" },
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.0072"] },
  },
];
