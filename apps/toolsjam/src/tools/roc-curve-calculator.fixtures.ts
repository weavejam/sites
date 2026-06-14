import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Good classifier AUC ~0.83",
    actions: [
      {
        kind: "fill",
        label: "Data (Score, Label)",
        value: "0.9,1\n0.8,1\n0.75,1\n0.6,0\n0.55,1\n0.45,0\n0.4,0\n0.35,0",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["AUC"] },
  },
  {
    name: "Random classifier AUC ~0.5",
    actions: [
      {
        kind: "fill",
        label: "Data (Score, Label)",
        value: "0.9,0\n0.8,1\n0.7,0\n0.6,1\n0.5,0\n0.4,1",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["AUC"] },
  },
];
