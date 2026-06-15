import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2/3 = 4/x → x = 6",
    actions: [
      { kind: "fill", label: "First Numerator (a)", value: "2" },
      { kind: "fill", label: "First Denominator (b)", value: "3" },
      { kind: "fill", label: "Second Numerator (c)", value: "4" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Unknown value x", "6"] },
  },
  {
    name: "1/1.6 = 5/x → x = 8 (unit conversion)",
    actions: [
      { kind: "fill", label: "First Numerator (a)", value: "1" },
      { kind: "fill", label: "First Denominator (b)", value: "1.6" },
      { kind: "fill", label: "Second Numerator (c)", value: "5" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Unknown value x", "8"] },
  },
  {
    name: "3/4 = 15/x → x = 20",
    actions: [
      { kind: "fill", label: "First Numerator (a)", value: "3" },
      { kind: "fill", label: "First Denominator (b)", value: "4" },
      { kind: "fill", label: "Second Numerator (c)", value: "15" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Unknown value x", "20"] },
  },
];
