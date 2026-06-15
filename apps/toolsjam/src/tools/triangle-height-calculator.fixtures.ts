import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Area & Base: area=24, base=8 → height=6",
    actions: [
      { kind: "click", label: "Area & Base" },
      { kind: "fill", label: "Area", value: "24" },
      { kind: "fill", label: "Base", value: "8" },
      { kind: "click", label: "Calculate Height" },
    ],
    expect: { text: ["Height", "6"] },
  },
  {
    name: "Three Sides 3-4-5 → heights 4, 3, 2.4",
    actions: [
      { kind: "click", label: "Three Sides" },
      { kind: "fill", label: "Side A", value: "3" },
      { kind: "fill", label: "Side B", value: "4" },
      { kind: "fill", label: "Side C", value: "5" },
      { kind: "click", label: "Calculate Height" },
    ],
    expect: { text: ["Height", "h_a", "h_b", "h_c"] },
  },
  {
    name: "SAS: a=6, b=8, angle=90° → h_b=6",
    actions: [
      { kind: "click", label: "Two Sides & Angle (SAS)" },
      { kind: "fill", label: "Side A", value: "6" },
      { kind: "fill", label: "Side B", value: "8" },
      { kind: "fill", label: "Included Angle C (degrees)", value: "90" },
      { kind: "click", label: "Calculate Height" },
    ],
    expect: { text: ["Height", "6"] },
  },
];
