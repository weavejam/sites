import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C to G is a perfect fifth",
    actions: [
      { kind: "fill", label: "First Note", value: "C" },
      { kind: "fill", label: "Second Note", value: "G" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Perfect 5th", "7 semitones", "5 semitones"] },
  },
  {
    name: "D sharp to A is a tritone",
    actions: [
      { kind: "fill", label: "First Note", value: "D#" },
      { kind: "fill", label: "Second Note", value: "A" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Tritone", "6 semitones"] },
  },
];
