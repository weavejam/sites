import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1011 × 101 = 110111 (11 × 5 = 55)",
    actions: [
      { kind: "fill", label: "First binary number", value: "1011" },
      { kind: "fill", label: "Second binary number", value: "101" },
      { kind: "click", label: "Calculate Multiplication" },
    ],
    expect: { text: ["Result", "110111", "55"] },
  },
  {
    name: "1000 × 100 = 100000 (8 × 4 = 32)",
    actions: [
      { kind: "fill", label: "First binary number", value: "1000" },
      { kind: "fill", label: "Second binary number", value: "100" },
      { kind: "click", label: "Calculate Multiplication" },
    ],
    expect: { text: ["Result", "100000", "32"] },
  },
  {
    name: "1101 × 1 = 1101 (13 × 1 = 13)",
    actions: [
      { kind: "fill", label: "First binary number", value: "1101" },
      { kind: "fill", label: "Second binary number", value: "1" },
      { kind: "click", label: "Calculate Multiplication" },
    ],
    expect: { text: ["Result", "1101", "13"] },
  },
];
