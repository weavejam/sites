import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sunny day f/8 1/125s ISO 100 → EV ≈ 13",
    actions: [
      { kind: "fill", label: "Aperture (f-stop)", value: "8" },
      { kind: "fill", label: "Shutter Speed (seconds)", value: "0.008" },
      { kind: "fill", label: "ISO Sensitivity", value: "100" },
      { kind: "fill", label: "Exposure Compensation (EV)", value: "0" },
      { kind: "click", label: "Calculate Exposure" },
    ],
    expect: { text: ["Result", "Scene EV"] },
  },
  {
    name: "Indoor portrait f/2.8 1/60s ISO 400 → EV ≈ 11",
    actions: [
      { kind: "fill", label: "Aperture (f-stop)", value: "2.8" },
      { kind: "fill", label: "Shutter Speed (seconds)", value: "0.0167" },
      { kind: "fill", label: "ISO Sensitivity", value: "400" },
      { kind: "fill", label: "Exposure Compensation (EV)", value: "0" },
      { kind: "click", label: "Calculate Exposure" },
    ],
    expect: { text: ["Result", "Scene EV"] },
  },
];
