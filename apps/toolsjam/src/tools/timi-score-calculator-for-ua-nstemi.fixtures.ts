import type { ToolFixture } from "@/tools/fixture";

// All factors default to "no" (0 pts). Load-example buttons pre-fill high-risk scenarios.
export const fixtures: ToolFixture[] = [
  {
    name: "All factors No — TIMI score 0, low risk",
    actions: [
      { kind: "click", label: "Calculate TIMI Score" },
    ],
    expect: { text: ["0 / 7", "4.7%", "Low Risk"] },
  },
  {
    name: "Load high risk example — TIMI score 7",
    actions: [
      { kind: "click", label: "Load High Risk" },
    ],
    expect: { text: ["7 / 7", "40.9%", "Very High Risk"] },
  },
];
