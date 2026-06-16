import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male, moderate activity, muscle gain, balanced diet",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "80" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Age", value: "25" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Moderate (moderate exercise 3–5 days/week)" },
      { kind: "click", label: "Muscle Gain" },
      { kind: "click", label: "Balanced" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Daily Macro Targets", "kcal/day", "g/day"] },
  },
  {
    name: "Female, sedentary, weight loss, low carb",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "fill", label: "Age", value: "30" },
      { kind: "click", label: "Female" },
      { kind: "click", label: "Sedentary (desk job, little or no exercise)" },
      { kind: "click", label: "Weight Loss" },
      { kind: "click", label: "Low Carb" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Daily Macro Targets", "kcal/day"] },
  },
];
