import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1/2 → simplified 1/2 and equivalents",
    actions: [
      { kind: "fill", label: "Numerator", value: "1" },
      { kind: "fill", label: "Denominator", value: "2" },
      { kind: "click", label: "Find Equivalent Fractions" },
    ],
    expect: { text: ["Results", "Simplified Form"] },
  },
  {
    name: "3/4 with target denominator 12 → 9/12",
    actions: [
      { kind: "fill", label: "Numerator", value: "3" },
      { kind: "fill", label: "Denominator", value: "4" },
      { kind: "fill", label: "Target Denominator (Optional)", value: "12" },
      { kind: "click", label: "Find Equivalent Fractions" },
    ],
    expect: { text: ["Results", "Equivalent with Target Denominator"] },
  },
  {
    name: "6/9 → simplified to 2/3",
    actions: [
      { kind: "fill", label: "Numerator", value: "6" },
      { kind: "fill", label: "Denominator", value: "9" },
      { kind: "click", label: "Find Equivalent Fractions" },
    ],
    expect: { text: ["Results", "Decimal Value"] },
  },
];
