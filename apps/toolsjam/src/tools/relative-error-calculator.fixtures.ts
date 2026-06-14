import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Chemistry: true=10.5 observed=10.2 → 2.857%",
    actions: [
      { kind: "fill", label: "True Value (Accepted Value)", value: "10.5" },
      { kind: "fill", label: "Observed Value (Measured Value)", value: "10.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Absolute Error", "Percentage Error"] },
  },
  {
    name: "Physics: true=9.81 observed=9.7 → 1.121%",
    actions: [
      { kind: "fill", label: "True Value (Accepted Value)", value: "9.81" },
      { kind: "fill", label: "Observed Value (Measured Value)", value: "9.7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Relative Error", "Percentage Error"] },
  },
  {
    name: "Manufacturing: true=50 observed=50.1 → 0.2%",
    actions: [
      { kind: "fill", label: "True Value (Accepted Value)", value: "50" },
      { kind: "fill", label: "Observed Value (Measured Value)", value: "50.1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Absolute Error"] },
  },
];
