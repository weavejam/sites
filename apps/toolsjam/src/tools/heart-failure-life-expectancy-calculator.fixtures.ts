import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild HF NYHA II good prognosis",
    actions: [
      { kind: "fill", label: "Age (years)", value: "60" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Ejection Fraction (%)", value: "55" },
      { kind: "click", label: "Class II – Mild symptoms" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "130" },
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "1.0" },
      { kind: "fill", label: "Serum Sodium (mEq/L)", value: "140" },
      { kind: "click", label: "Calculate Life Expectancy" },
    ],
    expect: { text: ["Prognosis Estimate"] },
  },
  {
    name: "Severe HF NYHA IV poor prognosis",
    actions: [
      { kind: "fill", label: "Age (years)", value: "75" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Ejection Fraction (%)", value: "20" },
      { kind: "click", label: "Class IV – Severe symptoms" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "90" },
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "2.0" },
      { kind: "fill", label: "Serum Sodium (mEq/L)", value: "130" },
      { kind: "click", label: "Calculate Life Expectancy" },
    ],
    expect: { text: ["Prognosis Estimate"] },
  },
];
