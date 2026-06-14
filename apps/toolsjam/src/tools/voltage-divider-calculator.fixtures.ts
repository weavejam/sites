import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Equal resistors halve voltage: 10V, 1kΩ, 1kΩ → 5V",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin)", value: "10" },
      { kind: "fill", label: "R1 Resistance (Ω)", value: "1000" },
      { kind: "fill", label: "R2 Resistance (Ω)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "Sensor interface 5V, 2.2kΩ, 3.3kΩ → 3V",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin)", value: "5" },
      { kind: "fill", label: "R1 Resistance (Ω)", value: "2200" },
      { kind: "fill", label: "R2 Resistance (Ω)", value: "3300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3"] },
  },
  {
    name: "12V, 10kΩ, 5kΩ → 4V",
    actions: [
      { kind: "fill", label: "Input Voltage (Vin)", value: "12" },
      { kind: "fill", label: "R1 Resistance (Ω)", value: "10000" },
      { kind: "fill", label: "R2 Resistance (Ω)", value: "5000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4"] },
  },
];
