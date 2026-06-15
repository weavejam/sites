import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Soprano: 261.63 Hz to 1046.50 Hz → 2 octaves, Soprano",
    actions: [
      { kind: "fill", label: "Lowest Note (Hz)", value: "261.63" },
      { kind: "fill", label: "Highest Note (Hz)", value: "1046.50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Vocal Range Results", "Octave Span", "2.00"] },
  },
  {
    name: "Tenor (male): 130.81 Hz to 523.25 Hz → 2 octaves, Tenor",
    actions: [
      { kind: "fill", label: "Lowest Note (Hz)", value: "130.81" },
      { kind: "fill", label: "Highest Note (Hz)", value: "523.25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Vocal Range Results", "Octave Span", "2.00"] },
  },
  {
    name: "Bass (male): 82.41 Hz to 349.23 Hz",
    actions: [
      { kind: "fill", label: "Lowest Note (Hz)", value: "82.41" },
      { kind: "fill", label: "Highest Note (Hz)", value: "349.23" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Vocal Range Results", "Voice Type"] },
  },
];
