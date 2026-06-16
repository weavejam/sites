import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk young adult",
    actions: [
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "75" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "68" },
      { kind: "fill", label: "Temperature (°C)", value: "36.6" },
      { kind: "fill", label: "Oxygen Saturation (%)", value: "98" },
      { kind: "fill", label: "Number of Medications", value: "1" },
      { kind: "click", label: "Calculate PISA Score" },
    ],
    expect: { text: ["PISA Assessment Results", "PISA Score:"] },
  },
  {
    name: "High risk elderly patient with polypharmacy",
    actions: [
      { kind: "fill", label: "Age (years)", value: "78" },
      { kind: "fill", label: "Weight (kg)", value: "65" },
      { kind: "fill", label: "Height (cm)", value: "160" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "140" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "85" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "72" },
      { kind: "fill", label: "Temperature (°C)", value: "36.8" },
      { kind: "fill", label: "Oxygen Saturation (%)", value: "96" },
      { kind: "fill", label: "Number of Medications", value: "8" },
      { kind: "click", label: "Calculate PISA Score" },
    ],
    expect: { text: ["PISA Assessment Results", "Risk Level:"] },
  },
];
