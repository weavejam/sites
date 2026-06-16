import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "6-month-old male 43.5 cm → normal percentile",
    actions: [
      { kind: "fill", label: "Age (months)", value: "6" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Head Circumference", value: "43.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Percentile Result"] },
  },
  {
    name: "12-month-old female 44.5 cm → result shown",
    actions: [
      { kind: "fill", label: "Age (months)", value: "12" },
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Head Circumference", value: "44.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Percentile Result"] },
  },
];
