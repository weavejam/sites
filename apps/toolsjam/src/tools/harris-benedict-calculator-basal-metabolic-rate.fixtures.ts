import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sedentary male 75 kg 180 cm 35 y — BMR ~1758, TDEE ~2110",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "75" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Sedentary (little or no exercise)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Results", "1,758", "2,110"] },
  },
  {
    name: "Very active female 60 kg 165 cm 25 y — BMR ~1405, TDEE ~2424",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "60" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "fill", label: "Age (years)", value: "25" },
      { kind: "click", label: "Female" },
      { kind: "click", label: "Very Active (hard exercise 6–7 days/week)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Results", "1,405", "2,424"] },
  },
  {
    name: "Moderately active male 70 kg 170 cm 40 y — BMR ~1615",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Height (cm)", value: "170" },
      { kind: "fill", label: "Age (years)", value: "40" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Moderately Active (moderate exercise 3–5 days/week)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Results", "1,615"] },
  },
];
