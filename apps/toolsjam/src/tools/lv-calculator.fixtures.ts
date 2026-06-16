import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal LV function - LVEF ~68%",
    actions: [
      { kind: "fill", label: "LV End-Diastolic Diameter (LVEDD) (cm)", value: "5.2" },
      { kind: "fill", label: "LV End-Systolic Diameter (LVESD) (cm)", value: "3.1" },
      { kind: "fill", label: "LV Wall Thickness (cm)", value: "1.0" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "72" },
      { kind: "fill", label: "Body Surface Area (BSA) (m²)", value: "1.8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Left Ventricular Function Results", "L/min"] },
  },
  {
    name: "Reduced ejection fraction",
    actions: [
      { kind: "fill", label: "LV End-Diastolic Diameter (LVEDD) (cm)", value: "6.5" },
      { kind: "fill", label: "LV End-Systolic Diameter (LVESD) (cm)", value: "5.2" },
      { kind: "fill", label: "LV Wall Thickness (cm)", value: "1.1" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "85" },
      { kind: "fill", label: "Body Surface Area (BSA) (m²)", value: "1.7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Left Ventricular Function Results", "mL"] },
  },
];
