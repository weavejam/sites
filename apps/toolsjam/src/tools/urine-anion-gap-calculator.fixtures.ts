import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Diarrhea (negative UAG): Na 20, K 15, Cl 80 → −45 mEq/L",
    actions: [
      { kind: "fill", label: "Urine Sodium (Na+) mEq/L", value: "20" },
      { kind: "fill", label: "Urine Potassium (K+) mEq/L", value: "15" },
      { kind: "fill", label: "Urine Chloride (Cl−) mEq/L", value: "80" },
      { kind: "click", label: "Calculate Urine Anion Gap" },
    ],
    expect: { text: ["Urine Anion Gap", "-45"] },
  },
  {
    name: "RTA type 1 (positive UAG): Na 50, K 20, Cl 30 → +40 mEq/L",
    actions: [
      { kind: "fill", label: "Urine Sodium (Na+) mEq/L", value: "50" },
      { kind: "fill", label: "Urine Potassium (K+) mEq/L", value: "20" },
      { kind: "fill", label: "Urine Chloride (Cl−) mEq/L", value: "30" },
      { kind: "click", label: "Calculate Urine Anion Gap" },
    ],
    expect: { text: ["Urine Anion Gap", "+40"] },
  },
];
