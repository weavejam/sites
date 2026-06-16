import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Optimal profile: Total 180, HDL 65 → Total/HDL 2.77",
    actions: [
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "180" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "65" },
      { kind: "fill", label: "LDL Cholesterol (mg/dL, optional)", value: "95" },
      { kind: "click", label: "Calculate Ratios" },
    ],
    expect: { text: ["Cholesterol Ratio Results", "2.77", "Optimal"] },
  },
  {
    name: "High-risk profile: Total 280, HDL 35 → Total/HDL 8.00",
    actions: [
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "280" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "35" },
      { kind: "fill", label: "LDL Cholesterol (mg/dL, optional)", value: "190" },
      { kind: "click", label: "Calculate Ratios" },
    ],
    expect: { text: ["Cholesterol Ratio Results", "8.00", "High Risk"] },
  },
  {
    name: "Borderline: Total 240, HDL 45 → Total/HDL 5.33",
    actions: [
      { kind: "fill", label: "Total Cholesterol (mg/dL)", value: "240" },
      { kind: "fill", label: "HDL Cholesterol (mg/dL)", value: "45" },
      { kind: "click", label: "Calculate Ratios" },
    ],
    expect: { text: ["5.33", "High Risk"] },
  },
];
