import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal QTc — QT 360ms, HR 75 bpm, Bazett",
    actions: [
      { kind: "fill", label: "QT Interval", value: "360" },
      { kind: "fill", label: "Heart Rate", value: "75" },
      { kind: "click", label: "Calculate QTc" },
    ],
    expect: { text: ["402", "Normal"] },
  },
  {
    name: "Prolonged QTc — QT 480ms, HR 60 bpm, Bazett",
    actions: [
      { kind: "fill", label: "QT Interval", value: "480" },
      { kind: "fill", label: "Heart Rate", value: "60" },
      { kind: "click", label: "Calculate QTc" },
    ],
    expect: { text: ["480", "Prolonged"] },
  },
];
