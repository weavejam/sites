import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Classic 0.8c: rivet contracts to fit",
    actions: [
      { kind: "fill", label: "Rivet Length (m)", value: "0.1" },
      { kind: "fill", label: "Hole Length (m)", value: "0.08" },
      { kind: "fill", label: "Velocity (fraction of c)", value: "0.8" },
      { kind: "fill", label: "Rivet Diameter (m)", value: "0.01" },
      { kind: "fill", label: "Material Density (kg/m³)", value: "7850" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relativistic Effects", "Lorentz Factor"] },
  },
  {
    name: "Extreme 0.95c: γ≈3.2",
    actions: [
      { kind: "fill", label: "Rivet Length (m)", value: "0.15" },
      { kind: "fill", label: "Hole Length (m)", value: "0.1" },
      { kind: "fill", label: "Velocity (fraction of c)", value: "0.95" },
      { kind: "fill", label: "Rivet Diameter (m)", value: "0.015" },
      { kind: "fill", label: "Material Density (kg/m³)", value: "2700" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relativistic Effects", "Lorentz Factor"] },
  },
];
