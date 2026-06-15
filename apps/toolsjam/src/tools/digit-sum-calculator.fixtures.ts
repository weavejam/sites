import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Digit sum of 123 = 6",
    actions: [
      { kind: "fill", label: "Integer", value: "123" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Digit Sum", "6"] },
  },
  {
    name: "Digit sum of 456 = 15, digital root = 6",
    actions: [
      { kind: "fill", label: "Integer", value: "456" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "15", "Digital Root"] },
  },
  {
    name: "Digit sum of 9999 = 36, digital root = 9",
    actions: [
      { kind: "fill", label: "Integer", value: "9999" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "36", "9"] },
  },
];
