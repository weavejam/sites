import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "360 divisible by common divisors",
    actions: [
      { kind: "fill", label: "Number to Test", value: "360" },
      { kind: "click", label: "Common Divisors (2–12)" },
      { kind: "click", label: "Test Divisibility" },
    ],
    expect: { text: ["Divisibility Results", "Yes"] },
  },
  {
    name: "123 divisible by 3 only",
    actions: [
      { kind: "fill", label: "Number to Test", value: "123" },
      { kind: "click", label: "Common Divisors (2–12)" },
      { kind: "click", label: "Test Divisibility" },
    ],
    expect: { text: ["Divisibility Results", "3"] },
  },
  {
    name: "100 custom divisors 2 and 5",
    actions: [
      { kind: "fill", label: "Number to Test", value: "100" },
      { kind: "click", label: "Custom Divisors" },
      { kind: "fill", label: "Custom Divisors (comma-separated)", value: "2, 5, 7" },
      { kind: "click", label: "Test Divisibility" },
    ],
    expect: { text: ["Divisibility Results", "Yes"] },
  },
];
