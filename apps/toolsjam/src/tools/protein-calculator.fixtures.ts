import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Calculates protein for 70 kg adult with defaults (sedentary, maintenance)",
    actions: [
      { kind: "fill", label: "Body Weight", value: "70" },
      { kind: "fill", label: "Age", value: "35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Daily Protein Requirement", "g / day"] },
  },
  {
    name: "Calculates protein for 80 kg adult with body fat provided",
    actions: [
      { kind: "fill", label: "Body Weight", value: "80" },
      { kind: "fill", label: "Age", value: "28" },
      { kind: "fill", label: "Body Fat % (Optional)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Daily Protein Requirement", "g / day"] },
  },
];
