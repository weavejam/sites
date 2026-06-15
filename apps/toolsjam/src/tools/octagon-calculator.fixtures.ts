import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Octagon side=10: area≈482.843",
    actions: [
      { kind: "fill", label: "Side Length (a)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Area", "Perimeter"] },
  },
  {
    name: "Octagon side=2.5: perimeter=20",
    actions: [
      { kind: "fill", label: "Side Length (a)", value: "2.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "20"] },
  },
  {
    name: "Octagon side=1: area≈4.8284",
    actions: [
      { kind: "fill", label: "Side Length (a)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "8"] },
  },
];
