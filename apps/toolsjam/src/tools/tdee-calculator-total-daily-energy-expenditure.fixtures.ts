import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Female 28yo 60kg 165cm moderate activity – maintain",
    actions: [
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "fill", label: "Weight (kg)", value: "60" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Maintenance Calories (TDEE)", "Basal Metabolic Rate (BMR)"] },
  },
  {
    name: "Male 35yo 85kg 180cm very active",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "fill", label: "Weight (kg)", value: "85" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Maintenance Calories (TDEE)", "Mifflin-St Jeor"] },
  },
];
