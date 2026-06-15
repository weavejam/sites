import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sum 7, Product 12 → 4 and 3",
    actions: [
      { kind: "fill", label: "Sum (top of diamond)", value: "7" },
      { kind: "fill", label: "Product (bottom of diamond)", value: "12" },
      { kind: "click", label: "Solve" },
    ],
    expect: { text: ["Solution", "4", "3"] },
  },
  {
    name: "Sum -5, Product 6 → -2 and -3",
    actions: [
      { kind: "fill", label: "Sum (top of diamond)", value: "-5" },
      { kind: "fill", label: "Product (bottom of diamond)", value: "6" },
      { kind: "click", label: "Solve" },
    ],
    expect: { text: ["Solution", "-2", "-3"] },
  },
  {
    name: "Sum 1, Product -6 → 3 and -2",
    actions: [
      { kind: "fill", label: "Sum (top of diamond)", value: "1" },
      { kind: "fill", label: "Product (bottom of diamond)", value: "-6" },
      { kind: "click", label: "Solve" },
    ],
    expect: { text: ["Solution", "3", "-2"] },
  },
];
