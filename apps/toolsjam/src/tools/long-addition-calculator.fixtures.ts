import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "458 + 267 → 725",
    actions: [
      { kind: "fill", label: "First Number", value: "458" },
      { kind: "fill", label: "Second Number", value: "267" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "458 + 267 = 725"] }
  },
  {
    name: "999 + 1 → 1000",
    actions: [
      { kind: "fill", label: "First Number", value: "999" },
      { kind: "fill", label: "Second Number", value: "1" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "999 + 1 = 1,000"] }
  }
];
