import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk profile – healthy young female",
    actions: [
      { kind: "click", label: "Load Low Risk Profile" },
    ],
    expect: { text: ["Low Diet Risk"] },
  },
  {
    name: "High risk profile – obese male with multiple risk factors",
    actions: [
      { kind: "click", label: "Load High Risk Profile" },
    ],
    expect: { text: ["High Diet Risk"] },
  },
  {
    name: "Manual entry – overweight male, current smoker → High or Very High",
    actions: [
      { kind: "fill", label: "Age (years)", value: "58" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "BMI (kg/m²)", value: "33" },
      { kind: "fill", label: "Waist Circumference (cm)", value: "108" },
      { kind: "fill", label: "Daily Fruits & Vegetables (servings/day)", value: "2" },
      { kind: "fill", label: "Processed Foods (servings/week)", value: "18" },
      { kind: "fill", label: "Added Sugar (grams/day)", value: "55" },
      { kind: "fill", label: "Fiber Intake (grams/day)", value: "10" },
      { kind: "fill", label: "Water Intake (litres/day)", value: "1.1" },
      { kind: "fill", label: "Physical Activity (hours/week)", value: "0" },
      { kind: "click", label: "Current" },
      { kind: "fill", label: "Alcohol Consumption (drinks/week)", value: "9" },
      { kind: "click", label: "Has Diabetes" },
      { kind: "click", label: "Calculate Risk Score" },
    ],
    expect: { text: ["Diet Risk"] },
  },
];
