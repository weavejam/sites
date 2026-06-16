import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild DKA – elevated AG and reduced HCO3",
    actions: [
      { kind: "click", label: "Load Mild DKA" },
    ],
    expect: { text: ["Mild DKA", "Anion Gap"] },
  },
  {
    name: "Severe DKA – critical values",
    actions: [
      { kind: "click", label: "Load Severe DKA" },
    ],
    expect: { text: ["Severe DKA"] },
  },
  {
    name: "Manual entry – moderate DKA",
    actions: [
      { kind: "fill", label: "Sodium (Na⁺) mEq/L", value: "136" },
      { kind: "fill", label: "Potassium (K⁺) mEq/L", value: "4.5" },
      { kind: "fill", label: "Chloride (Cl⁻) mEq/L", value: "96" },
      { kind: "fill", label: "Bicarbonate (HCO₃⁻) mEq/L", value: "13" },
      { kind: "fill", label: "Glucose (mg/dL)", value: "480" },
      { kind: "fill", label: "BUN (mg/dL)", value: "22" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Moderate DKA"] },
  },
];
