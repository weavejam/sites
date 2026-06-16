import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "No criteria selected – score 0, Low Probability",
    actions: [
      { kind: "click", label: "Calculate Wells Score" },
    ],
    expect: { text: ["Low Probability", "0"] },
  },
  {
    name: "High probability: DVT signs + alternative diagnosis less likely + HR >100 = 7.5",
    actions: [
      { kind: "click", label: /Clinical signs and symptoms of DVT/ },
      { kind: "click", label: /Alternative diagnosis less likely than PE/ },
      { kind: "click", label: /Heart rate > 100/ },
      { kind: "click", label: "Calculate Wells Score" },
    ],
    expect: { text: ["High Probability"] },
  },
];
