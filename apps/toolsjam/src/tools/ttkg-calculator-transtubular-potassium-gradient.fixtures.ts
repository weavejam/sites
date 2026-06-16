import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal: urineK 25, plasmaK 4.0, urineOsm 600, plasmaOsm 290 → 3.02",
    actions: [
      { kind: "fill", label: "Urine Potassium (mEq/L)", value: "25" },
      { kind: "fill", label: "Plasma Potassium (mEq/L)", value: "4.0" },
      { kind: "fill", label: "Urine Osmolality (mOsm/kg)", value: "600" },
      { kind: "fill", label: "Plasma Osmolality (mOsm/kg)", value: "290" },
      { kind: "click", label: "Calculate TTKG" },
    ],
    expect: { text: ["Transtubular Potassium Gradient", "3.02"] },
  },
  {
    name: "Hyperkalemia response: urineK 80, plasmaK 5.8, urineOsm 650, plasmaOsm 290 → 6.15",
    actions: [
      { kind: "fill", label: "Urine Potassium (mEq/L)", value: "80" },
      { kind: "fill", label: "Plasma Potassium (mEq/L)", value: "5.8" },
      { kind: "fill", label: "Urine Osmolality (mOsm/kg)", value: "650" },
      { kind: "fill", label: "Plasma Osmolality (mOsm/kg)", value: "290" },
      { kind: "click", label: "Calculate TTKG" },
    ],
    expect: { text: ["Transtubular Potassium Gradient", "6.15"] },
  },
];
