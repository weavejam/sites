import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Chronic mild hyponatremia: Na 130→135, M 70 kg → 0.5 mEq/L/hr",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "130",
      },
      {
        kind: "fill",
        label: "Target Sodium Level (mEq/L)",
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
      text: ["Results", "Recommended Correction Rate", "0.5"],
    },
  },
  {
    name: "Acute severe hyponatremia: Na 115→125, F 65 kg → 2.0 mEq/L/hr",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "115",
      },
      {
        kind: "fill",
        label: "Target Sodium Level (mEq/L)",
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
      text: ["Results", "Recommended Correction Rate"],
    },
  },
];
