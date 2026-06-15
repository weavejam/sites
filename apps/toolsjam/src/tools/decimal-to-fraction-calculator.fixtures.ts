import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "0.75 → 3/4",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "0.75" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "3/4"] },
  },
  {
    name: "0.125 → 1/8",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "0.125" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "1/8"] },
  },
  {
    name: "2.25 → 9/4",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "2.25" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "9/4"] },
  },
];
