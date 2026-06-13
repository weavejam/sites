import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Student grades weighted mean → 90.25",
    actions: [
      { kind: "fill", label: "Data Values", value: "85, 95, 89, 92" },
      { kind: "fill", label: "Weights", value: "0.2, 0.3, 0.15, 0.35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Weighted Mean"] },
  },
  {
    name: "Equal weights is simple mean",
    actions: [
      { kind: "fill", label: "Data Values", value: "10, 20, 30, 40" },
      { kind: "fill", label: "Weights", value: "1, 1, 1, 1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25"] },
  },
];
