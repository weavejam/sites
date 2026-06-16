import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Muscle building macro split",
    actions: [
      { kind: "fill", label: "Calories", value: "2600" },
      { kind: "fill", label: "Protein (%)", value: "30" },
      { kind: "fill", label: "Carbs (%)", value: "40" },
      { kind: "fill", label: "Fat (%)", value: "30" },
      { kind: "fill", label: "Protein target (g/kg, optional)", value: "2" },
      { kind: "fill", label: "Weight (kg, optional)", value: "75" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "195", "150"] }
  },
  {
    name: "Weight loss macro split",
    actions: [
      { kind: "fill", label: "Calories", value: "1700" },
      { kind: "fill", label: "Protein (%)", value: "35" },
      { kind: "fill", label: "Carbs (%)", value: "30" },
      { kind: "fill", label: "Fat (%)", value: "35" },
      { kind: "fill", label: "Protein target (g/kg, optional)", value: "1.8" },
      { kind: "fill", label: "Weight (kg, optional)", value: "68" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "148.8", "122.4"] }
  }
];
