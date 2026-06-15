import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "50 mm focal length → 20 D",
    actions: [
      { kind: "click", label: "Focal Length → Diopter" },
      { kind: "click", label: "mm" },
      { kind: "fill", label: "Focal Length(s)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "20"] },
  },
  {
    name: "2 D diopter → 500 mm focal length",
    actions: [
      { kind: "click", label: "Diopter → Focal Length" },
      { kind: "fill", label: "Diopter(s)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.5"] },
  },
  {
    name: "Two lenses: 100 mm + 200 mm → 15 D total",
    actions: [
      { kind: "click", label: "Focal Length → Diopter" },
      { kind: "click", label: "mm" },
      { kind: "fill", label: "Focal Length(s)", value: "100, 200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "15"] },
  },
];
