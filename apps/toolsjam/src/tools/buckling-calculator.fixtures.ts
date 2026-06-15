import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel fixed-pinned: safe with SF≈38",
    actions: [
      { kind: "fill", label: "Applied Load (N)", value: "75000" },
      { kind: "fill", label: "Length (m)", value: "4.5" },
      { kind: "fill", label: "Modulus of Elasticity (GPa)", value: "200" },
      { kind: "fill", label: "Moment of Inertia (m⁴)", value: "0.00015" },
      { kind: "fill", label: "Effective Length Factor (K)", value: "0.7" },
      { kind: "fill", label: "Cross-Sectional Area (m²)", value: "0.012" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Buckling Analysis Results", "SAFE"] },
  },
  {
    name: "Aluminum pinned-pinned: safe",
    actions: [
      { kind: "fill", label: "Applied Load (N)", value: "25000" },
      { kind: "fill", label: "Length (m)", value: "2.8" },
      { kind: "fill", label: "Modulus of Elasticity (GPa)", value: "70" },
      { kind: "fill", label: "Moment of Inertia (m⁴)", value: "0.00008" },
      { kind: "fill", label: "Effective Length Factor (K)", value: "1.0" },
      { kind: "fill", label: "Cross-Sectional Area (m²)", value: "0.008" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Buckling Analysis Results", "SAFE"] },
  },
];
