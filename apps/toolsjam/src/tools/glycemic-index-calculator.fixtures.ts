import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single food meal glycemic metrics",
    actions: [
      { kind: "fill", label: "Food Name", value: "Oatmeal" },
      { kind: "fill", label: "Glycemic Index", value: "55" },
      { kind: "fill", label: "Carbohydrate Content (g)", value: "27" },
      { kind: "fill", label: "Serving Size (g)", value: "234" },
      { kind: "fill", label: "Quantity (servings)", value: "1" },
      { kind: "click", label: "Calculate Meal GI & GL" },
    ],
    expect: { text: ["Meal Glycemic Results", "Average GI of Meal"] },
  },
  {
    name: "High GI meal classification",
    actions: [
      { kind: "fill", label: "Food Name", value: "White rice" },
      { kind: "fill", label: "Glycemic Index", value: "73" },
      { kind: "fill", label: "Carbohydrate Content (g)", value: "45" },
      { kind: "fill", label: "Serving Size (g)", value: "158" },
      { kind: "fill", label: "Quantity (servings)", value: "1" },
      { kind: "click", label: "Calculate Meal GI & GL" },
    ],
    expect: { text: ["Meal Glycemic Results", "High GI (70 or more)"] },
  },
];
