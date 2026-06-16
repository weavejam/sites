import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Child 18 kg liquid → 270 mg, 8.4 mL",
    actions: [
      { kind: "fill", label: "Weight", value: "18" },
      { kind: "click", label: "kg" },
      { kind: "click", label: "Liquid 160 mg/5 mL (children's)" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Recommended Dose", "270"] },
  },
  {
    name: "Adult 70 kg tablet 500 mg → 1000 mg, 2 tablets",
    actions: [
      { kind: "fill", label: "Weight", value: "70" },
      { kind: "click", label: "kg" },
      { kind: "click", label: "Tablet 500 mg (extra strength)" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Recommended Dose", "1,000"] },
  },
  {
    name: "Toddler 12 kg liquid → 180 mg",
    actions: [
      { kind: "fill", label: "Weight", value: "12" },
      { kind: "click", label: "kg" },
      { kind: "click", label: "Liquid 160 mg/5 mL (children's)" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Recommended Dose", "180"] },
  },
];
