import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk young female profile",
    actions: [
      { kind: "fill", label: "Age (years)", value: "30" },
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "80" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "180" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "60" },
      { kind: "fill", label: "LDL Cholesterol (mg/dL)", value: "100" },
      { kind: "fill", label: "Body Mass Index (BMI)", value: "22" },
      { kind: "click", label: "Calculate Heart Score" },
    ],
    expect: { text: ["Cardiovascular Risk Assessment"] },
  },
  {
    name: "High risk older male profile with multiple risk factors",
    actions: [
      { kind: "fill", label: "Age (years)", value: "65" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "160" },
      { kind: "fill", label: "Diastolic Blood Pressure (mmHg)", value: "100" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "250" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "35" },
      { kind: "fill", label: "LDL Cholesterol (mg/dL)", value: "180" },
      { kind: "fill", label: "Body Mass Index (BMI)", value: "32" },
      { kind: "click", label: "Calculate Heart Score" },
    ],
    expect: { text: ["Cardiovascular Risk Assessment"] },
  },
];
