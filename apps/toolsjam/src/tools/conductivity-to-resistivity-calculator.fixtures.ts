import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Copper: σ = 5.8e7 S/m → ρ ≈ 1.72e-8 Ω·m",
    actions: [
      { kind: "fill", label: "Conductivity (S/m)", value: "5.8e7" },
      { kind: "fill", label: "Temperature (°C, optional)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Resistivity"] },
  },
  {
    name: "Silicon: σ = 4.35e-4 S/m → ρ ≈ 2300 Ω·m",
    actions: [
      { kind: "fill", label: "Conductivity (S/m)", value: "4.35e-4" },
      { kind: "fill", label: "Material Type (optional)", value: "Silicon" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Resistivity", "Silicon"] },
  },
  {
    name: "Silver: σ = 6.3e7 S/m → ρ ≈ 1.59e-8 Ω·m",
    actions: [
      { kind: "fill", label: "Conductivity (S/m)", value: "6.3e7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Resistivity", "conductor"] },
  },
];
