import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C to G auto chooses shortest path (down 5 semitones)",
    actions: [
      { kind: "fill", label: "Original Note", value: "C" },
      { kind: "fill", label: "Target Key", value: "G" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "G", "5", "Down"] },
  },
  {
    name: "E to C down example chooses downward motion",
    actions: [
      { kind: "fill", label: "Original Note", value: "E" },
      { kind: "fill", label: "Target Key", value: "C" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "C"] },
  },
];
