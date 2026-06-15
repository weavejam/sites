import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Convert 2 1/2 to improper fraction → 5/2",
    actions: [
      { kind: "fill", label: "Whole Number", value: "2" },
      { kind: "fill", label: "Numerator", value: "1" },
      { kind: "fill", label: "Denominator", value: "2" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "5/2"] },
  },
  {
    name: "Convert 3 3/4 to improper fraction → 15/4",
    actions: [
      { kind: "fill", label: "Whole Number", value: "3" },
      { kind: "fill", label: "Numerator", value: "3" },
      { kind: "fill", label: "Denominator", value: "4" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "15/4"] },
  },
  {
    name: "Convert 5 2/3 to improper fraction → 17/3",
    actions: [
      { kind: "fill", label: "Whole Number", value: "5" },
      { kind: "fill", label: "Numerator", value: "2" },
      { kind: "fill", label: "Denominator", value: "3" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "17/3"] },
  },
];
