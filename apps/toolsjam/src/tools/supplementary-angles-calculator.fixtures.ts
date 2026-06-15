import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Supplement of 30° → 150°",
    actions: [
      { kind: "fill", label: "Angle (A)°", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Supplementary Angle", "30°", "150°"] },
  },
  {
    name: "Supplement of 120° → 60°",
    actions: [
      { kind: "fill", label: "Angle (A)°", value: "120" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Supplementary Angle", "120°", "60°"] },
  },
  {
    name: "Supplement of 90° → 90°",
    actions: [
      { kind: "fill", label: "Angle (A)°", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Supplementary Angle", "90°"] },
  },
];
