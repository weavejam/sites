import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "12 AND 10 = 8",
    actions: [
      { kind: "click", label: "AND" },
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "First Number", value: "12" },
      { kind: "fill", label: "Second Number", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "8"] },
  },
  {
    name: "12 OR 10 = 14",
    actions: [
      { kind: "click", label: "OR" },
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "First Number", value: "12" },
      { kind: "fill", label: "Second Number", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "14"] },
  },
  {
    name: "12 XOR 10 = 6",
    actions: [
      { kind: "click", label: "XOR" },
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "First Number", value: "12" },
      { kind: "fill", label: "Second Number", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6"] },
  },
  {
    name: "3 LEFT SHIFT 2 = 12",
    actions: [
      { kind: "click", label: "Left Shift" },
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "First Number", value: "3" },
      { kind: "fill", label: "Shift Amount", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12"] },
  },
];
