import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal VBG — pH 7.35",
    actions: [
      { kind: "fill", label: "pH Value", value: "7.35" },
      { kind: "fill", label: "HCO₃⁻ Bicarbonate (mEq/L)", value: "24" },
      { kind: "fill", label: "PCO₂ (mmHg)", value: "45" },
      { kind: "fill", label: "Base Excess (mEq/L)", value: "0" },
      { kind: "fill", label: "Temperature (°C)", value: "37" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Normal"] },
  },
  {
    name: "Metabolic acidosis — pH 7.20",
    actions: [
      { kind: "fill", label: "pH Value", value: "7.20" },
      { kind: "fill", label: "HCO₃⁻ Bicarbonate (mEq/L)", value: "12" },
      { kind: "fill", label: "PCO₂ (mmHg)", value: "35" },
      { kind: "fill", label: "Base Excess (mEq/L)", value: "-15" },
      { kind: "fill", label: "Temperature (°C)", value: "37" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Metabolic acidosis"] },
  },
];
