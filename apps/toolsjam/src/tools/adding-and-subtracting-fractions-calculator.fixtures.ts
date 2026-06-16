import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1/2 + 1/3 = 5/6",
    actions: [
      { kind: "click", label: "Add (+)" },
      { kind: "fill", label: "First Numerator", value: "1" },
      { kind: "fill", label: "First Denominator", value: "2" },
      { kind: "fill", label: "Second Numerator", value: "1" },
      { kind: "fill", label: "Second Denominator", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "3/4 - 1/8 = 5/8",
    actions: [
      { kind: "click", label: "Subtract (−)" },
      { kind: "fill", label: "First Numerator", value: "3" },
      { kind: "fill", label: "First Denominator", value: "4" },
      { kind: "fill", label: "Second Numerator", value: "1" },
      { kind: "fill", label: "Second Denominator", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
];
