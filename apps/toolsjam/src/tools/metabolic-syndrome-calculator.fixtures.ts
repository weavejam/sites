import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male with all 5 criteria met",
    actions: [
      { kind: "fill", label: "Waist Circumference (cm)", value: "108" },
      { kind: "fill", label: "Triglycerides (mg/dL)", value: "180" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "35" },
      { kind: "fill", label: "Systolic", value: "135" },
      { kind: "fill", label: "Diastolic", value: "88" },
      { kind: "fill", label: "Fasting Glucose (mg/dL)", value: "105" },
      { kind: "click", label: "Assess Risk" },
    ],
    expect: { text: ["Metabolic Syndrome Diagnosed", "5 of 5 criteria met"] },
  },
  {
    name: "Female with no criteria met",
    actions: [
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Waist Circumference (cm)", value: "80" },
      { kind: "fill", label: "Triglycerides (mg/dL)", value: "120" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "55" },
      { kind: "fill", label: "Systolic", value: "118" },
      { kind: "fill", label: "Diastolic", value: "74" },
      { kind: "fill", label: "Fasting Glucose (mg/dL)", value: "90" },
      { kind: "click", label: "Assess Risk" },
    ],
    expect: { text: ["Not Diagnosed", "0 of 5 criteria met"] },
  },
];
