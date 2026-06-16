import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Prerenal AKI: FEUrea <35%",
    actions: [
      { kind: "fill", label: "Urine Urea (mmol/L or mg/dL)", value: "200" },
      { kind: "fill", label: "Serum Urea / BUN (mmol/L or mg/dL)", value: "20" },
      { kind: "fill", label: "Urine Creatinine (µmol/L or mg/dL)", value: "120" },
      { kind: "fill", label: "Serum Creatinine (µmol/L or mg/dL)", value: "1.0" },
      { kind: "click", label: "Calculate FEUrea" },
    ],
    expect: { text: ["8.3", "Prerenal"] },
  },
  {
    name: "Intrinsic AKI: FEUrea >50%",
    actions: [
      { kind: "fill", label: "Urine Urea (mmol/L or mg/dL)", value: "80" },
      { kind: "fill", label: "Serum Urea / BUN (mmol/L or mg/dL)", value: "12" },
      { kind: "fill", label: "Urine Creatinine (µmol/L or mg/dL)", value: "30" },
      { kind: "fill", label: "Serum Creatinine (µmol/L or mg/dL)", value: "2.8" },
      { kind: "click", label: "Calculate FEUrea" },
    ],
    expect: { text: ["62.2", "Intrinsic"] },
  },
];
