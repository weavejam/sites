import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2 1/2 + 1 1/4 = 3 3/4",
    actions: [
      { kind: "click", label: "Add (+)" },
      { kind: "fill", label: "Whole 1", value: "2" },
      { kind: "fill", label: "Numerator 1", value: "1" },
      { kind: "fill", label: "Denominator 1", value: "2" },
      { kind: "fill", label: "Whole 2", value: "1" },
      { kind: "fill", label: "Numerator 2", value: "1" },
      { kind: "fill", label: "Denominator 2", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3 3/4"] },
  },
  {
    name: "3 1/2 - 1 3/4 = 1 3/4",
    actions: [
      { kind: "click", label: "Subtract (−)" },
      { kind: "fill", label: "Whole 1", value: "3" },
      { kind: "fill", label: "Numerator 1", value: "1" },
      { kind: "fill", label: "Denominator 1", value: "2" },
      { kind: "fill", label: "Whole 2", value: "1" },
      { kind: "fill", label: "Numerator 2", value: "3" },
      { kind: "fill", label: "Denominator 2", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1 3/4"] },
  },
  {
    name: "1 3/4 × 2 = 3 1/2",
    actions: [
      { kind: "click", label: "Multiply (×)" },
      { kind: "fill", label: "Whole 1", value: "1" },
      { kind: "fill", label: "Numerator 1", value: "3" },
      { kind: "fill", label: "Denominator 1", value: "4" },
      { kind: "fill", label: "Whole 2", value: "2" },
      { kind: "fill", label: "Numerator 2", value: "0" },
      { kind: "fill", label: "Denominator 2", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3"] },
  },
];
