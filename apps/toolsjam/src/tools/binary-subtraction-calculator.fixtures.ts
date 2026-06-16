import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1101 − 101 = 1000 (13 − 5 = 8)",
    actions: [
      { kind: "fill", label: "Minuend (first number)", value: "1101" },
      { kind: "fill", label: "Subtrahend (second number)", value: "101" },
      { kind: "click", label: "Standard Borrowing" },
      { kind: "click", label: "Calculate Subtraction" },
    ],
    expect: { text: ["Result", "1000", "8"] },
  },
  {
    name: "10010 − 1011 = 111 (18 − 11 = 7)",
    actions: [
      { kind: "fill", label: "Minuend (first number)", value: "10010" },
      { kind: "fill", label: "Subtrahend (second number)", value: "1011" },
      { kind: "click", label: "Standard Borrowing" },
      { kind: "click", label: "Calculate Subtraction" },
    ],
    expect: { text: ["Result", "111", "7"] },
  },
  {
    name: "1100 − 111 = 101 using Two's Complement (12 − 7 = 5)",
    actions: [
      { kind: "fill", label: "Minuend (first number)", value: "1100" },
      { kind: "fill", label: "Subtrahend (second number)", value: "111" },
      { kind: "click", label: "Two's Complement" },
      { kind: "click", label: "Calculate Subtraction" },
    ],
    expect: { text: ["Result", "5"] },
  },
];
