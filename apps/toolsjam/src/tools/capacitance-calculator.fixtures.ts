import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Parallel plate capacitor: A=0.01 m², d=0.001 m, εr=1, V=12",
    actions: [
      { kind: "click", label: "Parallel Plate" },
      { kind: "fill", label: "Plate Area (m²)", value: "0.01" },
      { kind: "fill", label: "Plate Separation (m)", value: "0.001" },
      { kind: "fill", label: "Dielectric Constant (εr)", value: "1.0" },
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "8.8542"] },
  },
  {
    name: "Parallel combination: C1=1e-6, C2=2e-6, C3=3e-6 → 6e-6",
    actions: [
      { kind: "click", label: "Parallel Combination" },
      { kind: "fill", label: "C1 (F)", value: "0.000001" },
      { kind: "fill", label: "C2 (F)", value: "0.000002" },
      { kind: "fill", label: "C3 (F)", value: "0.000003" },
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "6.0000e-6"] },
  },
  {
    name: "Series combination: C1=1e-6, C2=2e-6 → 0.667e-6",
    actions: [
      { kind: "click", label: "Series Combination" },
      { kind: "fill", label: "C1 (F)", value: "0.000001" },
      { kind: "fill", label: "C2 (F)", value: "0.000002" },
      { kind: "fill", label: "Voltage (V)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results"] },
  },
];
