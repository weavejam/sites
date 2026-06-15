import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "230V/50Hz, C=1μF, Rload=1kΩ, Vzener=5V",
    actions: [
      { kind: "fill", label: "AC Input Voltage (VAC)", value: "230" },
      { kind: "fill", label: "AC Frequency (Hz)", value: "50" },
      { kind: "fill", label: "Capacitor Value (μF)", value: "1" },
      { kind: "fill", label: "Load Resistance (Ω)", value: "1000" },
      { kind: "fill", label: "Zener Diode Voltage (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "3183"] },
  },
  {
    name: "120V/60Hz, C=2.2μF, Rload=470Ω, Vzener=12V",
    actions: [
      { kind: "fill", label: "AC Input Voltage (VAC)", value: "120" },
      { kind: "fill", label: "AC Frequency (Hz)", value: "60" },
      { kind: "fill", label: "Capacitor Value (μF)", value: "2.2" },
      { kind: "fill", label: "Load Resistance (Ω)", value: "470" },
      { kind: "fill", label: "Zener Diode Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "12"] },
  },
];
