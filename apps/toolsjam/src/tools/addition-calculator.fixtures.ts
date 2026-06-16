import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "add two positive integers: 25 + 17 = 42",
    actions: [
      { kind: "fill", label: "First Number", value: "25" },
      { kind: "fill", label: "Second Number", value: "17" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Sum", "42"] },
  },
  {
    name: "add three decimals: 15.75 + 8.25 + 12.50",
    actions: [
      { kind: "fill", label: "First Number", value: "15.75" },
      { kind: "fill", label: "Second Number", value: "8.25" },
      { kind: "fill", label: "Third Number (Optional)", value: "12.50" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Sum", "36.5"] },
  },
];
