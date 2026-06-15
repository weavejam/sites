import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Concrete weir B=3 H=0.75 P=1.5 Cd=0.85 → Q≈3.37 m³/s",
    actions: [
      { kind: "fill", label: "Weir Width (m)", value: "3.0" },
      { kind: "fill", label: "Upstream Head (m)", value: "0.75" },
      { kind: "fill", label: "Weir Height (m)", value: "1.5" },
      { kind: "fill", label: "Manning Coefficient (n)", value: "0.013" },
      { kind: "fill", label: "Discharge Coefficient (Cd)", value: "0.85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "m³/s"] },
  },
  {
    name: "Small lab weir B=0.5 H=0.3 P=0.8 Cd=0.88 → Q≈0.18 m³/s",
    actions: [
      { kind: "fill", label: "Weir Width (m)", value: "0.5" },
      { kind: "fill", label: "Upstream Head (m)", value: "0.3" },
      { kind: "fill", label: "Weir Height (m)", value: "0.8" },
      { kind: "fill", label: "Manning Coefficient (n)", value: "0.010" },
      { kind: "fill", label: "Discharge Coefficient (Cd)", value: "0.88" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Critical Depth (yc)"] },
  },
  {
    name: "Large spillway B=20 H=2.5 P=5.0 Cd=0.87 → Q≈172 m³/s",
    actions: [
      { kind: "fill", label: "Weir Width (m)", value: "20.0" },
      { kind: "fill", label: "Upstream Head (m)", value: "2.5" },
      { kind: "fill", label: "Weir Height (m)", value: "5.0" },
      { kind: "fill", label: "Manning Coefficient (n)", value: "0.015" },
      { kind: "fill", label: "Discharge Coefficient (Cd)", value: "0.87" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Froude Number"] },
  },
];
