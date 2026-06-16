import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Young adult male 25y 175cm caucasian never-smoker",
    actions: [
      { kind: "fill", label: "Age (years)", value: "25" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Caucasian / White" },
      { kind: "click", label: "Never Smoker" },
      { kind: "click", label: "Calculate Peak Flow" },
    ],
    expect: { text: ["Predicted Peak Expiratory Flow", "L/min"] },
  },
  {
    name: "Middle-aged female 45y 165cm caucasian former smoker",
    actions: [
      { kind: "fill", label: "Age (years)", value: "45" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "click", label: "Female" },
      { kind: "click", label: "Caucasian / White" },
      { kind: "click", label: "Former Smoker" },
      { kind: "click", label: "Calculate Peak Flow" },
    ],
    expect: { text: ["Predicted Peak Expiratory Flow", "L/min"] },
  },
];
