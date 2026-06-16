import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male 75kg, 1.5h casual, 4 days/week → calorie calculation",
    actions: [
      { kind: "fill", label: "Current Weight (kg)", value: "75" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "fill", label: "Age (years)", value: "30" },
      { kind: "fill", label: "Daily Gameplay Time (hours)", value: "1.5" },
      { kind: "fill", label: "Days per Week", value: "4" },
      { kind: "click", label: "Calculate Weight Loss" },
    ],
    expect: { text: ["Pokemon Go Fitness Results", "Calories Per Session:"] },
  },
  {
    name: "Female 68kg, 3.5h moderate, 6 days/week with target",
    actions: [
      { kind: "fill", label: "Current Weight (kg)", value: "68" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "fill", label: "Age (years)", value: "25" },
      { kind: "fill", label: "Daily Gameplay Time (hours)", value: "3.5" },
      { kind: "fill", label: "Days per Week", value: "6" },
      { kind: "fill", label: "Target Weight (kg) — Optional", value: "62" },
      { kind: "click", label: "Calculate Weight Loss" },
    ],
    expect: { text: ["Pokemon Go Fitness Results", "Weeks to Reach Goal:"] },
  },
];
