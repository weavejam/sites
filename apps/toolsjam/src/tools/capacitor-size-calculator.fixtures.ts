import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic air capacitor: 1μF at 12V → plate area ≈ 0.452 m²",
    actions: [
      { kind: "fill", label: "Required Capacitance (F)", value: "0.000001" },
      { kind: "fill", label: "Operating Voltage (V)", value: "12" },
      { kind: "fill", label: "Dielectric Constant (εᵣ)", value: "1" },
      { kind: "fill", label: "Dielectric Strength (V/m)", value: "3000000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Energy Stored"] },
  },
  {
    name: "High-voltage ceramic capacitor: 10μF at 1000V",
    actions: [
      { kind: "fill", label: "Required Capacitance (F)", value: "0.00001" },
      { kind: "fill", label: "Operating Voltage (V)", value: "1000" },
      { kind: "fill", label: "Dielectric Constant (εᵣ)", value: "8" },
      { kind: "fill", label: "Dielectric Strength (V/m)", value: "8000000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Power Density"] },
  },
  {
    name: "Energy storage polymer capacitor: 100mF at 50V",
    actions: [
      { kind: "fill", label: "Required Capacitance (F)", value: "0.1" },
      { kind: "fill", label: "Operating Voltage (V)", value: "50" },
      { kind: "fill", label: "Dielectric Constant (εᵣ)", value: "2.2" },
      { kind: "fill", label: "Dielectric Strength (V/m)", value: "5000000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Plate Area"] },
  },
];
