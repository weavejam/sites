import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal kidney function: protein 80, creatinine 120 → PCR 0.67",
    actions: [
      { kind: "fill", label: "Urine Protein (mg/dL)", value: "80" },
      { kind: "fill", label: "Urine Creatinine (mg/dL)", value: "120" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PCR Result", "PCR = 0.67"] },
  },
  {
    name: "Moderate proteinuria: protein 500, creatinine 80 → PCR 6.25",
    actions: [
      { kind: "fill", label: "Urine Protein (mg/dL)", value: "500" },
      { kind: "fill", label: "Urine Creatinine (mg/dL)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PCR Result", "PCR = 6.25"] },
  },
];
