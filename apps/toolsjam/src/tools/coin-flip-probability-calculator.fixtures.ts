import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Exactly 5 heads in 10 flips ≈ 24.61%",
    actions: [
      { kind: "fill", label: "Number of Flips", value: "10" },
      { kind: "fill", label: "Number of Heads", value: "5" },
      { kind: "click", label: "Exactly" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Probability", "%"] },
  },
  {
    name: "At least 7 heads in 10 flips ≈ 17.19%",
    actions: [
      { kind: "fill", label: "Number of Flips", value: "10" },
      { kind: "fill", label: "Number of Heads", value: "7" },
      { kind: "click", label: "At Least" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Probability", "%"] },
  },
];
