import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "two solutions: |2x - 3| = 7",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "2" },
      { kind: "fill", label: "Constant b", value: "-3" },
      { kind: "fill", label: "Value c", value: "7" },
      { kind: "click", label: "Calculate Solutions" },
    ],
    expect: { text: ["Solution", "5"] },
  },
  {
    name: "one solution: |3x + 6| = 0",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "3" },
      { kind: "fill", label: "Constant b", value: "6" },
      { kind: "fill", label: "Value c", value: "0" },
      { kind: "click", label: "Calculate Solutions" },
    ],
    expect: { text: ["Solution"] },
  },
];
