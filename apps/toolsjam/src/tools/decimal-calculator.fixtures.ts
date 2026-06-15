import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "12.5 + 7.25 = 19.75",
    actions: [
      { kind: "click", label: "Add (+)" },
      { kind: "fill", label: "First Number", value: "12.5" },
      { kind: "fill", label: "Second Number", value: "7.25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "19.75"] },
  },
  {
    name: "87.5 ÷ 2.5 = 35",
    actions: [
      { kind: "click", label: "Divide (÷)" },
      { kind: "fill", label: "First Number", value: "87.5" },
      { kind: "fill", label: "Second Number", value: "2.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "35"] },
  },
  {
    name: "0.25 × 4 = 1",
    actions: [
      { kind: "click", label: "Multiply (×)" },
      { kind: "fill", label: "First Number", value: "0.25" },
      { kind: "fill", label: "Second Number", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
