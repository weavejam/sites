import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Square side=8 → 64",
    actions: [
      { kind: "click", label: "Square" },
      { kind: "fill", label: "Side Length", value: "8" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Result", "Square area = 64"] },
  },
  {
    name: "Rectangle 12×10 → 120",
    actions: [
      { kind: "click", label: "Rectangle" },
      { kind: "fill", label: "Length", value: "12" },
      { kind: "fill", label: "Width", value: "10" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Result", "Rectangle area = 120"] },
  },
  {
    name: "Triangle base=15, height=8 → 60",
    actions: [
      { kind: "click", label: "Triangle" },
      { kind: "fill", label: "Base", value: "15" },
      { kind: "fill", label: "Height", value: "8" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Result", "Triangle area = 60"] },
  },
];
