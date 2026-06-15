import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LCD of 12 and 15 → 60",
    actions: [
      { kind: "fill", label: "Numbers", value: "12, 15" },
      { kind: "click", label: "Calculate LCD" },
    ],
    expect: { text: ["LCD Result", "60"] },
  },
  {
    name: "LCD of 8, 12, 16 → 48",
    actions: [
      { kind: "fill", label: "Numbers", value: "8, 12, 16" },
      { kind: "click", label: "Calculate LCD" },
    ],
    expect: { text: ["LCD Result", "48"] },
  },
];
