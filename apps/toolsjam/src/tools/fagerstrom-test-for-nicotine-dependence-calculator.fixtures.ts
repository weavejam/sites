import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Very Low Dependence — score 1",
    actions: [
      { kind: "click", label: "Load very low example" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["1 / 10", "Very Low Dependence"] },
  },
  {
    name: "High Dependence — score 10",
    actions: [
      { kind: "click", label: "Load high example" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["10 / 10", "High Dependence"] },
  },
];
