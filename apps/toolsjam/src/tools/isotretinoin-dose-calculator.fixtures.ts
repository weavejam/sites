import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "70 kg patient, 0.5 mg/kg/day, cumulative 140 mg/kg",
    actions: [
      { kind: "fill", label: "Body Weight", value: "70" },
      { kind: "click", label: "Kilograms (kg)" },
      { kind: "fill", label: "Daily Dose (mg/kg/day)", value: "0.5" },
      { kind: "fill", label: "Cumulative Target Dose (mg/kg)", value: "140" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Isotretinoin Dosing Plan", "Daily Dose", "Cumulative Total Dose"] },
  },
  {
    name: "60 kg patient, custom 40 mg/day, cumulative 120 mg/kg",
    actions: [
      { kind: "fill", label: "Body Weight", value: "60" },
      { kind: "click", label: "Kilograms (kg)" },
      { kind: "fill", label: "Daily Dose (mg/kg/day)", value: "0.5" },
      { kind: "fill", label: "Cumulative Target Dose (mg/kg)", value: "120" },
      { kind: "fill", label: "Custom Daily Dose (mg, optional — overrides mg/kg calculation)", value: "40" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Isotretinoin Dosing Plan", "Estimated Duration (days)"] },
  },
  {
    name: "154 lbs patient, 1 mg/kg/day, cumulative 150 mg/kg",
    actions: [
      { kind: "fill", label: "Body Weight", value: "154" },
      { kind: "click", label: "Pounds (lbs)" },
      { kind: "fill", label: "Daily Dose (mg/kg/day)", value: "1.0" },
      { kind: "fill", label: "Cumulative Target Dose (mg/kg)", value: "150" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Isotretinoin Dosing Plan", "Estimated Duration (months)"] },
  },
];
