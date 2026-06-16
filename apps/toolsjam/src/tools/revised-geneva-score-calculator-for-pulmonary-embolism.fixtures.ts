import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "All No → score 0, Low Probability via example button",
    actions: [
      { kind: "click", label: "Low Probability Case" },
    ],
    expect: { text: ["Revised Geneva Score Results", "Low Probability"] },
  },
  {
    name: "Multiple positive criteria → High Probability via example button",
    actions: [
      { kind: "click", label: "High Probability Case" },
    ],
    expect: { text: ["Revised Geneva Score Results", "High Probability"] },
  },
];
