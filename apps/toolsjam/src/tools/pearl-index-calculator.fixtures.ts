import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Healthy adult male — excellent score",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Weight (kg)", value: "75" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "80" },
      { kind: "fill", label: "Resting Heart Rate (bpm)", value: "72" },
      { kind: "fill", label: "Fasting Blood Sugar (mg/dL)", value: "95" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "180" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "55" },
      { kind: "click", label: "Non-Smoker" },
      { kind: "click", label: "Moderate (3–4 days/week)" },
      { kind: "click", label: "No family history" },
      { kind: "click", label: "Calculate Pearl Index" },
    ],
    expect: { text: ["Pearl Index Result", "/ 100"] },
  },
  {
    name: "High-risk male — low score",
    actions: [
      { kind: "fill", label: "Age (years)", value: "60" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Weight (kg)", value: "95" },
      { kind: "fill", label: "Height (cm)", value: "170" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "160" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "100" },
      { kind: "fill", label: "Resting Heart Rate (bpm)", value: "95" },
      { kind: "fill", label: "Fasting Blood Sugar (mg/dL)", value: "130" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "250" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "35" },
      { kind: "click", label: "Current Smoker" },
      { kind: "click", label: "Low (≤ 2 days/week or sedentary)" },
      { kind: "click", label: "Family history present" },
      { kind: "click", label: "Calculate Pearl Index" },
    ],
    expect: { text: ["Pearl Index Result", "/ 100"] },
  },
];
