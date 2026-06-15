import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "12V RMS 100Ω 0.7V diode 50Hz 1000μF → DC ~15.6V",
    actions: [
      { kind: "fill", label: "AC Input Voltage (RMS)", value: "12" },
      { kind: "fill", label: "Load Resistance (Ω)", value: "100" },
      { kind: "fill", label: "Diode Voltage Drop (V)", value: "0.7" },
      { kind: "fill", label: "AC Frequency (Hz)", value: "50" },
      { kind: "fill", label: "Filter Capacitance (μF)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "DC Output Voltage"] },
  },
  {
    name: "5V RMS 50Ω 0.3V diode 60Hz 2200μF → DC ~6.5V",
    actions: [
      { kind: "fill", label: "AC Input Voltage (RMS)", value: "5" },
      { kind: "fill", label: "Load Resistance (Ω)", value: "50" },
      { kind: "fill", label: "Diode Voltage Drop (V)", value: "0.3" },
      { kind: "fill", label: "AC Frequency (Hz)", value: "60" },
      { kind: "fill", label: "Filter Capacitance (μF)", value: "2200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Ripple Factor"] },
  },
  {
    name: "24V RMS 200Ω 0.7V diode 50Hz 4700μF → DC ~32V",
    actions: [
      { kind: "fill", label: "AC Input Voltage (RMS)", value: "24" },
      { kind: "fill", label: "Load Resistance (Ω)", value: "200" },
      { kind: "fill", label: "Diode Voltage Drop (V)", value: "0.7" },
      { kind: "fill", label: "AC Frequency (Hz)", value: "50" },
      { kind: "fill", label: "Filter Capacitance (μF)", value: "4700" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Peak Inverse Voltage (PIV)"] },
  },
];
