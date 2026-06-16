import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low-risk male (35 y, healthy) → 1%",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "180" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "55" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "120" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["1%", "Low Risk"] },
  },
  {
    name: "High-risk male (60 y, multiple risk factors) → ≥30%",
    actions: [
      { kind: "fill", label: "Age (years)", value: "60" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "280" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "35" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "160" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["High Risk"] },
  },
];
