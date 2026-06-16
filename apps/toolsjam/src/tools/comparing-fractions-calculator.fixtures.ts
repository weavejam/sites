import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cross multiplication shows 3/4 is larger",
    actions: [
      { kind: "click", label: "Cross multiplication" },
      { kind: "fill", label: "First numerator", value: "3" },
      { kind: "fill", label: "First denominator", value: "4" },
      { kind: "fill", label: "Second numerator", value: "2" },
      { kind: "fill", label: "Second denominator", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Result", "3/4 is greater than 2/3.", "9 > 8"],
    },
  },
  {
    name: "Common denominator shows equality",
    actions: [
      { kind: "click", label: "Common denominator" },
      { kind: "fill", label: "First numerator", value: "1" },
      { kind: "fill", label: "First denominator", value: "2" },
      { kind: "fill", label: "Second numerator", value: "2" },
      { kind: "fill", label: "Second denominator", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["1/2 is equal to 2/4.", "The common denominator is 4.", "2 = 2"],
    },
  },
  {
    name: "Decimal comparison shows 5/8 is smaller",
    actions: [
      { kind: "click", label: "Decimal comparison" },
      { kind: "fill", label: "First numerator", value: "5" },
      { kind: "fill", label: "First denominator", value: "8" },
      { kind: "fill", label: "Second numerator", value: "7" },
      { kind: "fill", label: "Second denominator", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["5/8 is less than 7/10.", "0.625 < 0.7"],
    },
  },
];
