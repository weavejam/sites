import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "25% of 40% = 10%",
    actions: [
      { kind: "fill", label: "First Percentage (%)", value: "25" },
      { kind: "fill", label: "Second Percentage (%)", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25% of 40% = 10%"] },
  },
  {
    name: "30% of 60% = 18%",
    actions: [
      { kind: "fill", label: "First Percentage (%)", value: "30" },
      { kind: "fill", label: "Second Percentage (%)", value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "30% of 60% = 18%"] },
  },
  {
    name: "10% of 2% = 0.2%",
    actions: [
      { kind: "fill", label: "First Percentage (%)", value: "10" },
      { kind: "fill", label: "Second Percentage (%)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "10% of 2% = 0.2%"] },
  },
];
