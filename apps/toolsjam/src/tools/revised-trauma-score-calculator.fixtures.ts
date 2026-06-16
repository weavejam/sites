import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "GCS 15, SBP 120, RR 16 → T-RTS 12, Minor Trauma",
    actions: [
      { kind: "fill", label: "Glasgow Coma Scale (GCS)", value: "15" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "16" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Revised Trauma Score Results", "12", "Minor Trauma"] },
  },
  {
    name: "GCS 11, SBP 80, RR 22 → T-RTS 10, Moderate Trauma",
    actions: [
      { kind: "fill", label: "Glasgow Coma Scale (GCS)", value: "11" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "80" },
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "22" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Revised Trauma Score Results", "10", "Moderate Trauma"] },
  },
  {
    name: "GCS 3, SBP 40, RR 5 → T-RTS 2, Critical Trauma",
    actions: [
      { kind: "fill", label: "Glasgow Coma Scale (GCS)", value: "3" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "40" },
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Revised Trauma Score Results", "2", "Critical Trauma"] },
  },
];
