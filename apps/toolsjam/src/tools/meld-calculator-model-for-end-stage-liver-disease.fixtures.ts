import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Minimum MELD (all at floor)",
    actions: [
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "1.0" },
      { kind: "fill", label: "Total Bilirubin (mg/dL)", value: "1.0" },
      { kind: "fill", label: "INR (International Normalized Ratio)", value: "1.0" },
      { kind: "fill", label: "Serum Sodium (mEq/L)", value: "137" },
      { kind: "click", label: "Calculate MELD" },
    ],
    expect: { text: ["MELD Score", "Stable"] },
  },
  {
    name: "Moderate MELD with hyponatraemia",
    actions: [
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "1.5" },
      { kind: "fill", label: "Total Bilirubin (mg/dL)", value: "3.0" },
      { kind: "fill", label: "INR (International Normalized Ratio)", value: "1.8" },
      { kind: "fill", label: "Serum Sodium (mEq/L)", value: "132" },
      { kind: "click", label: "Calculate MELD" },
    ],
    expect: { text: ["MELD Score", "MELD-Na Score"] },
  },
];
