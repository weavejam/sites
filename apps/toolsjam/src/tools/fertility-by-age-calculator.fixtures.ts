import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Age 26 peak fertility",
    actions: [
      { kind: "fill", label: "Age (years)", value: "26" },
      { kind: "fill", label: "Time Trying to Conceive (months)", value: "3" },
      { kind: "fill", label: "Previous Pregnancies", value: "1" },
      { kind: "fill", label: "Average Menstrual Cycle Length (days)", value: "28" },
      { kind: "fill", label: "Lifestyle Factor Score (1–10)", value: "8" },
      { kind: "click", label: "Calculate Fertility" },
    ],
    expect: { text: ["Peak Fertility"] },
  },
  {
    name: "Age 38 declining fertility",
    actions: [
      { kind: "click", label: "Load age 38 example" },
      { kind: "click", label: "Calculate Fertility" },
    ],
    expect: { text: ["Declining Fertility"] },
  },
];
