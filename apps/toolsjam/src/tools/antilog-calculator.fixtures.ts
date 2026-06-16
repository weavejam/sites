import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Base 10, y=2 → 100",
    actions: [
      { kind: "click", label: "Base 10" },
      { kind: "fill", label: "Logarithm Value (y)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["100"] },
  },
  {
    name: "Base 2, y=8 → 256",
    actions: [
      { kind: "click", label: "Base 2" },
      { kind: "fill", label: "Logarithm Value (y)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["256"] },
  },
  {
    name: "Base 10, y=−3 → 0.001",
    actions: [
      { kind: "click", label: "Base 10" },
      { kind: "fill", label: "Logarithm Value (y)", value: "-3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["0.001"] },
  },
];
