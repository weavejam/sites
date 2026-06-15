import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Battery boost 3.7V to 5V",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin) (V)", value: "3.7" },
      { kind: "fill", label: "Output Voltage (Vout) (V)", value: "5" },
      { kind: "fill", label: "Switching Frequency (f) (Hz)", value: "500000" },
      { kind: "fill", label: "Inductor Value (L) (H)", value: "0.000047" },
      { kind: "fill", label: "Load Current (Iout) (A)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Duty Cycle"] },
  },
  {
    name: "Automotive 12V to 24V",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin) (V)", value: "12" },
      { kind: "fill", label: "Output Voltage (Vout) (V)", value: "24" },
      { kind: "fill", label: "Switching Frequency (f) (Hz)", value: "100000" },
      { kind: "fill", label: "Inductor Value (L) (H)", value: "0.0001" },
      { kind: "fill", label: "Load Current (Iout) (A)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "50.00 %"] },
  },
];
