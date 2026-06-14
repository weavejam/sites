import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Rate method: P0=10000, r=7%, t=15",
    actions: [
      { kind: "click", label: "Initial Value and Growth Rate" },
      { kind: "fill", label: "Initial Value (P₀)", value: "10000" },
      { kind: "fill", label: "Growth Rate (r) per Time Period", value: "7" },
      { kind: "fill", label: "Number of Time Periods (t)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Calculation Results", "Predicted Future Value"] },
  },
  {
    name: "Two-points method: bacteria 500→4500 in 4h, predict at 8h",
    actions: [
      { kind: "click", label: "Two Data Points" },
      { kind: "fill", label: "Value at Time 1 (P₁)", value: "500" },
      { kind: "fill", label: "Time 1 (t₁)", value: "0" },
      { kind: "fill", label: "Value at Time 2 (P₂)", value: "4500" },
      { kind: "fill", label: "Time 2 (t₂)", value: "4" },
      { kind: "fill", label: "Future Time for Prediction (t_pred)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Calculation Results", "Predicted Future Value"] },
  },
];
