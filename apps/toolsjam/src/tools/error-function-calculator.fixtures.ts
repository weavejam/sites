import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "erf(1) ≈ 0.84270079",
    actions: [
      { kind: "click", label: "Error Function erf(x)" },
      { kind: "fill", label: "Input Value (x)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result"] },
  },
  {
    name: "erfc(0.5) ≈ 0.47950012",
    actions: [
      { kind: "click", label: "Complementary Error Function erfc(x)" },
      { kind: "fill", label: "Input Value (x)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Formula"] },
  },
  {
    name: "erf⁻¹(0.5) ≈ 0.47693628",
    actions: [
      { kind: "click", label: "Inverse Error Function erf⁻¹(x)" },
      { kind: "fill", label: "Input Value (x)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Formula"] },
  },
];
