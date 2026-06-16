import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Healthy male 175cm waist 85cm → RFM ~22.8%, Normal",
    actions: [
      { kind: "click", label: "Healthy Adult Male" },
    ],
    expect: { text: ["RFM Calculation Results", "Normal Body Fat"] },
  },
  {
    name: "Overweight female 160cm waist 95cm → RFM ~42.3%, High",
    actions: [
      { kind: "click", label: "Overweight Female" },
    ],
    expect: { text: ["RFM Calculation Results", "High Body Fat"] },
  },
  {
    name: "Athletic male 180cm waist 78cm → RFM ~17.9%, Normal",
    actions: [
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Waist Circumference (cm)", value: "78" },
      { kind: "click", label: "Healthy Adult Male" },
    ],
    expect: { text: ["RFM Calculation Results", "Normal Body Fat"] },
  },
];
