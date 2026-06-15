import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "10 players, 2 impostors, 8 alive, 3 suspicious → ~64%",
    actions: [
      { kind: "fill", label: "Total Players", value: "10" },
      { kind: "fill", label: "Number of Impostors", value: "2" },
      { kind: "fill", label: "Alive Players", value: "8" },
      { kind: "fill", label: "Suspicious Players", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "25.0%"] },
  },
  {
    name: "10 players, 2 impostors, 4 alive, 2 suspicious → end-game",
    actions: [
      { kind: "fill", label: "Total Players", value: "10" },
      { kind: "fill", label: "Number of Impostors", value: "2" },
      { kind: "fill", label: "Alive Players", value: "4" },
      { kind: "fill", label: "Suspicious Players", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "50.0%"] },
  },
];
