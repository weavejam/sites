import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C Major root position default",
    actions: [
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Chord Details", "Chord Symbol", "Bass Note", "Chord Notes"] },
  },
  {
    name: "Calculate shows inversion details",
    actions: [
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Intervals from Bass", "Root Position"] },
  },
];
