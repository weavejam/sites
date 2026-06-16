import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal adult: LVEDD 5.0, LVESD 3.2, HR 70",
    actions: [
      { kind: "fill", label: "LVEDD (cm)", value: "5.0" },
      { kind: "fill", label: "LVESD (cm)", value: "3.2" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "70" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Stroke Volume (SV)", "Ejection Fraction (EF)"] },
  },
  {
    name: "Heart failure: LVEDD 6.8, LVESD 5.8, HR 95",
    actions: [
      { kind: "fill", label: "LVEDD (cm)", value: "6.8" },
      { kind: "fill", label: "LVESD (cm)", value: "5.8" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Moderately Reduced"] },
  },
];
