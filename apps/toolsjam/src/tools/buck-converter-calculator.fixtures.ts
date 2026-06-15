import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "24V→12V 100kHz: D=50%",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin)", value: "24" },
      { kind: "fill", label: "Output Voltage (Vout)", value: "12" },
      { kind: "fill", label: "Switching Frequency (Hz)", value: "100000" },
      { kind: "fill", label: "Inductor Value (H)", value: "0.0001" },
      { kind: "fill", label: "Load Current (A)", value: "2" },
      { kind: "fill", label: "Output Capacitor ESR (Ω)", value: "0.01" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Buck Converter Results", "50%"] },
  },
  {
    name: "48V→5V 500kHz: D≈10.4%",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin)", value: "48" },
      { kind: "fill", label: "Output Voltage (Vout)", value: "5" },
      { kind: "fill", label: "Switching Frequency (Hz)", value: "500000" },
      { kind: "fill", label: "Inductor Value (H)", value: "0.000047" },
      { kind: "fill", label: "Load Current (A)", value: "1" },
      { kind: "fill", label: "Output Capacitor ESR (Ω)", value: "0.005" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Buck Converter Results", "Duty Cycle"] },
  },
];
