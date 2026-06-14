import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Heating water 1kg from 25°C to 100°C → Q ≈ 313,950 J",
    actions: [
      { kind: "click", label: "Heat Energy (Q)" },
      { kind: "fill", label: "Mass (kg)", value: "1.0" },
      { kind: "fill", label: "Specific Heat Capacity (J/kg·K)", value: "4186" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "25" },
      { kind: "fill", label: "Final Temperature (°C)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "313"] },
  },
  {
    name: "Heating aluminum 5kg from 20°C to 150°C → Q = 585,000 J",
    actions: [
      { kind: "click", label: "Heat Energy (Q)" },
      { kind: "fill", label: "Mass (kg)", value: "5.0" },
      { kind: "fill", label: "Specific Heat Capacity (J/kg·K)", value: "900" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "20" },
      { kind: "fill", label: "Final Temperature (°C)", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "585"] },
  },
  {
    name: "Solve for specific heat: Q=13475, m=0.5, ΔT=70 → c=385 J/(kg·K)",
    actions: [
      { kind: "click", label: "Specific Heat (c)" },
      { kind: "fill", label: "Heat Energy Q (J)", value: "13475" },
      { kind: "fill", label: "Mass (kg)", value: "0.5" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "15" },
      { kind: "fill", label: "Final Temperature (°C)", value: "85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "385"] },
  },
];
