import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2^5 ÷ 2^3 = 4",
    actions: [
      { kind: "fill", label: "Numerator Base (a)", value: "2" },
      { kind: "fill", label: "Numerator Exponent (m)", value: "5" },
      { kind: "fill", label: "Denominator Base (b)", value: "2" },
      { kind: "fill", label: "Denominator Exponent (n)", value: "3" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "4"] },
  },
  {
    name: "3^4 ÷ 3^2 = 9",
    actions: [
      { kind: "fill", label: "Numerator Base (a)", value: "3" },
      { kind: "fill", label: "Numerator Exponent (m)", value: "4" },
      { kind: "fill", label: "Denominator Base (b)", value: "3" },
      { kind: "fill", label: "Denominator Exponent (n)", value: "2" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "9"] },
  },
  {
    name: "5^3 ÷ 5^3 = 1",
    actions: [
      { kind: "fill", label: "Numerator Base (a)", value: "5" },
      { kind: "fill", label: "Numerator Exponent (m)", value: "3" },
      { kind: "fill", label: "Denominator Base (b)", value: "5" },
      { kind: "fill", label: "Denominator Exponent (n)", value: "3" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
