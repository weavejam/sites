import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "50Ω → 50Ω perfect match: VSWR 1.00",
    actions: [
      { kind: "fill", label: "Source Impedance (Real) Ω", value: "50" },
      { kind: "fill", label: "Source Impedance (Imaginary) Ω", value: "0" },
      { kind: "fill", label: "Load Impedance (Real) Ω", value: "50" },
      { kind: "fill", label: "Load Impedance (Imaginary) Ω", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "1.00:1", "100.0%"] },
  },
  {
    name: "50Ω → 75Ω mismatch: VSWR 1.50",
    actions: [
      { kind: "fill", label: "Source Impedance (Real) Ω", value: "50" },
      { kind: "fill", label: "Source Impedance (Imaginary) Ω", value: "0" },
      { kind: "fill", label: "Load Impedance (Real) Ω", value: "75" },
      { kind: "fill", label: "Load Impedance (Imaginary) Ω", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "1.50:1"] },
  },
];
