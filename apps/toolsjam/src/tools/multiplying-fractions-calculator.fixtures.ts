import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1/2 × 1/3 = 1/6",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "1" },
      { kind: "fill", label: "Denominator 1", value: "2" },
      { kind: "fill", label: "Numerator 2", value: "1" },
      { kind: "fill", label: "Denominator 2", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1/6"] },
  },
  {
    name: "2/3 × 3/4 = 1/2",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "2" },
      { kind: "fill", label: "Denominator 1", value: "3" },
      { kind: "fill", label: "Numerator 2", value: "3" },
      { kind: "fill", label: "Denominator 2", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1/2"] },
  },
  {
    name: "3/4 × 2/5 = 3/10",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "3" },
      { kind: "fill", label: "Denominator 1", value: "4" },
      { kind: "fill", label: "Numerator 2", value: "2" },
      { kind: "fill", label: "Denominator 2", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3/10"] },
  },
];
