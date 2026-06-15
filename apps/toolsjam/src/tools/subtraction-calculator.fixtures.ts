import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "99 minus 34 = 65",
    actions: [
      { kind: "fill", label: "Minuend (A)", value: "99" },
      { kind: "fill", label: "Subtrahend (B)", value: "34" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "65"] },
  },
  {
    name: "15.5 minus 8.2 = 7.3",
    actions: [
      { kind: "fill", label: "Minuend (A)", value: "15.5" },
      { kind: "fill", label: "Subtrahend (B)", value: "8.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "7.3"] },
  },
  {
    name: "3000 minus 1800 = 1200",
    actions: [
      { kind: "fill", label: "Minuend (A)", value: "3000" },
      { kind: "fill", label: "Subtrahend (B)", value: "1800" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1,200"] },
  },
];
