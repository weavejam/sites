import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Expected tosses for 3 consecutive heads = 14",
    actions: [
      { kind: "fill", label: "Streak Length", value: "3" },
      { kind: "click", label: "Heads Only" },
      { kind: "click", label: "Expected Number of Tosses" },
      { kind: "click", label: "Calculate Streak" },
    ],
    expect: { text: ["Result", "tosses"] },
  },
  {
    name: "Probability of 3-head streak in 20 tosses",
    actions: [
      { kind: "fill", label: "Streak Length", value: "3" },
      { kind: "fill", label: "Maximum Tosses (Optional)", value: "20" },
      { kind: "click", label: "Heads Only" },
      { kind: "click", label: "Exact Probability" },
      { kind: "click", label: "Calculate Streak" },
    ],
    expect: { text: ["Result", "%"] },
  },
];
