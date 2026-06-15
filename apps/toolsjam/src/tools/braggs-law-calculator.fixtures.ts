import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find Bragg angle: λ=0.154 d=0.203 n=1 → θ≈22.2°",
    actions: [
      { kind: "click", label: "Bragg Angle (θ)" },
      { kind: "fill", label: "Wavelength (λ) (nm)", value: "0.154" },
      { kind: "fill", label: "Crystal Plane Spacing (d) (nm)", value: "0.203" },
      { kind: "fill", label: "Diffraction Order (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "22.2"] },
  },
  {
    name: "Find wavelength: d=0.203 θ=22.5 n=1 → λ≈0.155",
    actions: [
      { kind: "click", label: "Wavelength (λ)" },
      { kind: "fill", label: "Crystal Plane Spacing (d) (nm)", value: "0.203" },
      { kind: "fill", label: "Bragg Angle (θ) (°)", value: "22.5" },
      { kind: "fill", label: "Diffraction Order (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.155"] },
  },
  {
    name: "Find crystal spacing: λ=0.154 θ=30 n=1 → d=0.154",
    actions: [
      { kind: "click", label: "Crystal Plane Spacing (d)" },
      { kind: "fill", label: "Wavelength (λ) (nm)", value: "0.154" },
      { kind: "fill", label: "Bragg Angle (θ) (°)", value: "30" },
      { kind: "fill", label: "Diffraction Order (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.154"] },
  },
];
