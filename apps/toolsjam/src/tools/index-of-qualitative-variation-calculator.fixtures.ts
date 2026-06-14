import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Four equal frequencies → IQV = 1.0000 (maximum variation)",
    actions: [
      { kind: "fill", label: "Category Frequencies", value: "25, 25, 25, 25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["IQV", "1"] },
  },
  {
    name: "Social science survey 48, 35, 12, 5 → IQV ≈ 0.755",
    actions: [
      { kind: "fill", label: "Category Frequencies", value: "48, 35, 12, 5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["IQV", "Total Observations (N)", "Number of Categories (K)"] },
  },
  {
    name: "Two categories 80, 20 → IQV = 0.64",
    actions: [
      { kind: "fill", label: "Category Frequencies", value: "80, 20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["IQV", "0.64"] },
  },
];
