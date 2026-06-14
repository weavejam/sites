import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Two survival groups with different hazard rates",
    actions: [
      { kind: "fill", label: "Group 1 — Survival Times", value: "6, 6, 6, 7, 10, 13, 16, 22, 23, 6, 9, 10, 11, 17, 19, 20, 25, 26" },
      { kind: "fill", label: "Group 1 — Event Indicators (1/0)", value: "1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1" },
      { kind: "fill", label: "Group 2 — Survival Times", value: "1, 1, 2, 2, 3, 4, 4, 5, 5, 8, 8, 8, 8, 11, 11, 12, 12, 15" },
      { kind: "fill", label: "Group 2 — Event Indicators (1/0)", value: "1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Chi-Squared", "p-value", "Observed", "Expected"],
    },
  },
  {
    name: "Two groups with censored observations",
    actions: [
      { kind: "fill", label: "Group 1 — Survival Times", value: "5, 10, 15, 20, 25" },
      { kind: "fill", label: "Group 1 — Event Indicators (1/0)", value: "1, 0, 1, 1, 0" },
      { kind: "fill", label: "Group 2 — Survival Times", value: "3, 8, 12, 18, 22" },
      { kind: "fill", label: "Group 2 — Event Indicators (1/0)", value: "1, 1, 0, 1, 1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Chi-Squared", "p-value"],
    },
  },
];
