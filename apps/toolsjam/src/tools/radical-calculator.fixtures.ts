import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simplify square root of 50",
    actions: [
      { kind: "fill", label: "Radicand (Number inside the root)", value: "50" },
      { kind: "fill", label: "Index (Degree of the root, e.g. 2 for square root)", value: "2" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Radical", "5"] },
  },
  {
    name: "Simplify cube root of 54",
    actions: [
      { kind: "fill", label: "Radicand (Number inside the root)", value: "54" },
      { kind: "fill", label: "Index (Degree of the root, e.g. 2 for square root)", value: "3" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Radical", "3"] },
  },
  {
    name: "Simplify square root of perfect square 144",
    actions: [
      { kind: "fill", label: "Radicand (Number inside the root)", value: "144" },
      { kind: "fill", label: "Index (Degree of the root, e.g. 2 for square root)", value: "2" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Radical", "12"] },
  },
];
