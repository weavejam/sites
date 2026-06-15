import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Two equal 1μF capacitors at 10V → Ceq = 0.5μF",
    actions: [
      { kind: "fill", label: "Capacitor 1 (F)", value: "0.000001" },
      { kind: "fill", label: "Capacitor 2 (F)", value: "0.000001" },
      { kind: "fill", label: "Total Applied Voltage (V)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Equivalent Capacitance"] },
  },
  {
    name: "Three capacitors voltage divider: 1μF, 2μF, 3μF at 15V",
    actions: [
      { kind: "fill", label: "Capacitor 1 (F)", value: "0.000001" },
      { kind: "fill", label: "Capacitor 2 (F)", value: "0.000002" },
      { kind: "fill", label: "Capacitor 3 (F) — optional", value: "0.000003" },
      { kind: "fill", label: "Total Applied Voltage (V)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Voltage Distribution"] },
  },
  {
    name: "Four 1μF capacitors in series at 100V → Ceq = 0.25μF",
    actions: [
      { kind: "fill", label: "Capacitor 1 (F)", value: "0.000001" },
      { kind: "fill", label: "Capacitor 2 (F)", value: "0.000001" },
      { kind: "fill", label: "Capacitor 3 (F) — optional", value: "0.000001" },
      { kind: "fill", label: "Capacitor 4 (F) — optional", value: "0.000001" },
      { kind: "fill", label: "Total Applied Voltage (V)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Total Energy Stored"] },
  },
];
