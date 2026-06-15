import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LCM of 12 and 18 → 36",
    actions: [
      { kind: "fill", label: "Numbers", value: "12, 18" },
      { kind: "click", label: "Calculate LCM" },
    ],
    expect: { text: ["LCM Result", "36"] },
  },
  {
    name: "LCM of 7, 11, 13 → 1001",
    actions: [
      { kind: "fill", label: "Numbers", value: "7, 11, 13" },
      { kind: "click", label: "Calculate LCM" },
    ],
    expect: { text: ["LCM Result", "1001"] },
  },
];
