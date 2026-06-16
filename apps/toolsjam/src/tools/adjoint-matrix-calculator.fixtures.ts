import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2×2 matrix adjoint and inverse",
    actions: [
      { kind: "click", label: "2×2" },
      { kind: "fill", label: /Row 1 Col 1/, value: "1" },
      { kind: "fill", label: /Row 1 Col 2/, value: "2" },
      { kind: "fill", label: /Row 2 Col 1/, value: "3" },
      { kind: "fill", label: /Row 2 Col 2/, value: "4" },
      { kind: "click", label: "Calculate Adjoint" },
    ],
    expect: { text: ["Determinant", "Adjoint Matrix (adj A)", "Inverse Matrix (A⁻¹)"] },
  },
  {
    name: "2×2 singular matrix — no inverse",
    actions: [
      { kind: "click", label: "2×2" },
      { kind: "fill", label: /Row 1 Col 1/, value: "1" },
      { kind: "fill", label: /Row 1 Col 2/, value: "2" },
      { kind: "fill", label: /Row 2 Col 1/, value: "2" },
      { kind: "fill", label: /Row 2 Col 2/, value: "4" },
      { kind: "click", label: "Calculate Adjoint" },
    ],
    expect: { text: ["Determinant", "Adjoint Matrix (adj A)", "No inverse (singular matrix)"] },
  },
];
