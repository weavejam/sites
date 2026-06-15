import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "6500000 → scientific notation",
    actions: [
      { kind: "click", label: "Decimal → Scientific Notation" },
      { kind: "fill", label: "Decimal Number", value: "6500000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6.5"] },
  },
  {
    name: "0.000034 → scientific notation",
    actions: [
      { kind: "click", label: "Decimal → Scientific Notation" },
      { kind: "fill", label: "Decimal Number", value: "0.000034" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3.4"] },
  },
  {
    name: "3.4 × 10^-5 → decimal",
    actions: [
      { kind: "click", label: "Scientific Notation → Decimal" },
      { kind: "fill", label: "Coefficient (a)", value: "3.4" },
      { kind: "fill", label: "Exponent (n)", value: "-5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.000034"] },
  },
];
