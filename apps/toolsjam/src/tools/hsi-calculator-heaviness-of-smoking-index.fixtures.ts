import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Very low dependence: after 60 min, ≤10 cigs/day → HSI 0",
    actions: [
      { kind: "click", label: "After 60 minutes" },
      { kind: "click", label: "10 or fewer" },
      { kind: "click", label: "Calculate HSI Score" },
    ],
    expect: { text: ["HSI Score Result", "0 / 6"] },
  },
  {
    name: "High dependence: within 5 min, ≥31 cigs/day → HSI 6",
    actions: [
      { kind: "click", label: "Within 5 minutes" },
      { kind: "click", label: "31 or more" },
      { kind: "click", label: "Calculate HSI Score" },
    ],
    expect: { text: ["HSI Score Result", "6 / 6"] },
  },
];
