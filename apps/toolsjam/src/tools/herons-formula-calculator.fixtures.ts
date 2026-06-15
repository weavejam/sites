import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "computes area for a 3-4-5 right triangle",
    actions: [
      { kind: "fill", label: "Side A", value: "3" },
      { kind: "fill", label: "Side B", value: "4" },
      { kind: "fill", label: "Side C", value: "5" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Triangle Area", "Area: 6.000000 m²", "Perimeter: 12.000000 m", "Semi-perimeter: 6.000000 m"] },
  },
  {
    name: "computes area for a 5-12-13 right triangle",
    actions: [
      { kind: "fill", label: "Side A", value: "5" },
      { kind: "fill", label: "Side B", value: "12" },
      { kind: "fill", label: "Side C", value: "13" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Triangle Area", "Area: 30.000000 m²", "Perimeter: 30.000000 m", "Semi-perimeter: 15.000000 m"] },
  },
];
