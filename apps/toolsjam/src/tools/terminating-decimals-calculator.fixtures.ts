import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "3/8 → terminating decimal 0.375",
    actions: [
      { kind: "fill", label: "Numerator (Top Number)", value: "3" },
      { kind: "fill", label: "Denominator (Bottom Number)", value: "8" },
      { kind: "click", label: "Analyze Fraction" },
    ],
    expect: { text: ["Analysis Result", "Terminating", "0.375"] },
  },
  {
    name: "1/3 → repeating decimal",
    actions: [
      { kind: "fill", label: "Numerator (Top Number)", value: "1" },
      { kind: "fill", label: "Denominator (Bottom Number)", value: "3" },
      { kind: "click", label: "Analyze Fraction" },
    ],
    expect: { text: ["Analysis Result", "Repeating"] },
  },
  {
    name: "7/20 → terminating decimal 0.35",
    actions: [
      { kind: "fill", label: "Numerator (Top Number)", value: "7" },
      { kind: "fill", label: "Denominator (Bottom Number)", value: "20" },
      { kind: "click", label: "Analyze Fraction" },
    ],
    expect: { text: ["Analysis Result", "Terminating"] },
  },
];
