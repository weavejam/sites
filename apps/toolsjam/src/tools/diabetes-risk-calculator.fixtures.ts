import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk profile – young healthy adult → Low Risk",
    actions: [
      { kind: "click", label: "Load Low Risk Profile" },
    ],
    expect: { text: ["Low Risk", "< 5%"] },
  },
  {
    name: "High risk profile – older adult with multiple risk factors → High Risk",
    actions: [
      { kind: "click", label: "Load High Risk Profile" },
    ],
    expect: { text: ["High Risk", "16–30%"] },
  },
  {
    name: "Manual entry: age 55, BMI 31, sedentary, family history → Moderate Risk",
    actions: [
      { kind: "fill", label: "Age (years)", value: "55" },
      { kind: "fill", label: "BMI (kg/m²)", value: "31" },
      { kind: "click", label: "Yes" },
      { kind: "click", label: "Sedentary" },
      { kind: "click", label: "White" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["Moderate Risk"] },
  },
];
