import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Water to Air reflection: Z1=1480000, Z2=420 → ~100% reflection",
    actions: [
      { kind: "click", label: "Reflection & Transmission" },
      { kind: "fill", label: "Density of Medium 1 (ρ₁)", value: "1000" },
      { kind: "fill", label: "Sound Speed in Medium 1 (c₁)", value: "1480" },
      { kind: "fill", label: "Density of Medium 2 (ρ₂)", value: "1.225" },
      { kind: "fill", label: "Sound Speed in Medium 2 (c₂)", value: "343" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Reflection Coefficient", "Acoustic Impedance Z₁"] },
  },
  {
    name: "Single medium Aluminium: ρ=2700, c=6420 → Z=17334000 Rayl",
    actions: [
      { kind: "click", label: "Acoustic Impedance Only" },
      { kind: "fill", label: "Density of Medium 1 (ρ₁)", value: "2700" },
      { kind: "fill", label: "Sound Speed in Medium 1 (c₁)", value: "6420" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Acoustic Impedance Z"] },
  },
];
