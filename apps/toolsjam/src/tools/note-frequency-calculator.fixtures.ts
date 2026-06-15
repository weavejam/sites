import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "A4 at standard 440 Hz tuning",
    actions: [
      { kind: "fill", label: "Note Name", value: "A" },
      { kind: "fill", label: "Octave", value: "4" },
      { kind: "fill", label: "Base Frequency (Optional, Hz)", value: "440" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Note Frequency Results", "440.000 Hz", "MIDI Note Number"],
    },
  },
  {
    name: "Middle C (C4) at standard tuning",
    actions: [
      { kind: "fill", label: "Note Name", value: "C" },
      { kind: "fill", label: "Octave", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Note Frequency Results", "261.626 Hz", "Wavelength"],
    },
  },
  {
    name: "F# octave 3 at 432 Hz base tuning",
    actions: [
      { kind: "fill", label: "Note Name", value: "F#" },
      { kind: "fill", label: "Octave", value: "3" },
      { kind: "fill", label: "Base Frequency (Optional, Hz)", value: "432" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Note Frequency Results", "Frequency", "Period"],
    },
  },
];
