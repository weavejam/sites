import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male 28y 75kg 178cm – below-average weight",
    actions: [
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "fill", label: "Weight", value: "75" },
      { kind: "fill", label: "Height", value: "178" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Weight Percentile", "BMI"] },
  },
  {
    name: "Male 35y 95kg 175cm – overweight/obese",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "fill", label: "Weight", value: "95" },
      { kind: "fill", label: "Height", value: "175" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Weight Percentile", "Obese"] },
  },
];
