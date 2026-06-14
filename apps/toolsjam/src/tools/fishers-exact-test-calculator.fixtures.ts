import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Drug efficacy: a=9 b=1 c=2 d=8 → significant (two-tailed p ≈ 0.035)",
    actions: [
      { kind: "fill", label: "Cell A (Group 1, Outcome 1)", value: "9" },
      { kind: "fill", label: "Cell B (Group 1, Outcome 2)", value: "1" },
      { kind: "fill", label: "Cell C (Group 2, Outcome 1)", value: "2" },
      { kind: "fill", label: "Cell D (Group 2, Outcome 2)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Two-Tailed p-Value", "Odds Ratio"] },
  },
  {
    name: "Teaching method: a=10 b=2 c=5 d=8 → result shown",
    actions: [
      { kind: "fill", label: "Cell A (Group 1, Outcome 1)", value: "10" },
      { kind: "fill", label: "Cell B (Group 1, Outcome 2)", value: "2" },
      { kind: "fill", label: "Cell C (Group 2, Outcome 1)", value: "5" },
      { kind: "fill", label: "Cell D (Group 2, Outcome 2)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["One-Tailed p-Value", "Result"] },
  },
];
