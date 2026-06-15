import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "144 is a perfect square (root = 12)",
    actions: [
      { kind: "fill", label: "Number", value: "144" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["144 is a perfect square", "Integer square root: 12"] },
  },
  {
    name: "9 is a perfect square (root = 3)",
    actions: [
      { kind: "fill", label: "Number", value: "9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["9 is a perfect square", "Integer square root: 3"] },
  },
  {
    name: "150 is not a perfect square — nearest are 144 and 169",
    actions: [
      { kind: "fill", label: "Number", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "150 is not a perfect square",
        "Previous perfect square: 144",
        "Next perfect square: 169",
      ],
    },
  },
];
