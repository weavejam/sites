import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Generate default C Major Pop Basic",
    actions: [
      { kind: "click", label: "Generate Progression" },
    ],
    expect: { text: ["Generated Progression", "Roman numeral analysis"] },
  },
  {
    name: "Generate and reset",
    actions: [
      { kind: "click", label: "Generate Progression" },
      { kind: "click", label: "Reset" },
    ],
    expect: { notText: ["Generated Progression"] },
  },
];
