import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "48 × 27 = 1296 via partial products",
    actions: [
      { kind: "fill", label: "Multiplicand", value: "48" },
      { kind: "fill", label: "Multiplier", value: "27" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Partial Products Breakdown", "1,296"] },
  },
  {
    name: "157 × 8 = 1256 via partial products",
    actions: [
      { kind: "fill", label: "Multiplicand", value: "157" },
      { kind: "fill", label: "Multiplier", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Partial Products Breakdown", "1,256"] },
  },
];
