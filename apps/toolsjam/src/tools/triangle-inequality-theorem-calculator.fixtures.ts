import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Valid scalene triangle 5-7-10",
    actions: [
      { kind: "fill", label: "Side A", value: "5" },
      { kind: "fill", label: "Side B", value: "7" },
      { kind: "fill", label: "Side C", value: "10" },
      { kind: "click", label: "Check Triangle" },
    ],
    expect: { text: ["Valid Triangle", "Scalene"] },
  },
  {
    name: "Valid equilateral triangle 10-10-10",
    actions: [
      { kind: "fill", label: "Side A", value: "10" },
      { kind: "fill", label: "Side B", value: "10" },
      { kind: "fill", label: "Side C", value: "10" },
      { kind: "click", label: "Check Triangle" },
    ],
    expect: { text: ["Valid Triangle", "Equilateral"] },
  },
  {
    name: "Invalid triangle 3-4-8",
    actions: [
      { kind: "fill", label: "Side A", value: "3" },
      { kind: "fill", label: "Side B", value: "4" },
      { kind: "fill", label: "Side C", value: "8" },
      { kind: "click", label: "Check Triangle" },
    ],
    expect: { text: ["Not a Valid Triangle"] },
  },
];
