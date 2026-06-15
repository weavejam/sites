import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Fraction reciprocal",
    actions: [
      { kind: "fill", label: "Number or Fraction", value: "3/4" },
      { kind: "click", label: "Find Reciprocal" },
    ],
    expect: { text: ["Result", "Reciprocal: 4/3"] },
  },
  {
    name: "Decimal reciprocal",
    actions: [
      { kind: "fill", label: "Number or Fraction", value: "-2.5" },
      { kind: "click", label: "Find Reciprocal" },
    ],
    expect: { text: "Reciprocal: -2/5" },
  },
];
