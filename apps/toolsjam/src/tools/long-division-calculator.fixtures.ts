import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "125 ÷ 5 → 25 remainder 0",
    actions: [
      { kind: "fill", label: "Dividend", value: "125" },
      { kind: "fill", label: "Divisor", value: "5" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "125 ÷ 5 = 25 remainder 0"] }
  },
  {
    name: "42 ÷ 5 → 8 remainder 2",
    actions: [
      { kind: "fill", label: "Dividend", value: "42" },
      { kind: "fill", label: "Divisor", value: "5" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "42 ÷ 5 = 8 remainder 2"] }
  }
];
