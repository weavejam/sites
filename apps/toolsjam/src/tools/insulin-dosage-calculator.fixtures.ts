import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Morning meal with BG correction – total 4.2 units",
    actions: [
      { kind: "fill", label: "Current Blood Glucose (mg/dL)", value: "180" },
      { kind: "fill", label: "Target Blood Glucose (mg/dL)", value: "120" },
      { kind: "fill", label: "Carbohydrate Content (grams)", value: "45" },
      { kind: "fill", label: "Insulin-to-Carb Ratio (ICR) — grams of carbs per 1 unit", value: "15" },
      { kind: "fill", label: "Insulin Sensitivity Factor (ISF) — mg/dL drop per 1 unit", value: "50" },
      { kind: "fill", label: "Insulin On Board (IOB) — units already active", value: "0" },
      { kind: "click", label: "Calculate Insulin Dose" },
    ],
    expect: { text: ["Insulin Dose Recommendation", "Total Recommended Dose"] },
  },
  {
    name: "Meal dose only – BG at target, 60g carbs",
    actions: [
      { kind: "fill", label: "Current Blood Glucose (mg/dL)", value: "120" },
      { kind: "fill", label: "Target Blood Glucose (mg/dL)", value: "120" },
      { kind: "fill", label: "Carbohydrate Content (grams)", value: "60" },
      { kind: "fill", label: "Insulin-to-Carb Ratio (ICR) — grams of carbs per 1 unit", value: "15" },
      { kind: "fill", label: "Insulin Sensitivity Factor (ISF) — mg/dL drop per 1 unit", value: "50" },
      { kind: "fill", label: "Insulin On Board (IOB) — units already active", value: "0" },
      { kind: "click", label: "Calculate Insulin Dose" },
    ],
    expect: { text: ["Insulin Dose Recommendation", "Meal Insulin"] },
  },
  {
    name: "Correction dose only – high BG, no carbs",
    actions: [
      { kind: "fill", label: "Current Blood Glucose (mg/dL)", value: "220" },
      { kind: "fill", label: "Target Blood Glucose (mg/dL)", value: "120" },
      { kind: "fill", label: "Carbohydrate Content (grams)", value: "0" },
      { kind: "fill", label: "Insulin-to-Carb Ratio (ICR) — grams of carbs per 1 unit", value: "15" },
      { kind: "fill", label: "Insulin Sensitivity Factor (ISF) — mg/dL drop per 1 unit", value: "50" },
      { kind: "fill", label: "Insulin On Board (IOB) — units already active", value: "0" },
      { kind: "click", label: "Calculate Insulin Dose" },
    ],
    expect: { text: ["Insulin Dose Recommendation", "Correction Insulin"] },
  },
];
