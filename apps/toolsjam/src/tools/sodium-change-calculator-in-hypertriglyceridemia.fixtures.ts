import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild hypertriglyceridemia: Na 135, TG 450 → corrected 135.90",
    actions: [
      {
        kind: "fill",
        label: "Measured Sodium (Na⁺) (mmol/L)",
        value: "135",
      },
      {
        kind: "fill",
        label: "Triglycerides (mg/dL)",
        value: "450",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Result", "Corrected Na⁺", "135.90"],
    },
  },
  {
    name: "Severe hypertriglyceridemia: Na 125, TG 1200 → corrected 127.40",
    actions: [
      {
        kind: "fill",
        label: "Measured Sodium (Na⁺) (mmol/L)",
        value: "125",
      },
      {
        kind: "fill",
        label: "Triglycerides (mg/dL)",
        value: "1200",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Result", "Corrected Na⁺", "127.40"],
    },
  },
];
