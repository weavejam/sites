import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal osmolality: Na 140, Glucose 100, BUN 15 → ~285.9 mOsm/kg",
    actions: [
      { kind: "fill", label: "Sodium (Na+) — mmol/L", value: "140" },
      { kind: "fill", label: "Glucose — mg/dL", value: "100" },
      { kind: "fill", label: "Blood Urea Nitrogen (BUN) — mg/dL", value: "15" },
      { kind: "click", label: "Calculate Osmolality" },
    ],
    expect: { text: ["Plasma Osmolality Result", "290.9 mOsm/kg"] },
  },
  {
    name: "Hypernatremia: Na 155, Glucose 95, BUN 25 → high osmolality",
    actions: [
      { kind: "fill", label: "Sodium (Na+) — mmol/L", value: "155" },
      { kind: "fill", label: "Glucose — mg/dL", value: "95" },
      { kind: "fill", label: "Blood Urea Nitrogen (BUN) — mg/dL", value: "25" },
      { kind: "click", label: "Calculate Osmolality" },
    ],
    expect: { text: ["Plasma Osmolality Result", "mOsm/kg"] },
  },
];
