import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sandstone reservoir flow",
    actions: [
      { kind: "fill", label: "Permeability, k (m²)", value: "1e-12" },
      { kind: "fill", label: "Cross-Sectional Area, A (m²)", value: "0.01" },
      { kind: "fill", label: "Pressure Difference, ΔP (Pa)", value: "1000000" },
      { kind: "fill", label: "Fluid Viscosity, μ (Pa·s)", value: "0.001" },
      { kind: "fill", label: "Flow Length, L (m)", value: "0.1" },
      { kind: "fill", label: "Porosity, φ (dimensionless)", value: "0.25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Volumetric Flow Rate", "Darcy Velocity"] },
  },
  {
    name: "Sandy soil groundwater",
    actions: [
      { kind: "fill", label: "Permeability, k (m²)", value: "1e-10" },
      { kind: "fill", label: "Cross-Sectional Area, A (m²)", value: "0.1" },
      { kind: "fill", label: "Pressure Difference, ΔP (Pa)", value: "1000" },
      { kind: "fill", label: "Fluid Viscosity, μ (Pa·s)", value: "0.001" },
      { kind: "fill", label: "Flow Length, L (m)", value: "1.0" },
      { kind: "fill", label: "Porosity, φ (dimensionless)", value: "0.35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Seepage Velocity"] },
  },
];
