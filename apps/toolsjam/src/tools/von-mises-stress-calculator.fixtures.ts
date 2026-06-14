import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Uniaxial tension: σx=150, yield=300 → σ_vm=150 MPa, FoS=2.0",
    actions: [
      { kind: "fill", label: "Normal Stress σx (MPa)", value: "150" },
      { kind: "fill", label: "Normal Stress σy (MPa)", value: "0" },
      { kind: "fill", label: "Normal Stress σz (MPa)", value: "0" },
      { kind: "fill", label: "Shear Stress τxy (MPa)", value: "0" },
      { kind: "fill", label: "Shear Stress τyz (MPa)", value: "0" },
      { kind: "fill", label: "Shear Stress τzx (MPa)", value: "0" },
      { kind: "fill", label: "Yield Strength (MPa)", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Von Mises Stress Results", "150"] },
  },
  {
    name: "Pure shear: τxy=60, yield=200 → σ_vm≈103.9, Safe",
    actions: [
      { kind: "fill", label: "Normal Stress σx (MPa)", value: "0" },
      { kind: "fill", label: "Normal Stress σy (MPa)", value: "0" },
      { kind: "fill", label: "Normal Stress σz (MPa)", value: "0" },
      { kind: "fill", label: "Shear Stress τxy (MPa)", value: "60" },
      { kind: "fill", label: "Shear Stress τyz (MPa)", value: "0" },
      { kind: "fill", label: "Shear Stress τzx (MPa)", value: "0" },
      { kind: "fill", label: "Yield Strength (MPa)", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Von Mises Stress Results", "Safe"] },
  },
];

