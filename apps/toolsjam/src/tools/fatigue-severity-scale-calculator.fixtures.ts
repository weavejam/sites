import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "All 2s — minimal fatigue FSS 2.0",
    actions: [
      { kind: "click", label: "Load minimal fatigue example" },
      { kind: "click", label: "Calculate FSS Score" },
    ],
    expect: { text: ["2.0", "Minimal Fatigue"] },
  },
  {
    name: "All 6s — severe fatigue FSS 6.0",
    actions: [
      { kind: "click", label: "Load severe fatigue example" },
      { kind: "click", label: "Calculate FSS Score" },
    ],
    expect: { text: ["6.0", "Severe Fatigue"] },
  },
];
