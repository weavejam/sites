import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "bounded solution: |x| < 5",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Constant b", value: "0" },
      { kind: "click", label: "< (less than)" },
      { kind: "fill", label: "Constant c", value: "5" },
      { kind: "click", label: "Calculate Solution" },
    ],
    expect: { text: ["Solution", "5"] },
  },
  {
    name: "unbounded solution: |x + 1| > 2",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Constant b", value: "1" },
      { kind: "click", label: "> (greater than)" },
      { kind: "fill", label: "Constant c", value: "2" },
      { kind: "click", label: "Calculate Solution" },
    ],
    expect: { text: ["Solution"] },
  },
];
