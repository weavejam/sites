import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk profile (score 0)",
    actions: [
      { kind: "fill", label: "PSA (ng/mL)", value: "3" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "14" },
      { kind: "fill", label: "LDH (U/L)", value: "150" },
      { kind: "fill", label: "Alkaline Phosphatase (U/L)", value: "90" },
      { kind: "click", label: "Calculate Prognosis" },
    ],
    expect: { text: ["Low Risk", "~26 months"] },
  },
  {
    name: "High risk profile (score 6+)",
    actions: [
      { kind: "fill", label: "PSA (ng/mL)", value: "45" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "11.5" },
      { kind: "fill", label: "LDH (U/L)", value: "210" },
      { kind: "fill", label: "Alkaline Phosphatase (U/L)", value: "130" },
      { kind: "click", label: "Calculate Prognosis" },
    ],
    expect: { text: ["High Risk", "~7 months"] },
  },
];
