import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic GFR estimate with required fields",
    actions: [
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "1.0" },
      { kind: "fill", label: "Age (years)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GFR Results", "CKD-EPI (2021)"] },
  },
  {
    name: "GFR with optional weight for Cockcroft-Gault",
    actions: [
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "1.5" },
      { kind: "fill", label: "Age (years)", value: "65" },
      { kind: "fill", label: "Weight (kg, optional)", value: "70" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GFR Results", "Kidney function stage"] },
  },
];
