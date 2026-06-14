import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Dice roll: E[X] = 3.5",
    actions: [
      { kind: "click", label: "Load: Dice Roll" },
      { kind: "click", label: "Calculate Expected Value" },
    ],
    expect: { text: ["Expected Value Results", "Expected Value E[X]"] },
  },
  {
    name: "Investment portfolio expected return",
    actions: [
      { kind: "click", label: "Load: Investment" },
      { kind: "click", label: "Calculate Expected Value" },
    ],
    expect: { text: ["Expected Value Results", "Variance Var(X)"] },
  },
];
