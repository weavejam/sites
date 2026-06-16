import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild hyponatremia: Na 130→140, male 70 kg, 20% BF",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "130",
      },
      {
        kind: "fill",
        label: "Desired Sodium Level (mEq/L)",
        value: "140",
      },
      {
        kind: "fill",
        label: "Patient Weight (kg)",
        value: "70",
      },
      {
        kind: "fill",
        label: "Body Fat Percentage (%)",
        value: "20",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Sodium Deficit", "NaCl Equivalent"],
    },
  },
  {
    name: "Severe hyponatremia: Na 115→135, female 65 kg, 25% BF",
    actions: [
      {
        kind: "fill",
        label: "Current Sodium Level (mEq/L)",
        value: "115",
      },
      {
        kind: "fill",
        label: "Desired Sodium Level (mEq/L)",
        value: "135",
      },
      {
        kind: "fill",
        label: "Patient Weight (kg)",
        value: "65",
      },
      {
        kind: "fill",
        label: "Body Fat Percentage (%)",
        value: "25",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Total Body Water", "Lean Body Mass"],
    },
  },
];
