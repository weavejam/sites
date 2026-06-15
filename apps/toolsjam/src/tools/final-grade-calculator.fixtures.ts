import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard 70/30: 85% current + 90% exam → 86.50%",
    actions: [
      { kind: "fill", label: "Current Grade (%)", value: "85" },
      { kind: "fill", label: "Current Grade Weight (%)", value: "70" },
      { kind: "fill", label: "Final Exam Grade (%)", value: "90" },
      { kind: "fill", label: "Final Exam Weight (%)", value: "30" },
      { kind: "click", label: "Calculate Final Grade" },
    ],
    expect: { text: ["Final Grade", "86.50%"] },
  },
  {
    name: "Exam-heavy 60/40: 78% current + 95% exam → 84.80%",
    actions: [
      { kind: "fill", label: "Current Grade (%)", value: "78" },
      { kind: "fill", label: "Current Grade Weight (%)", value: "60" },
      { kind: "fill", label: "Final Exam Grade (%)", value: "95" },
      { kind: "fill", label: "Final Exam Weight (%)", value: "40" },
      { kind: "click", label: "Calculate Final Grade" },
    ],
    expect: { text: ["Final Grade", "84.80%"] },
  },
];
