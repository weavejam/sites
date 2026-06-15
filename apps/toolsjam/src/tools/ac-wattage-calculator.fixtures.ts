import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Resistive load: V=120V, I=5A, PF=1.0 → P=600W",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "120" },
      { kind: "fill", label: "Current (A)", value: "5" },
      { kind: "fill", label: "Power Factor (cos φ)", value: "1.0" },
      { kind: "click", label: "Calculate Power" },
    ],
    expect: { text: ["Results", "Real Power (P)", "600"] },
  },
  {
    name: "Inductive motor: V=220V, I=10A, PF=0.85 → P=1870W",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "220" },
      { kind: "fill", label: "Current (A)", value: "10" },
      { kind: "fill", label: "Power Factor (cos φ)", value: "0.85" },
      { kind: "click", label: "Calculate Power" },
    ],
    expect: { text: ["Results", "Apparent Power (S)", "2,200"] },
  },
];
