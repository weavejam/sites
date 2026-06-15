import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find Percentage: 2h of 8h shift = 25%",
    actions: [
      { kind: "click", label: "Find Percentage" },
      { kind: "fill", label: /Total Time h$/, value: "8" },
      { kind: "fill", label: /Partial Time h$/, value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25%"] },
  },
  {
    name: "Find Partial Time: 15% of 40h = 6h",
    actions: [
      { kind: "click", label: "Find Partial Time" },
      { kind: "fill", label: /Total Time h$/, value: "40" },
      { kind: "fill", label: "Percentage (%)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6 h 0 m 0 s"] },
  },
  {
    name: "Find Total Time: 45m is 75% = 1h",
    actions: [
      { kind: "click", label: "Find Total Time" },
      { kind: "fill", label: /Partial Time m$/, value: "45" },
      { kind: "fill", label: "Percentage (%)", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1 h 0 m 0 s"] },
  },
];
