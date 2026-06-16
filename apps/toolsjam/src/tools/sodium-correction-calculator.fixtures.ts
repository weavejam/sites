import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild hyponatremia: Na 130→135, male 70 kg, conservative, NS",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "130",
      },
      {
        kind: "fill",
        label: "Desired Sodium Level (mEq/L)",
        value: "135",
      },
      {
        kind: "fill",
        label: "Patient Weight (kg)",
        value: "70",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Total Body Water (TBW)", "Sodium Deficit"],
    },
  },
  {
    name: "Severe hyponatremia: Na 115→125, female 65 kg, moderate, 3% NaCl",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "115",
      },
      {
        kind: "fill",
        label: "Desired Sodium Level (mEq/L)",
        value: "125",
      },
      {
        kind: "fill",
        label: "Patient Weight (kg)",
        value: "65",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Infusion Volume", "Infusion Rate"],
    },
  },
];
