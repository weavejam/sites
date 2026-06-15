import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Transpose C to G (major chord)",
    actions: [
      { kind: "fill", label: "Original Chord", value: "C" },
      { kind: "click", label: "Transpose" },
    ],
    expect: { text: ["Transposition Result", "G"] },
  },
  {
    name: "Transpose Am progression C to F",
    actions: [
      { kind: "fill", label: "Original Chord", value: "Am" },
      { kind: "click", label: "Transpose" },
    ],
    expect: { text: ["Transposition Result", "Semitone Distance"] },
  },
];
