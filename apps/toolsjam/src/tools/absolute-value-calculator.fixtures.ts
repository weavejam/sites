import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Absolute value of −7 = 7",
    actions: [
      { kind: "fill", label: "Number", value: "-7" },
      { kind: "click", label: "Calculate Absolute Value" },
    ],
    expect: { text: ["Absolute Value", "7"] },
  },
  {
    name: "Absolute value of 5 = 5",
    actions: [
      { kind: "fill", label: "Number", value: "5" },
      { kind: "click", label: "Calculate Absolute Value" },
    ],
    expect: { text: ["Absolute Value", "5"] },
  },
  {
    name: "Absolute value of −12.5 = 12.5",
    actions: [
      { kind: "fill", label: "Number", value: "-12.5" },
      { kind: "click", label: "Calculate Absolute Value" },
    ],
    expect: { text: ["Absolute Value", "12.5"] },
  },
];
