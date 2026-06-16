import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk — RR 18, SBP 120, GCS 15",
    actions: [
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "18" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "fill", label: "Glasgow Coma Scale Score", value: "15" },
      { kind: "click", label: "Calculate QSOFA Score" },
    ],
    expect: { text: ["0", "Low Risk"] },
  },
  {
    name: "High risk — RR 28, SBP 85, GCS 12",
    actions: [
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "28" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "85" },
      { kind: "fill", label: "Glasgow Coma Scale Score", value: "12" },
      { kind: "click", label: "Calculate QSOFA Score" },
    ],
    expect: { text: ["3", "High Risk"] },
  },
];
