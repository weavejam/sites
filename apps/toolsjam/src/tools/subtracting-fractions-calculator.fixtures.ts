import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "5/8 minus 3/8 = 1/4",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "5" },
      { kind: "fill", label: "Denominator 1", value: "8" },
      { kind: "fill", label: "Numerator 2", value: "3" },
      { kind: "fill", label: "Denominator 2", value: "8" },
      { kind: "click", label: "Subtract Fractions" },
    ],
    expect: { text: ["Result", "1/4"] },
  },
  {
    name: "3/4 minus 1/2 = 1/4",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "3" },
      { kind: "fill", label: "Denominator 1", value: "4" },
      { kind: "fill", label: "Numerator 2", value: "1" },
      { kind: "fill", label: "Denominator 2", value: "2" },
      { kind: "click", label: "Subtract Fractions" },
    ],
    expect: { text: ["Result", "1/4"] },
  },
  {
    name: "7/4 minus 3/4 = 1",
    actions: [
      { kind: "fill", label: "Numerator 1", value: "7" },
      { kind: "fill", label: "Denominator 1", value: "4" },
      { kind: "fill", label: "Numerator 2", value: "3" },
      { kind: "fill", label: "Denominator 2", value: "4" },
      { kind: "click", label: "Subtract Fractions" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
