import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Astable 1 Hz oscillator: R1=10k, R2=10k, C=47µF",
    actions: [
      { kind: "click", label: "Astable (Oscillator)" },
      { kind: "fill", label: "Resistor R1 (Ω)", value: "10000" },
      { kind: "fill", label: "Resistor R2 (Ω)", value: "10000" },
      { kind: "fill", label: "Capacitor C (μF)", value: "47" },
      { kind: "fill", label: "Supply Voltage Vcc (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["555 Timer Results", "Frequency", "Hz"] },
  },
  {
    name: "Monostable 1 second pulse: R1=100k, C=10µF",
    actions: [
      { kind: "click", label: "Monostable (One-shot)" },
      { kind: "fill", label: "Resistor R1 (Ω)", value: "100000" },
      { kind: "fill", label: "Capacitor C (μF)", value: "10" },
      { kind: "fill", label: "Supply Voltage Vcc (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["555 Timer Results", "Pulse Width"] },
  },
  {
    name: "Astable 10 kHz tone generator",
    actions: [
      { kind: "click", label: "Astable (Oscillator)" },
      { kind: "fill", label: "Resistor R1 (Ω)", value: "480" },
      { kind: "fill", label: "Resistor R2 (Ω)", value: "480" },
      { kind: "fill", label: "Capacitor C (μF)", value: "0.1" },
      { kind: "fill", label: "Supply Voltage Vcc (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["555 Timer Results", "Frequency"] },
  },
];
