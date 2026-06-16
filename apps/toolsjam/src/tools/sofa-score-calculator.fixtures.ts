import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild organ dysfunction → SOFA 4",
    actions: [
      { kind: "fill", label: "PaO2/FiO2 Ratio", value: "350" },
      { kind: "fill", label: "Platelet Count (×10³/μL)", value: "120" },
      { kind: "fill", label: "Bilirubin (mg/dL)", value: "1.5" },
      { kind: "fill", label: "Mean Arterial Pressure (mmHg)", value: "75" },
      { kind: "fill", label: "Creatinine (mg/dL)", value: "1.3" },
      { kind: "fill", label: "Urine Output (mL/24h)", value: "600" },
      { kind: "fill", label: "Glasgow Coma Scale", value: "14" },
      { kind: "click", label: "Calculate SOFA Score" },
    ],
    expect: { text: ["4", "out of 24"] },
  },
  {
    name: "Severe organ failure → high score",
    actions: [
      { kind: "fill", label: "PaO2/FiO2 Ratio", value: "120" },
      { kind: "fill", label: "Platelet Count (×10³/μL)", value: "30" },
      { kind: "fill", label: "Bilirubin (mg/dL)", value: "8" },
      { kind: "fill", label: "Mean Arterial Pressure (mmHg)", value: "55" },
      { kind: "fill", label: "Creatinine (mg/dL)", value: "4.5" },
      { kind: "fill", label: "Urine Output (mL/24h)", value: "200" },
      { kind: "fill", label: "Glasgow Coma Scale", value: "8" },
      { kind: "click", label: "Calculate SOFA Score" },
    ],
    expect: { text: ["out of 24", "mortality"] },
  },
];
