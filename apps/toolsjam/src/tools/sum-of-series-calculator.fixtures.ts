import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Arithmetic: 1+3+5+...+19 (a=1,d=2,n=10) → 100",
    actions: [
      { kind: "click", label: "Arithmetic Sequence" },
      { kind: "fill", label: "First Term (a)", value: "1" },
      { kind: "fill", label: "Common Difference (d)", value: "2" },
      { kind: "fill", label: "Number of Terms (n)", value: "10" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Sum", "100"] },
  },
  {
    name: "Geometric: 2+4+8+...×8 terms (a=2,r=2,n=8) → 510",
    actions: [
      { kind: "click", label: "Geometric Series" },
      { kind: "fill", label: "First Term (a)", value: "2" },
      { kind: "fill", label: "Common Ratio (r)", value: "2" },
      { kind: "fill", label: "Number of Terms (n)", value: "8" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Sum", "510"] },
  },
  {
    name: "Sum of Squares: 1²+…+15² → 1240",
    actions: [
      { kind: "click", label: "Sum of Squares" },
      { kind: "fill", label: "Number of Terms (n)", value: "15" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Sum", "1240"] },
  },
];
