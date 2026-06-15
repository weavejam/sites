import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Default (Level 5, 4 players, Medium, env 1.0) → 2,000 XP",
    actions: [
      { kind: "fill", label: "Environment Factor", value: "1.0" },
      { kind: "click", label: "Calculate Encounter" },
    ],
    expect: { text: ["Encounter Result", "2,000"] },
  },
  {
    name: "Level 5, 4 players, Medium, env 1.5 → 3,000 XP",
    actions: [
      { kind: "fill", label: "Environment Factor", value: "1.5" },
      { kind: "click", label: "Calculate Encounter" },
    ],
    expect: { text: ["Encounter Result", "3,000"] },
  },
];
