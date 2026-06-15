import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(3/4) ÷ (2/5) = 15/8",
    actions: [
      { kind: "fill", label: "Numerator (a)", value: "3" },
      { kind: "fill", label: "Denominator (b)", value: "4" },
      { kind: "fill", label: "Numerator (c)", value: "2" },
      { kind: "fill", label: "Denominator (d)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "15"] },
  },
  {
    name: "(1/2) ÷ (1/4) = 2",
    actions: [
      { kind: "fill", label: "Numerator (a)", value: "1" },
      { kind: "fill", label: "Denominator (b)", value: "2" },
      { kind: "fill", label: "Numerator (c)", value: "1" },
      { kind: "fill", label: "Denominator (d)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2"] },
  },
  {
    name: "(5/6) ÷ (1/3) = 5/2",
    actions: [
      { kind: "fill", label: "Numerator (a)", value: "5" },
      { kind: "fill", label: "Denominator (b)", value: "6" },
      { kind: "fill", label: "Numerator (c)", value: "1" },
      { kind: "fill", label: "Denominator (d)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2.5"] },
  },
];
