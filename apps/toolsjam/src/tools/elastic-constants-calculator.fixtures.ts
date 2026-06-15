import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel: E=200000, nu=0.3 → G≈76923, K≈166667",
    actions: [
      { kind: "fill", label: "Young's Modulus E (MPa)", value: "200000" },
      { kind: "fill", label: "Poisson's Ratio ν", value: "0.3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Shear Modulus"] },
  },
  {
    name: "Aluminium: E=68900, G=26000 → nu≈0.325",
    actions: [
      { kind: "fill", label: "Young's Modulus E (MPa)", value: "68900" },
      { kind: "fill", label: "Shear Modulus G (MPa)", value: "26000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Poisson's Ratio"] },
  },
];
