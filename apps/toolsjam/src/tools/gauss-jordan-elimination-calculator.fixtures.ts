import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2x2 system: 2x+y=5, 4x+3y=11 → x=2, y=1",
    actions: [
      { kind: "click", label: "Load 2x2 example" },
      { kind: "click", label: "Solve" },
    ],
    expect: { text: ["Solution", "x1 = 2", "x2 = 1"] },
  },
  {
    name: "3x3 system example",
    actions: [
      { kind: "click", label: "Load 3x3 example" },
      { kind: "click", label: "Solve" },
    ],
    expect: { text: "Solution" },
  },
];
