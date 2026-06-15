import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Inverting: Rf=10000, Rin=1000 → gain -10",
    actions: [
      { kind: "click", label: "Inverting Amplifier" },
      { kind: "fill", label: "Feedback Resistance (Rf) (Ω)", value: "10000" },
      { kind: "fill", label: "Input Resistance (Rin) (Ω)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["-10"] },
  },
  {
    name: "Non-Inverting: Rf=10000, Rin=1000 → gain 11",
    actions: [
      { kind: "click", label: "Non-Inverting Amplifier" },
      { kind: "fill", label: "Feedback Resistance (Rf) (Ω)", value: "10000" },
      { kind: "fill", label: "Input Resistance (Rin) (Ω)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["11"] },
  },
  {
    name: "Inverting with Vin: Rf=10000, Rin=1000, Vin=0.5 → Vout -5",
    actions: [
      { kind: "click", label: "Inverting Amplifier" },
      { kind: "fill", label: "Feedback Resistance (Rf) (Ω)", value: "10000" },
      { kind: "fill", label: "Input Resistance (Rin) (Ω)", value: "1000" },
      { kind: "fill", label: "Input Voltage (Vin) (V)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["-5"] },
  },
];
