import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Balanced routine — wellness 88",
    actions: [
      { kind: "fill", label: "Exercise Time (hours)", value: "1.5" },
      { kind: "fill", label: "Work/Study Time (hours)", value: "8" },
      { kind: "fill", label: "Social Connection Time (hours)", value: "2" },
      { kind: "fill", label: "Rest/Relaxation Time (hours)", value: "3" },
      { kind: "fill", label: "Sleep Hours", value: "8" },
      { kind: "fill", label: "Activity Quality Rating (1–10)", value: "8" },
      { kind: "fill", label: "Days in Quarantine", value: "14" },
      { kind: "click", label: "Calculate Wellness Score" },
    ],
    expect: { text: ["88", "Very Good"] },
  },
  {
    name: "Struggling routine — wellness 34",
    actions: [
      { kind: "fill", label: "Exercise Time (hours)", value: "0.5" },
      { kind: "fill", label: "Work/Study Time (hours)", value: "4" },
      { kind: "fill", label: "Social Connection Time (hours)", value: "0.5" },
      { kind: "fill", label: "Rest/Relaxation Time (hours)", value: "6" },
      { kind: "fill", label: "Sleep Hours", value: "10" },
      { kind: "fill", label: "Activity Quality Rating (1–10)", value: "3" },
      { kind: "fill", label: "Days in Quarantine", value: "30" },
      { kind: "click", label: "Calculate Wellness Score" },
    ],
    expect: { text: ["34", "Poor"] },
  },
];
