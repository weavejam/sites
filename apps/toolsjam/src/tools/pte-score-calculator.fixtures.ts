import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Academic PTE: 80/75/70/75 → overall 75",
    actions: [
      { kind: "fill", label: "Listening Score", value: "80" },
      { kind: "fill", label: "Reading Score", value: "75" },
      { kind: "fill", label: "Speaking Score", value: "70" },
      { kind: "fill", label: "Writing Score", value: "75" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["Your PTE Results", "75"] },
  },
  {
    name: "Minimum scores: 50/50/50/50 → overall 50",
    actions: [
      { kind: "fill", label: "Listening Score", value: "50" },
      { kind: "fill", label: "Reading Score", value: "50" },
      { kind: "fill", label: "Speaking Score", value: "50" },
      { kind: "fill", label: "Writing Score", value: "50" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["Your PTE Results", "50"] },
  },
  {
    name: "Excellent: 85/85/80/85 → overall 84",
    actions: [
      { kind: "fill", label: "Listening Score", value: "85" },
      { kind: "fill", label: "Reading Score", value: "85" },
      { kind: "fill", label: "Speaking Score", value: "80" },
      { kind: "fill", label: "Writing Score", value: "85" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["Your PTE Results", "84"] },
  },
];
