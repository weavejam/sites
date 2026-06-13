import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "What is 20% of 80 → 16",
    actions: [
      { kind: "click", label: "What is X% of Y?" },
      { kind: "fill", label: "Percentage (%)", value: "20" },
      { kind: "fill", label: "Total value", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "20% of 80 = 16"] },
  },
  {
    name: "What is 18% of 78.50 → 14.13",
    actions: [
      { kind: "click", label: "What is X% of Y?" },
      { kind: "fill", label: "Percentage (%)", value: "18" },
      { kind: "fill", label: "Total value", value: "78.50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "18% of 78.5 = 14.13"] },
  },
  {
    name: "25 is what percent of 200 → 12.5",
    actions: [
      { kind: "click", label: "X is what percent of Y?" },
      { kind: "fill", label: "Value", value: "25" },
      { kind: "fill", label: "Total value", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "25 is 12.5% of 200" },
  },
  {
    name: "30 is 60% of what → 50",
    actions: [
      { kind: "click", label: "X is Y% of what?" },
      { kind: "fill", label: "Value", value: "30" },
      { kind: "fill", label: "Percentage (%)", value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "30 is 60% of 50" },
  },
];
