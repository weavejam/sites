import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "903 - 278 → 625",
    actions: [
      { kind: "fill", label: "Minuend", value: "903" },
      { kind: "fill", label: "Subtrahend", value: "278" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "903 - 278 = 625"] }
  },
  {
    name: "5000 - 2567 → 2433",
    actions: [
      { kind: "fill", label: "Minuend", value: "5000" },
      { kind: "fill", label: "Subtrahend", value: "2567" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "5,000 - 2,567 = 2,433"] }
  }
];
