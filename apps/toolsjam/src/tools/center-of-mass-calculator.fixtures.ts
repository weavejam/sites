import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Two equal masses at (0,0) and (4,0) → x_cm=2",
    actions: [
      { kind: "fill", label: /Mass 1/, value: "2" },
      { kind: "fill", label: /X Position 1/, value: "0" },
      { kind: "fill", label: /Y Position 1/, value: "0" },
      { kind: "fill", label: /Mass 2/, value: "2" },
      { kind: "fill", label: /X Position 2/, value: "4" },
      { kind: "fill", label: /Y Position 2/, value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Center of Mass", "2"] },
  },
  {
    name: "1 kg at (0,0) and 3 kg at (4,0) → x_cm=3",
    actions: [
      { kind: "fill", label: /Mass 1/, value: "1" },
      { kind: "fill", label: /X Position 1/, value: "0" },
      { kind: "fill", label: /Y Position 1/, value: "0" },
      { kind: "fill", label: /Mass 2/, value: "3" },
      { kind: "fill", label: /X Position 2/, value: "4" },
      { kind: "fill", label: /Y Position 2/, value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Center of Mass", "3"] },
  },
];
