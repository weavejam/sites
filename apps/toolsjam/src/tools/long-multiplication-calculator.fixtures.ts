import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "23 × 14 → 322",
    actions: [
      { kind: "fill", label: "Multiplicand", value: "23" },
      { kind: "fill", label: "Multiplier", value: "14" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "23 × 14 = 322"] }
  },
  {
    name: "105 × 6 → 630",
    actions: [
      { kind: "fill", label: "Multiplicand", value: "105" },
      { kind: "fill", label: "Multiplier", value: "6" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "105 × 6 = 630"] }
  }
];
