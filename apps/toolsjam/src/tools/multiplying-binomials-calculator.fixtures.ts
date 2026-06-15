import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "(x + 2)(x + 3) = x² + 5x + 6",
    actions: [
      { kind: "fill", label: "Value of a", value: "1" },
      { kind: "fill", label: "Value of b", value: "2" },
      { kind: "fill", label: "Value of c", value: "1" },
      { kind: "fill", label: "Value of d", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "x² + 5x + 6"] },
  },
  {
    name: "(2x - 4)(3x + 1) = 6x² - 10x - 4",
    actions: [
      { kind: "fill", label: "Value of a", value: "2" },
      { kind: "fill", label: "Value of b", value: "-4" },
      { kind: "fill", label: "Value of c", value: "3" },
      { kind: "fill", label: "Value of d", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6x² - 10x - 4"] },
  },
  {
    name: "(x - 5)(x - 7) = x² - 12x + 35",
    actions: [
      { kind: "fill", label: "Value of a", value: "1" },
      { kind: "fill", label: "Value of b", value: "-5" },
      { kind: "fill", label: "Value of c", value: "1" },
      { kind: "fill", label: "Value of d", value: "-7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "x² - 12x + 35"] },
  },
];
