import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C major shows the standard seven-note scale",
    actions: [
      { kind: "fill", label: "Root Note", value: "C" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "C, D, E, F, G, A, B"] },
  },
  {
    name: "E blues example loads the expected notes",
    actions: [
      { kind: "click", label: "Load E blues example" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "E, G, A, A#, B, D"] },
  },
];
