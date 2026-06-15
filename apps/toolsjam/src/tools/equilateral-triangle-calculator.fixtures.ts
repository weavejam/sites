import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Side = 6 → area ≈ 15.588",
    actions: [
      { kind: "fill", label: "Side Length", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Area"] },
  },
  {
    name: "Side = 10 → perimeter = 30",
    actions: [
      { kind: "fill", label: "Side Length", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Perimeter"] },
  },
  {
    name: "Side = 4.5 → height ≈ 3.897",
    actions: [
      { kind: "fill", label: "Side Length", value: "4.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Height (Altitude)"] },
  },
];
