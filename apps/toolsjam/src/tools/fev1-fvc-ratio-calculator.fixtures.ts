import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal lung function: 3.2 / 4.0 = 80%",
    actions: [
      { kind: "fill", label: "FEV1 (Forced Expiratory Volume in 1 second, L)", value: "3.2" },
      { kind: "fill", label: "FVC (Forced Vital Capacity, L)", value: "4.0" },
      { kind: "click", label: "Calculate FEV1/FVC Ratio" },
    ],
    expect: { text: ["0.800", "Normal"] },
  },
  {
    name: "Mild obstruction: 2.4 / 3.5 = 68.6%",
    actions: [
      { kind: "fill", label: "FEV1 (Forced Expiratory Volume in 1 second, L)", value: "2.4" },
      { kind: "fill", label: "FVC (Forced Vital Capacity, L)", value: "3.5" },
      { kind: "click", label: "Calculate FEV1/FVC Ratio" },
    ],
    expect: { text: ["0.686", "Mild"] },
  },
];
