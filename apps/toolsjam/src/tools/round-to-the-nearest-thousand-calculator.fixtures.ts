import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "4789 rounds to 5000",
    actions: [
      { kind: "fill", label: "Number to Round", value: "4789" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4,789 rounded to the nearest thousand = 5,000"] },
  },
  {
    name: "12345 rounds to 12000",
    actions: [
      { kind: "fill", label: "Number to Round", value: "12345" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12,345 rounded to the nearest thousand = 12,000"] },
  },
  {
    name: "99500 rounds to 100000",
    actions: [
      { kind: "fill", label: "Number to Round", value: "99500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "99,500 rounded to the nearest thousand = 100,000"] },
  },
];
