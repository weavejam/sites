import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(x+2)(x+3) = x²+5x+6",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Constant b", value: "2" },
      { kind: "fill", label: "Coefficient c", value: "1" },
      { kind: "fill", label: "Constant d", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Expanded Polynomial", "x²"] },
  },
  {
    name: "(2x-1)(x+4) = 2x²+7x-4",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "2" },
      { kind: "fill", label: "Constant b", value: "-1" },
      { kind: "fill", label: "Coefficient c", value: "1" },
      { kind: "fill", label: "Constant d", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Expanded Polynomial", "2x²"] },
  },
  {
    name: "(3x+5)(2x-3) = 6x²+x-15",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "3" },
      { kind: "fill", label: "Constant b", value: "5" },
      { kind: "fill", label: "Coefficient c", value: "2" },
      { kind: "fill", label: "Constant d", value: "-3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Expanded Polynomial", "6x²"] },
  },
];
