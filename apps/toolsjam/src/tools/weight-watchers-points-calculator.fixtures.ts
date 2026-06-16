import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low-point meal: 180 cal, 1.5g fat, 8g sugar, 25g protein = 4 SP",
    actions: [
      { kind: "fill", label: "Calories", value: "180" },
      { kind: "fill", label: "Saturated Fat (g)", value: "1.5" },
      { kind: "fill", label: "Sugar (g)", value: "8" },
      { kind: "fill", label: "Protein (g)", value: "25" },
      { kind: "click", label: "Calculate Points" },
    ],
    expect: { text: ["Points Value", "4"] },
  },
  {
    name: "Medium-point meal: 350 cal, 4.2g fat, 15g sugar, 18g protein = 11 SP",
    actions: [
      { kind: "fill", label: "Calories", value: "350" },
      { kind: "fill", label: "Saturated Fat (g)", value: "4.2" },
      { kind: "fill", label: "Sugar (g)", value: "15" },
      { kind: "fill", label: "Protein (g)", value: "18" },
      { kind: "click", label: "Calculate Points" },
    ],
    expect: { text: ["Points Value", "11"] },
  },
];
