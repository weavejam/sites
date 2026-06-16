import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Female, sedentary, 30 yrs, 65 kg, 165 cm",
    actions: [
      { kind: "fill", label: "Age", value: "30" },
      { kind: "fill", label: "Weight (kg)", value: "65" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "click", label: "Female" },
      { kind: "click", label: "Sedentary (desk job, little or no exercise)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Daily Maintenance Calories", "kcal/day"] },
  },
  {
    name: "Male, moderate activity, 25 yrs, 80 kg, 180 cm",
    actions: [
      { kind: "fill", label: "Age", value: "25" },
      { kind: "fill", label: "Weight (kg)", value: "80" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Moderate (moderate exercise 3–5 days/week)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Daily Maintenance Calories", "kcal/day"] },
  },
];
