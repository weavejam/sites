import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard beer 330 mL 5% – male 70 kg 1.5 h",
    actions: [
      { kind: "fill", label: "Volume (mL)", value: "330" },
      { kind: "fill", label: "Alcohol Percentage (%)", value: "5" },
      { kind: "fill", label: "Body Weight (kg)", value: "70" },
      { kind: "fill", label: "Time Since Drinking (hours)", value: "1.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Drinks (US)", "Estimated BAC"] },
  },
  {
    name: "Wine 175 mL 12% – female 65 kg 2 h",
    actions: [
      { kind: "fill", label: "Volume (mL)", value: "175" },
      { kind: "fill", label: "Alcohol Percentage (%)", value: "12" },
      { kind: "fill", label: "Body Weight (kg)", value: "65" },
      { kind: "fill", label: "Time Since Drinking (hours)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Drinks (US)", "Calories from Alcohol"] },
  },
];
