import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "x² + y² = 9 is a Circle",
    actions: [
      { kind: "fill", label: "Coefficient A (x²)", value: "1" },
      { kind: "fill", label: "Coefficient B (xy)", value: "0" },
      { kind: "fill", label: "Coefficient C (y²)", value: "1" },
      { kind: "fill", label: "Coefficient D (x)", value: "0" },
      { kind: "fill", label: "Coefficient E (y)", value: "0" },
      { kind: "fill", label: "Constant F", value: "-9" },
      { kind: "click", label: "Identify Conic Section" },
    ],
    expect: { text: ["Result", "Circle"] },
  },
  {
    name: "x² − y² = 1 is a Hyperbola",
    actions: [
      { kind: "fill", label: "Coefficient A (x²)", value: "1" },
      { kind: "fill", label: "Coefficient B (xy)", value: "0" },
      { kind: "fill", label: "Coefficient C (y²)", value: "-1" },
      { kind: "fill", label: "Coefficient D (x)", value: "0" },
      { kind: "fill", label: "Coefficient E (y)", value: "0" },
      { kind: "fill", label: "Constant F", value: "-1" },
      { kind: "click", label: "Identify Conic Section" },
    ],
    expect: { text: ["Result", "Hyperbola"] },
  },
];
