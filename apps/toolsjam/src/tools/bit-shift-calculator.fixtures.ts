import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "5 left-shift 2 = 20",
    actions: [
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "Number", value: "5" },
      { kind: "click", label: "Left Shift (<<)" },
      { kind: "fill", label: "Shift amount (bits)", value: "2" },
      { kind: "click", label: "Calculate Shift" },
    ],
    expect: { text: ["Result", "20", "10100"] },
  },
  {
    name: "40 logical right-shift 3 = 5",
    actions: [
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "Number", value: "40" },
      { kind: "click", label: "Right Shift Logical (>>>)" },
      { kind: "fill", label: "Shift amount (bits)", value: "3" },
      { kind: "click", label: "Calculate Shift" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "Binary 1010 left-shift 1 = 10100 (20)",
    actions: [
      { kind: "click", label: "Binary" },
      { kind: "fill", label: "Number", value: "1010" },
      { kind: "click", label: "Left Shift (<<)" },
      { kind: "fill", label: "Shift amount (bits)", value: "1" },
      { kind: "click", label: "Calculate Shift" },
    ],
    expect: { text: ["Result", "20", "10100"] },
  },
];
