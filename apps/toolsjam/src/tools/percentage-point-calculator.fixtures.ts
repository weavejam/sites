import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Interest rate 2.5% → 2.75% = +0.25 pp increase",
    actions: [
      { kind: "fill", label: "Initial Percentage (%)", value: "2.5" },
      { kind: "fill", label: "Final Percentage (%)", value: "2.75" },
      { kind: "click", label: "Calculate Difference" },
    ],
    expect: { text: ["Result", "increase of 0.25 percentage points"] },
  },
  {
    name: "Poll shift 44% → 49.5% = +5.5 pp increase",
    actions: [
      { kind: "fill", label: "Initial Percentage (%)", value: "44" },
      { kind: "fill", label: "Final Percentage (%)", value: "49.5" },
      { kind: "click", label: "Calculate Difference" },
    ],
    expect: { text: ["Result", "increase of 5.5 percentage points"] },
  },
  {
    name: "Market share 15.2% → 12.8% = -2.4 pp decrease",
    actions: [
      { kind: "fill", label: "Initial Percentage (%)", value: "15.2" },
      { kind: "fill", label: "Final Percentage (%)", value: "12.8" },
      { kind: "click", label: "Calculate Difference" },
    ],
    expect: { text: ["Result", "decrease of 2.4 percentage points"] },
  },
];
